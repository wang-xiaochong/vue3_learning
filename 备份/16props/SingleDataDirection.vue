<template>
    initialCounter:{{ initialCounter }}
    size:{{ size }}
    <button @click="changeAuthors">childChangeAuthors</button>
    authors:{{ authors }}

</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

// props作为初始值，而子组件想在之后将其作为一个局部数据属性
// 计数器只是将 props.initialCounter 作为初始值
// 像下面这样做就使 prop 和后续更新无关了
const props = defineProps(['initialCounter', 'size', 'authors']);
const initialCounter = ref(props.initialCounter);

// 需要对传入的 prop 值做进一步的转换
const size = computed(() => props.size?.trim().toLowerCase());
const authors = computed(() => props.authors);


// 当对象或数组作为 props 被传入时，虽然子组件无法更改 props 绑定，但仍然可以更改对象或数组内部的值。这是因为 JavaScript 的对象和数组是按引用传递，而对 Vue 来说，禁止这样的改动，虽然可能生效，但有很大的性能损耗，比较得不偿失。
function changeAuthors() {
    authors.value.push("~")
}

// setInterval(() => {
//     console.log('props.authors', props.authors);
// }, 1000);


</script>