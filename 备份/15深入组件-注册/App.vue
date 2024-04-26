<template>

  <body>
    Body
    <div>
      <ButtonCounter />
    </div>
    <div>
      <GlobalButtonCounterCustomA />
      <GlobalButtonCounterCustomB />
    </div>
    <div>
      <BlogPost title="My journey with Vue" />
      <BlogPost title="Blogging with Vue" />
      <BlogPost title="Why Vue is so fun" />
      <blog-post title="Why Vue is so fun" />
      <BlogPost v-for="post in posts" :key="post.id" :title="post.title" />

    </div>
  </body>
</template>

<script lang="ts" setup>
import ButtonCounter from './ButtonCounter.vue'
import BlogPost from './BlogPost.vue';
import { ref } from 'vue';
const posts = ref([
  { id: 1, title: 'My journey with Vue' },
  { id: 2, title: 'Blogging with Vue' },
  { id: 3, title: 'Why Vue is so fun' }
])
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
