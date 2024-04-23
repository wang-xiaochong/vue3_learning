<template>

  <body>
    Body
    <!-- 普通引用 -->
    <div>
      <input ref="inputRef" />
    </div>
    <!-- v-for 中的模板引用 -->
    <div>
      <ul>
        <li v-for="item in list" ref="itemRefs">
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- 函数模板引用 -->
    <div>
      <input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ elementInput = el }">
    </div>
    <!-- 子组件模板引用 -->
    <div>
      <Child ref="childRef" />
    </div>
  </body>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue';

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const inputRef = ref()

const list = ref([
  /* ... */
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
])
const elementInput = ref(null)

// 应该注意的是，ref 数组并不保证与源数组相同的顺序。
const itemRefs = ref([])
const childRef = ref()

onMounted(() => {
  inputRef.value.focus()
  console.log('v-for', itemRefs.value)
  console.log('elementInput', elementInput);

  // 当父组件通过模板引用获取到了该组件的实例时，得到的实例类型为 { a: number, b: number } (ref 都会自动解包，和一般的实例一样)。
  console.log('childRef', childRef.value.b);

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
