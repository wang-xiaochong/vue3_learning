<template>

  <body>
    ref:
    <button @click="increment">
      {{ count }}
    </button>
    <div>
      deepRef:
      <button @click="mutateDeeply">changeObj</button>
      <span>{{ obj.arr }}</span>
      <span>{{ obj.nested.count }}</span>
    </div>
    <div>
      shallowRef:
      <button @click="changeStateValueCount">change state.value.count</button>
      <button @click="changeStateValue">change state.value</button>
      <span>{{ shallowState.count }}</span>
    </div>
    reactive:
    <button @click="reactiveState.count++">
      {{ reactiveState.count }}
    </button>

    <div>
      shallowReactive:
      <button @click="changeShallowReactiveStateFoo">change shallowReactiveState.foo</button>
      <button @click="changeShallowReactiveStateNestedBar">change shallowReactiveState.nested.bar</button>
      <span> foo:{{ shallowReactiveState.foo }}</span>
      <span> bar:{{ shallowReactiveState.nested.bar }}</span>
    </div>

    <div>
      解构：
      <button @click="changeRefStateCount01">change refStateCount.count01</button>
      <button @click="changeReactiveStateCount02">change reactiveStateCount.count02</button>
      <span> count01:{{ refStateCount.count01 }}</span>
      <span> count02:{{ reactiveStateCount.count02 }}</span>
    </div>

    <div>
      解构：<br>
      <span> countRender + 1 :{{ countRender + 1 }}</span> <br>
      <span> objectRender.id : {{ objectRender.id }}</span> <br>
      <span> objectRender.id + 1 : {{ objectRender.id + 1 }}</span> <br>
      <span> objectRender.id.value + 1 : {{ objectRender.id.value + 1 }}</span> <br>
      <span> id:{{ id + 1 }}</span>
    </div>

  </body>
</template>

<script setup>
import { ref, shallowRef } from 'vue'

// 1.
// 为什么使用ref？ 第一次渲染进行跟踪，改变时会触发重新渲染，普通JS对象检测不到
// 当一个组件首次渲染时，Vue 会追踪在渲染过程中使用的每一个 ref。然后，当一个 ref 被修改时，它会触发追踪它的组件的一次重新渲染。
// 在标准的 JavaScript 中，检测普通变量的访问或修改是行不通的。然而，我们可以通过 getter 和 setter 方法来拦截对象属性的 get 和 set 操作。
// 伪代码，不是真正的实现
// const myRef = {
//   _value: 0,
//   get value() {
//     track()
//     return this._value
//   },
//   set value(newValue) {
//     this._value = newValue
//     trigger()
//   }
// }

const count = ref(0)
// function increment() {
//   count.value++
// }

// 2.
const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})
function mutateDeeply() {
  // 以下都会按照期望工作
  obj.value.nested.count++
  obj.value.arr.push('baz')
}

// 3.
// 使用shallowRef 只会监听顶层value，深层级数据应不可变。适用场景为监听大型不可变数据
// shallow ref 来放弃深层响应性。对于浅层 ref，只有 .value 的访问会被追踪。浅层 ref 可以用于避免对大型数据的响应性开销来优化性能、或者有外部库管理其内部状态的情况。
// 浅层式 API 创建的状态只在其顶层是响应式的，对所有深层的对象不会做任何处理。这使得对深层级属性的访问变得更快，但代价是，我们现在必须将所有深层级对象视为不可变的，并且只能通过替换整个根状态来触发更新
const shallowState = shallowRef({ count: 1 })
function changeStateValueCount() {
  // 会更改但不触发重新渲染
  shallowState.value.count += 1
}
function changeStateValue() {
  // 会更改也会触发重新渲染
  shallowState.value = { count: shallowState.value.count + 1 }
}

// 4.
// 当你修改了响应式状态时，DOM 会被自动更新。但是需要注意的是，DOM 更新不是同步的。Vue 会在“next tick”更新周期中缓冲所有状态的修改，以确保不管你进行了多少次状态修改，每个组件都只会被更新一次。
// 要等待 DOM 更新完成后再执行额外的代码，可以使用 nextTick() 全局 API
import { nextTick } from 'vue'
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
async function increment() {
  count.value++
  mutateDeeply()
  await sleep(3000)
  console.log('a');
  await nextTick()
  await sleep(3000)
  console.log('b');
}

// 5.
import { reactive } from 'vue'
const reactiveState = reactive({ count: 0 })

// 6.
import { shallowReactive, isReactive } from 'vue'
const shallowReactiveState = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})

function changeShallowReactiveStateFoo() {
  // 更改状态自身的属性是响应式的
  shallowReactiveState.foo += 1
}
function changeShallowReactiveStateNestedBar() {
  console.log(isReactive(shallowReactiveState.nested))
  // 不是响应式的
  shallowReactiveState.nested.bar += 1
}

// 7.
const raw = {}
const proxy = reactive(raw)
// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false
console.log(proxy == raw) // false
// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true
// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true
// 这个规则对嵌套对象也适用。依靠深层响应性，响应式对象内的嵌套对象依然是代理
const reactiveStateProxy = reactive({
  count: 0,
  nested: {
    bar: 2
  }
})
console.log('reactiveStateProxy.nested', reactiveStateProxy.nested); // proxy

// 8.
// ref与reactive解构 ref对于对象的跟踪底层采用的同样是reactive，同样不能进行解构
const refStateCount = ref({ count01: 0 })
function changeRefStateCount01() {
  // count01 与 refStateCount 中的 count01 完全没有关联
  let { count01 } = refStateCount.value
  count01 += 1
  refStateCount.value.count01 += 1

  console.log('count01', count01);
  console.log('refStateCount.value.count01', refStateCount.value.count01);
}

const reactiveStateCount = reactive({ count02: 0 })
// 当解构时，count02 已经与 reactiveStateCount.count02 断开连接
// 不会影响原始的 state
function changeReactiveStateCount02() {
  let { count02 } = reactiveStateCount
  count02 += 1
}

// 9.
// 一个 ref 会在作为响应式对象的属性被访问或修改时自动解包。换句话说，它的行为就像一个普通的属性：
const countRef = ref(0)
const state = reactive({
  countRef
})
const temp = {
  countRef
}
console.log(state.countRef) // 0

state.countRef = 1
console.log(countRef.value) // 1
temp.countRef.value = 2
console.log(countRef.value) // 2
temp.countRef = 3
console.log(countRef.value) // 2
console.log(temp) // {countRef:3}

// 如果将一个新的 ref 赋值给一个关联了已有 ref 的属性，那么它会替换掉旧的 ref
// 只有当嵌套在一个深层响应式对象内时，才会发生 ref 解包。当其作为浅层响应式对象的属性被访问时不会解包。解包就是不用再输入.value 
const otherCount = ref(4)
state.countRef = otherCount
console.log(state.countRef) // 4
// 原始 ref 现在已经和 state.count 失去联系
console.log(countRef.value) // 2
console.log('======================');

// 10.
// 与 reactive 对象不同的是，当 ref 作为响应式[数组]或原生[集合]类型 (如 Map) 中的元素被访问时，它不会被解包：
const vue3Ref = ref('Vue 3 Guide')
const bookObj = reactive({ vue3Ref: ref('Vue 3 Guide') })
console.log(bookObj.vue3Ref)
const bookList = reactive([vue3Ref])
// 这里需要 .value
console.log(bookList[0].value)
const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)

// 11.
// 在模板中解包的注意事项
// 在模板渲染上下文中，只有顶级的 ref 属性才会被解包。
// 在下面的例子中，count 和 object 是顶级属性，但 object.id 不是
const countRender = ref(0)
const objectRender = { id: ref(1) }
const { id } = objectRender





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

button {
  margin: 5px;
}
</style>
