<template>
    <header>
        Header <br>
        count : {{ count }}
        <button @click="increment"> count + 1</button>

    </header>
</template>

<script  setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
function increment() {
    count.value++
}
</script>


<style scoped>
header {
    width: 100%;
    background-color: wheat;
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #888888;
    padding: 10px;
}
</style>
  