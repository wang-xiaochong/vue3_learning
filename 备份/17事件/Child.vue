<template>
    Child
    <!-- MyComponent -->
    <button @click="$emit('someEvent', { increase: 1 })">Increase by 1</button>
</template>
