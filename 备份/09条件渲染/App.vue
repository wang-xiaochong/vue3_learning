<template>

  <body>
    Body
    <button @click="awesome = !awesome">Toggle</button>
    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no 😢</h1>

    <button @click="changeType">Change A\B\C\None </button>
    <div v-if="type === 'A'">
      A
    </div>
    <div v-else-if="type === 'B'">
      B
    </div>
    <div v-else-if="type === 'C'">
      C
    </div>
    <div v-else>
      Not A/B/C
    </div>
    <template v-if="true">
      <div>div1</div>
      <div>div2</div>
      <div>div3</div>
    </template>

    <h1 v-show="false">Hello!</h1>

    <!-- v-show 不支持在 <template> 元素上使用，也不能和 v-else 搭配使用 页面上不会显示 -->
    <template v-show="true">
      <div>div1</div>
      <div>div2</div>
      <div>div3</div>
    </template>
    <!-- 总的来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 v-show 较好；如果在运行时绑定条件很少改变，则 v-if 会更合适。 -->
    <!-- 当 v-if 和 v-for 同时存在于一个元素上的时候，v-if 会首先被执行。同时使用 v-if 和 v-for 是不推荐的。 -->
  </body>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const awesome = ref(true);
const type = ref("A");
function changeType() {
  if (type.value === "A") {
    type.value = 'B';
  } else if (type.value === "B") {
    type.value = 'C';
  } else if (type.value === "C") {
    type.value = 'None';
  } else {
    type.value = 'A';
  }

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
