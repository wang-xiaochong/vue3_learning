<template>

    <body>
        Header <br>
        <!-- html模板插入 -->
        <p>Using text interpolation: {{ rawHtml }}</p>
        <p>Using v-html directive: <span v-html="rawHtml"></span></p>

        <div :id="dynamicId">dynamicId</div>
        <div :name="dynamicName">dynamicName</div>

        <button :disabled="isButtonDisabled" v-on:click="changeCount">{{ count }}</button>

        <!-- 动态绑定多个值 -->
        <div v-bind="multipleAttribute">multiple attribute</div>

        <!-- 支持完整的 JavaScript 表达式 -->
        <div>{{ ok ? 'YES' : 'NO' }}</div>
        <div>{{ message.split('-').reverse().join('.') }}</div>

        <!-- attribute 的值中插入 -->
        <div :id="`list-${listId}`">listId</div>

        <time :title="toTitleDate(date)" :datetime="date">
            {{ formatDate(date) }}
        </time>

        <!-- 插值只能访问有限的全局对象列表 
            const GLOBALS_ALLOWED =
                'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,' +
                'decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,' +
                'Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error'
            不能够访问windows等对象，可以在 app.config.globalProperties 上显式地添加它们，供所有的 Vue 表达式使用。
        -->
        <div>{{ Math.abs(-5) }}</div>
        <!-- 访问在 app.config.globalProperties 中显示添加的属性msg-->
        <div>{{ msg }}</div>
        <div>{{ sum_result }}</div>

        <!-- 上面的例子将会在 DOM 内嵌模板中被转换为 :[someattr]。如果你的组件拥有 “someAttr” 属性而非 “someattr”，这段代码将不会工作。单文件组件内的模板不受此限制。-->
        <div :[someAttr]="parameter">动态参数</div>
        <div v-on:[dynamicMethodParameter]="methodParameter">动态参数 click</div>

        <!-- 修饰符 Modifiers, v-on:click.stop 其中.stop为Modifiers,阻止事件向上进行冒泡 -->
        <div class="box-parent" @click="boxparent()">
            box-parent-click
            <div class="box" v-on:click.stop="box()">
                box-click
                <div class="box-child" @click="boxchild()">
                    box-child-click
                </div>
            </div>
        </div>

    </body>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getCurrentInstance } from 'vue';
const instance = getCurrentInstance();
let msg = ref("pre")
let sum_result = ref(0)

if (instance) {
    const globalProperties = instance.appContext.config.globalProperties
    msg = globalProperties.msg
    let sum = globalProperties.sum
    sum_result = sum(2, 5)
}

let count = ref(0)
function changeCount() {
    count.value += 1
}

let someAttr = "someAttr"
let parameter = "parameter"

const rawHtml = '<span style="color: red">This should be red.</span>'

const dynamicId = "id"
// dynamicName 为 undefined 或者 null 时移除属性
const dynamicName = undefined

// isButtonDisabled 为 true、""、"[any]"" 时包含disabled属性,为false是没有该属性
const isButtonDisabled = false

const multipleAttribute = {
    name: "name1",
    id: "id1"
}

const ok = true;
const message = '123-4456-7789'

const listId = 5

const date = new Date().getTime().toLocaleString()

function toTitleDate(date: any) {
    console.log('date1', date);
    return date
}

function formatDate(date) {
    console.log('date2', date);
    return new Date().getDate().toLocaleString()
}

const dynamicMethodParameter = "click"
function methodParameter() {
    alert("click")
}

function boxparent() {
    alert("this is boxparent event");
}

function box() {
    alert("this is box event");
}

function boxchild() {
    alert("this is boxchild event");
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