<template>

  <body>
    <ul>
      <li v-for="(item, index) in items">
        {{ parentMessage }} - {{ index }} - {{ item.message }}
      </li>
    </ul>
    <ul>
      <!-- 有 index 索引时 -->
      <li v-for="({ message }, index) in items">
        {{ message }} {{ index }}
      </li>
    </ul>

    <ul>
      <li v-for="item in items">
        <span v-for="childItem of item.children">
          {{ item.message }} {{ childItem }} <br>
        </span>
      </li>
    </ul>

    <ul>
      <li v-for="(value, key, index) in myObject">
        {{ index }}. {{ key }}: {{ value }}
      </li>
    </ul>

    <span v-for="n in 10">{{ n }}</span>

    <ul>
      <template v-for="item in items">
        <li>{{ item.message }}</li>
        <li class="divider" role="presentation"></li>
      </template>
    </ul>

    <!-- 这会抛出一个错误，因为属性 todo 此时没有在该实例上定义 -->
    <!-- <ul>
      <li v-for="todo in todos" v-if="!todo.isComplete">
        {{ todo.name }}
      </li>
    </ul> -->
    <!-- 正确用法 -->
    <!-- <template v-for="todo in todos">
      <li v-if="!todo.isComplete">
        {{ todo.name }}
      </li>
    </template> -->

    <template v-for="todo in todos" :key="todo.name">
      <li>{{ todo.name }}</li>
    </template>


    <li v-for="n in evenNumbers">{{ n }}</li>

    <ul v-for="numbers in sets">
      <li v-for="n in even(numbers)">{{ n }}</li>
    </ul>

    <ul v-for="number in numbers_reverse">
      <li>{{ number }}</li>
    </ul>


  </body>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

const parentMessage = ref('Parent')
const items = ref(
  [
    {
      message: 'Foo',
      children: [
        "Foochildren1", "Foochildren2",
      ]
    },
    {
      message: 'Bar',
      children: [
        "Barchildren1", "Barchildren2",
      ]
    }
  ]
)

const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})

const todos = [
  {
    name: "study",
    isComplete: true
  },
  {
    name: "drink",
    isComplete: false
  },
  {
    name: "play",
    isComplete: true
  }
]

const numbers = ref([1, 2, 3, 4, 5])

const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})

const sets = ref([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10]
])

function even(numbers: any[]) {
  return numbers.filter((number) => number % 2 === 0)
}

const numbers_reactive = reactive([1, 2, 3, 4, 5])

// 在计算属性中使用 reverse() 和 sort() 的时候务必小心！这两个方法将变更原始数组，计算函数中不应该这么做。请在调用这些方法之前创建一个原数组的副本
const numbers_reverse = computed(() => {
  // return numbers_reactive.reverse()
  return [...numbers_reactive].reverse()
})
console.log(numbers_reactive);

numbers_reactive.splice(2, 1);
console.log(numbers_reactive);
const new_numbers_reactive = numbers_reactive.slice(2);
console.log(new_numbers_reactive);




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
