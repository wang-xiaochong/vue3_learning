<template>

  <body>

    <button @click="changeAuthorBooks">changeAuthorBooks</button>
    <button @click="changeAuthorName">changeAuthorName</button>
    <p>Has published books:</p>
    <div>{{ author.name }}</div>
    <div v-for="book in author.books">{{ book }}</div>
    <span>author.books.length + 5 = {{ publishedBooksMessage.value.info + 5 }}</span> <br>
    <span>author.books.length + 0 = {{ publishedBooksMessage.value.info + 10 }}</span> <br>

    <span ref="nowTime" id="nowTime">{{ now }}</span>

    <div>
      Name:
      <div><button @click="changeFirstName">changeFirstName</button> {{ firstName }}</div>
      <div><button @click="changeLastName">changeLastName</button> {{ lastName }}</div>
      <div><button @click="changeFullName">changeFullName</button></div>
      fullName:{{ fullName }}
    </div>

  </body>
</template>

<script lang="ts" setup>
import { reactive, computed, ref } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 1.
// computed返回的是一个计算属性 ref
// 只有涉及到内部使用的变量的值发生变化时，才会重新进行计算，并且只计算一次，供多次被调用的地方同时使用
const publishedBooksMessage = computed(() => {
  console.log('publishedBooksMessage render');
  return ref({ info: author.books.length })
})
console.log('publishedBooksMessage', publishedBooksMessage);

// 会触发重新计算
function changeAuthorBooks() {
  author.books = author.books.concat(["Vue 5 - new"])
}

// 不会触发重新计算
function changeAuthorName() {
  author.name += '~'
}

// 2.
// computed计算属性值会基于其响应式依赖被缓存，当以来发生变化后重新计算。下面的计算属性永远不会更新，因为 Date.now() 并不是一个响应式依赖
const now = computed(() => Date.now())

// 3.
// 计算属性默认是只读的。当你尝试修改一个计算属性时，你会收到一个运行时警告。只在某些特殊场景中你可能才需要用到“可写”的属性，你可以通过同时提供 getter 和 setter 来创建
const firstName = ref('John')
const lastName = ref('Doe')
function changeFirstName() {
  firstName.value += '~'
}
function changeLastName() {
  lastName.value += '~'
}
function changeFullName() {
  fullName.value = firstName.value + '!!' + ' ' + lastName.value + '!!'
}
const nowTime = ref()
const fullName = computed({
  // getter
  // 计算属性的 getter 应只做计算而没有任何其他的副作用，这一点非常重要，请务必牢记。举例来说，不要改变其他状态、在 getter 中做异步请求或者更改 DOM！
  // 避免直接修改计算属性值
  get() {
    // console.log('nowTime', nowTime.value);
    // let nowTimeDom = document.getElementById('nowTime')
    // console.log('nowTimeDom', nowTimeDom);
    // if (nowTimeDom) {
    //   nowTimeDom.innerText = "5"
    //   console.log('nowTimeDom2', nowTimeDom);
    // }
    // console.log('nowTimeDom3', nowTimeDom);

    // nowTime.value
    return firstName.value + ' ' + lastName.value
  },
  // setter
  // 现在当你再运行 fullName.value = 'John Doe' 时，setter 会被调用而 firstName 和 lastName 会随之更新
  set(newValue) {
    console.log('newValue', newValue);
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
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
