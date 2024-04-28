<template>

  <body>
    Body
    <br />
    <!-- <Article foo="foo" bar="bar" /> -->
    <br />
    <!-- 虽然 `18` 是个常量，我们还是需要使用 v-bind -->
    <!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
    <!-- <Author name="you yu xi" :age="18" /> -->
    <br />
    <!-- 报错： 不能将类型 string 分配给类型 number -->
    <!-- <Author name="you yu xi" age=18 /> -->
    <!-- <Author name="vue" :age="person.age" /> -->
    <br />
    <!-- <Article foo="PUBLISH" :is-published="true" /> -->
    <br />
    <!-- 虽然这个数组是个常量，我们还是需要使用 v-bind -->
    <!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
    <Article :comment-ids="[234, 266, 273]" :booleanDisabled4="['This is a string', true]" />
    <Article :comment-ids="[234, 266, 273]" :booleanDisabled4="['This is a string', true]"
      :multiple="['string', 16, [0, 1, 2]]" :multiple2="['string2', 6]" />
    <br />
    <!-- 虽然这个对象字面量是个常量，我们还是需要使用 v-bind -->
    <!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
    <!-- <Article :author="{
      name: 'Veronica',
      company: 'Veridian Dynamics'
    }" /> -->
    <br />
    <!-- <Article v-bind="post" /> -->
    <!-- 等价于 -->
    <BlogPost :foo="post.foo" :isPublished="post.isPublished" />
    <br />
    <SingleDataDirection initialCounter="0" size="Size" :authors="authors"></SingleDataDirection>
    <button @click="changeAuthors">changeAuthors</button>
    <br>
    <!-- <DefinPropsTypes v-bind="propsDefine" :propPerson="new Person('firstname', 'lastname')"></DefinPropsTypes> -->
    <DefinPropsTypes v-bind="propsDefine" :prop-b="15"></DefinPropsTypes>
  </body>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Article from './Article.vue';
import Author from './Author.vue';
import SingleDataDirection from './SingleDataDirection.vue';
import DefinPropsTypes from './DefinPropsTypes.vue';
import { Person } from './Person'
const person = ref({ age: 10 });
const post = ref({ foo: "foo", isPublished: false })
const authors = ref(['1', '2']);

// setInterval(() => {
//   console.log('authors', authors.value);
// }, 1000)

function changeAuthors() {
  authors.value.push("~")
}
const personDefines: Person = new Person("123", "lastName")

const propsDefine = ref({
  "propA": 10,
  // "propB": ['5', 15],
  // "propB": ["age"],
  // "propB": "age",
  "propC": "prop-c-string",
  "propF": "success",
  "propPerson": personDefines
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
