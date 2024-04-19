<template>

  <body>
    Body

    <!-- 内联事件处理器 -->
    <div>
      <button @click="count++">Add 1</button>
      <p>Count is: {{ count }}</p>
    </div>
    <div>
      <!-- `greet` 是上面定义过的方法名 -->
      <button @click="greet">Greet</button>
    </div>
    <div>
      <button @click="say('hello')">Say hello</button>
      <button @click="say('bye')">Say bye</button>
    </div>

    <!-- 在内联事件处理器中访问事件参数 -->
    <div>
      <!-- 使用特殊的 $event 变量 -->
      <button @click="warn('Form cannot be submitted yet.', $event)">
        Submit
      </button>

      <!-- 使用内联箭头函数 -->
      <button @click="(event) => warn('Form cannot be submitted yet.', event)">
        Submit
      </button>
    </div>

    <div>
      <!-- 当按下 Ctrl 时，即使同时按下 Alt 或 Shift 也会触发 -->
      <button @click.ctrl="greet">press ctrl and click</button>

      <!-- 仅当按下 Ctrl 且未按任何其他键时才会触发 -->
      <button @click.ctrl.exact="greet">only press ctrl and click</button>

      <!-- 仅当没有按下任何系统按键时触发 -->
      <button @click.exact="greet">only click</button>

      <!-- 仅当没有按下任何系统按键时右击鼠标触发并阻止默认浏览器右击事件 -->
      <button @contextmenu.prevent.exact="greet">only right click</button>
    </div>
    <div>
      <div @contextmenu="show($event)">right click</div>
    </div>
  </body>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

const name = ref('Vue.js')

function greet(event: any) {
  alert(`Hello ${name.value}!`)
  // `event` 是 DOM 原生事件
  if (event) {
    alert(event.target.tagName)
  }
}

function say(message: string) {
  alert(message)
}

function warn(message: any, event: { preventDefault: () => void; }) {
  // 这里可以访问原生事件
  if (event) {
    event.preventDefault()
  }
  alert(message)
}

function show(event: { preventDefault: () => void; }) {
  greet(event)
  // 此处可以使用判断条件控制是否需要阻止右键
  event.preventDefault();
}

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
