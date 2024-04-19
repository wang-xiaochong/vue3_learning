<template>

  <body>
    Body
    <div class="static" :class="{ active: isActive, 'text-danger': hasError }"> 动态类名 内联字面量形式 </div>
    <div :class="classObject"> 动态类名 对象形式 </div>
    <div :class="computed_classObject"> 动态类名 计算属性 </div>
    <div :class="[activeClass, errorClass]"> 动态类名 数组渲染 </div>
    <div :class="[isActive ? activeClass : '', errorClass]"> 动态类名 三元表达式渲染 </div>
    <div :class="[{ active: isActive }, errorClass]"> 动态类名 数组中嵌套对象 </div>
    <SingleRoot :class="{ active: isActive }" />
    <MultipleRoot :class="{ active: isActive }" />
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"> 绑定内联样式对象 </div>
    <div :style="{ 'font-size': fontSize + 'px' }"> 支持 kebab-cased 形式的 CSS 属性 </div>
    <div :style="styleObject"> 直接绑定样式对象 </div>
    <div :style="[baseStyles, overridingStyles]"> 包含多个样式对象的数组 </div>
    <!-- 数组仅会渲染浏览器支持的最后一个值。在这个示例中，在支持不需要特别前缀的浏览器中都会渲染为 display: flex。 -->
    <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"> 对样式属性提供多个 (不同前缀的) 值 </div>
  </body>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import SingleRoot from './components/singleRoot.vue';
import MultipleRoot from './components/multipleRoot.vue';

const isActive = ref(true)
const hasError = ref(false)

const classObject = reactive({
  active: true,
  'text-danger': false
})

const computed_isActive = ref(true)
const computed_error = ref(null)

const computed_classObject = computed(() => ({
  active: computed_isActive.value && !computed_error.value,
  'text-danger': computed_error.value && computed_error.value.type === 'fatal'
}))

const activeClass = ref('active')
const errorClass = ref('text-danger')

const activeColor = ref('red')
const fontSize = ref(30)

const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})

const baseStyles = reactive({
  color: 'red',
  fontSize: '13px'
})
const overridingStyles = reactive({
  color: 'red',
  fontSize: '30px'
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
