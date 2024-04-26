<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
    <button @click="count++">Global Button Counter A You clicked me {{ count }} times.</button>
</template>