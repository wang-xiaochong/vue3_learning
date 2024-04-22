<template>

  <body>
    Body
    <div>
      <p>
        Ask a yes/no question:
        <input v-model="questionRef" :disabled="loading" />
      </p>
      <p>{{ answer }}</p>
    </div>
    <div>
      <p>
        Ask a yes/no question:
        <input v-model="questionGetterValue" :disabled="loading" />
      </p>
      <p>{{ answer }}</p>
    </div>
    <div>
      <p>
        Ask a yes/no question:
        <input v-model="questionReactive.question" :disabled="loading" />
      </p>
      <p>{{ answer }}</p>
    </div>
    <div>
      <p>
        Ask a yes/no question:
        <input v-model="questionList" :disabled="loading" />
      </p>
      <p>{{ answer }}</p>
    </div>

    <div>
      <button @click="changeObjSomeObjectCount">change State.count</button>
      <button @click="changeObjSomeObject">change State</button>
      <button @click="destoryWatchObj">destory Watch Obj</button>
      {{ obj.someObject.count }}
    </div>
    <div>
      watchEffect:
      <button @click="changeObjEffectSomeObjectCount">change effect State.count</button>
      <button @click="changeObjEffectSomeObject">change effect State</button>
      <button @click="changeObjEffectSomeObjectSomeObjectSonCount">change effect State.someObjectSon.count</button><br>
      effectObj.someObject.count:{{ effectObj.someObject.count }} <br />
      effectObj.someObject.someObjectSon.count:{{ effectObj.someObject.someObjectSon.count }}

    </div>

  </body>
</template>

<script setup lang="ts">
import { reactive, ref, watch, watchEffect } from 'vue'
import _ from 'lodash'

const questionRef = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')
const loading = ref(false)
// let question2 = "";
const questionGetterValue = ref('')
const questionReactive = reactive({ question: "" })
const questionList = ref('')

// 可以直接侦听一个 ref
watch(questionRef, async (newQuestion, oldQuestion) => {
  console.log('question', questionRef);
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
  }
})

// 可以直接侦听一个 返回值(也是响应式)
watch(() => questionGetterValue.value, async (newQuestion, oldQuestion) => {
  console.log('question2', questionGetterValue);
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
  }
})

// 可以直接侦听一个 一个响应式对象
watch(questionReactive, async (newQuestion, oldQuestion) => {
  console.log('question3', questionReactive);
  if (newQuestion.question.includes('?')) {
    loading.value = true
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
  }
})


// 回调函数接受三个参数：新值、旧值，以及一个用于注册副作用清理的回调函数。该回调函数会在副作用下一次重新执行前调用，例如等待中的异步请求。
watch([questionRef, questionGetterValue, () => questionGetterValue.value, questionReactive], (newQuestion, oldQuestion, clearEffect) => {
  // console.log('newQuestion', newQuestion);
  // console.log('oldQuestion', oldQuestion);
  // console.log('clearEffect',clearEffect);
  function clearEffect1() {
    console.log('clearEffect');
  }
  clearEffect(clearEffect1)
  console.log('[]');

  // 伪代码
  // const { response, cancel } = doAsyncWork(id.value)
  // // `cancel` 会在 `id` 更改时调用
  // // 以便取消之前未完成的请求
  // onCleanup(cancel)
  // data.value = await response.json()
})

// 第三个可选的参数
watch(questionList, async (newQuestion, oldQuestion) => {
  console.log('question4', questionList);
  console.log('newQuestion', newQuestion);
  console.log('oldQuestion', oldQuestion);
},
  {
    // 在侦听器创建时立即触发回调。第一次调用时旧值是 undefined。
    immediate: true,
    // 回调函数只会运行一次。侦听器将在回调函数首次运行后自动停止。
    once: true
  }
)

const obj = reactive({
  someString: 'hello',
  someObject: { count: 0 }
})

const effectObj = reactive({
  someString: 'hello',
  someObject: { count: 0, someObjectSon: { count: 0 } },
  someObject2: { count: 0 },
})

// watch(obj, (newValue, oldValue) => {
//   // 在嵌套的属性变更时触发
//   // 注意：`newValue` 此处和 `oldValue` 是相等的
//   // 因为它们是同一个对象！
//   console.log('newValue', newValue);
//   console.log('oldValue', oldValue);
// })

// 相比之下，一个返回响应式对象的 getter 函数，只有在对象被替换时才会触发
// watch(() => obj.someObject, (newValue, oldValue) => {
//   console.log('newValue', newValue);
//   console.log('oldValue', oldValue);
// })
// 相比之下，一个返回响应式对象的 getter 函数，只有在对象被替换时才会触发。显式地加上 deep 选项，强制转成深层侦听器
// watch(() => obj.someObject, (newValue, oldValue) => {
//   console.log('newValue', newValue);
//   console.log('oldValue', oldValue);
// }, { deep: true })

// 深层侦听一个响应式对象或数组，新值和旧值是相等的。为了解决这个问题，我们可以对值进行深拷贝。注意：深层侦听需要遍历所有嵌套的属性，当数据结构庞大时，开销很大。所以我们要谨慎使用，并且留意性能。
const unWatch = watch(
  () => _.cloneDeep(obj.someObject),
  (newValue, oldValue) => {
    // 此时 `newValue` 此处和 `oldValue` 是不相等的
    console.log('deep', newValue.count, oldValue.count)
  },
  { deep: true }
)

function changeObjSomeObjectCount() {
  obj.someObject.count += 1;
}

function changeObjSomeObject() {
  obj.someObject = { count: 5 }
}

function changeObjEffectSomeObjectCount() {
  effectObj.someObject.count += 1;
}

function changeObjEffectSomeObject() {
  effectObj.someObject = { count: 5, someObjectSon: { count: 6 } }
}

function changeObjEffectSomeObjectSomeObjectSonCount() {
  effectObj.someObject.someObjectSon.count += 1;
}

// watchEffect() 可能会比深度侦听器更有效，因为它将只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性。
watchEffect(() => {
  console.log('effectObj.someObject.someObjectSon.count', effectObj.someObject.someObjectSon.count);
})



function destoryWatchObj() {
  unWatch()
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
