<template>
    Author-name:{{ name }}
    Author-age:{{ age }}

</template>

<script setup lang="ts">
const props = defineProps({ name: String, age: Number });
const { name } = props;

// console.log(props);
// console.log(props.name);

</script>