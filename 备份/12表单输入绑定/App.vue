<template>

  <body>
    Body
    <div>
      <input :value="text" @input="event => text = event!.target!.value">
      <button @click="console.log(text)">print text</button>
    </div>
    <div>
      <input v-model="text">
    </div>

    <!-- v-model 不会在 IME 输入还在拼字阶段时触发更新。如果你的确想在拼字阶段也触发更新，请直接使用自己的 input 事件监听器和 value 绑定 -->
    <div>
      <p>Message is: {{ message }}</p>
      <input v-model="message" placeholder="edit me" />
    </div>

    <div>
      <span>Multiline message is:</span>
      <p style="white-space: pre-line;">{{ message }}</p>
      <textarea v-model="message" placeholder="add multiple lines"></textarea>
      <!-- <textarea> 中是不支持插值表达式 -->
      <!-- 错误 -->
      <!-- <textarea>{{ text }}</textarea> -->
    </div>

    <div>
      <input type="checkbox" id="checkbox" v-model="checked" />
      <label for="checkbox">{{ checked }}</label>
    </div>

    <div>
      <div>Checked names: {{ checkedNames }}</div>

      <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
      <label for="jack">Jack</label>

      <input type="checkbox" id="john" value="John" v-model="checkedNames">
      <label for="john">John</label>

      <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
      <label for="mike">Mike</label>
    </div>

    <div>
      <div>Picked: {{ picked }}</div>

      <input type="radio" id="one" value="One" v-model="picked" />
      <label for="one">One</label>

      <input type="radio" id="two" value="Two" v-model="picked" />
      <label for="two">Two</label>
    </div>

    <div>
      <div>Selected: {{ selected }}</div>

      <select v-model="selected">
        <option disabled value="">Please select one</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
    </div>

    <div>
      <div>Selected: {{ selected }}</div>

      <select v-model="selected" multiple>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
    </div>

    <div>
      <select v-model="selected">
        <option v-for="option in options" :value="option.value">
          {{ option.text }}
        </option>
      </select>

      <div>Selected: {{ selected }}</div>
    </div>

    <!-- 值绑定 -->
    <div>
      <!-- `picked` 在被选择时是字符串 "a" -->
      <input type="radio" v-model="picked" value="a" />

      <!-- `toggle` 只会为 true 或 false -->
      <input type="checkbox" v-model="toggle" />

      <!-- `selected` 在第一项被选中时为字符串 "abc" -->
      <select v-model="selected">
        <option value="abc">ABC</option>
      </select>
    </div>

    <div>
      toggle:{{ toggle }}
      <input type="checkbox" v-model="toggle" :true-value="dynamicTrueValue" :false-value="dynamicFalseValue" />
    </div>

    <div>
      pick:{{ pick }}
      <input type="radio" v-model="pick" :value="first" />
      <input type="radio" v-model="pick" :value="second" />
    </div>

    <div>
      selected:{{ selected }}
      <select v-model="selected">
        <!-- 内联对象字面量 -->
        <option :value="{ number: 123 }">123</option>
      </select>
    </div>

    <div>
      <!-- 在 "change" 事件后同步更新而不是 "input" -->
      <input v-model.lazy="msg" @change="showMsg" />
      <button @click="showMsg">showMsg</button>
      msg:{{ msg }}
      newMsg:{{ newMsg }}
    </div>
    <br>
    <div>
      <Lazy />
    </div>

    <div>
      <input v-model.number="age" />
      <button @click="printAgeType"> console age type </button>
      age:{{ age }}
    </div>

    <div>
      <input v-model.trim="msg" />
      <button @click="console.log(msg.length)">console log msg length</button>
      msg:{{ msg }}
    </div>




  </body>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import Lazy from './lazy.vue'

const text = ref("123")
const message = ref("555")
const checked = ref(false)
const toggle = ref(false)
const pick = ref(false)
const checkedNames = ref([])
const picked = ref("")
const dynamicTrueValue = ref("dynamicTrueValue")
const dynamicFalseValue = ref("dynamicFalseValue")
const first = ref("first")
const second = ref("second")
const msg = ref("")
const selected = ref('A')
const age = ref(0)
const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])

function showMsg() {
  console.log(msg.value);
}
function printAgeType() {
  console.log(typeof age.value);
}
const newMsg = computed(() => {
  return msg.value
})




</script>
<style scoped>
body {
  width: 100%;
  background-color: wheat;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #888888;
  padding: 10px;
}
</style>
