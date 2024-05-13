<template>

  <body>
    Body
    <br>
    <!-- MyComponent -->
    <Child @some-event="callback" />
    parent count:{{ count }}


  </body>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import Child from './Child.vue';

const count = ref(0)
function callback(params: any) {
  console.log('callback params:', params);
  count.value += params.increase;
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
