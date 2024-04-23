<template>
    Child
    <div>
        <input type="text" id="childInput" />
    </div>
</template>

<!-- 
<script>
export default {
    expose: ['publicData', 'publicMethod'],
    data() {
        return {
            publicData: 'foo',
            privateData: 'bar'
        }
    },
    methods: {
        publicMethod() {
            /* ... */
        },
        privateMethod() {
            /* ... */
        }
    }
}
</script> -->


<script lang="ts" setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)
function c() {
    console.log('c');
}
function d() {
    console.log('c');
}

// 像 defineExpose 这样的编译器宏不需要导入
defineExpose({
    a,
    b,
    c
})
</script>