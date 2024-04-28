<template>
    Article-foo:{{ foo }}
    is-published:{{ isPublished }}
    comment-ids:{{ commentIds }}
    author-name:{{ author?.name }}
    author-company:{{ author?.company }}

</template>

<script setup lang="ts">
// js
// const props = defineProps(['foo', 'isPublished', 'commentIds', 'author']);
// ts
const props = defineProps<{
    foo?: String
    isPublished?: Boolean
    commentIds?: Array<number>
    author?: {
        name: String
        company: String
    }
    // disabled 将被转换为 true
    booleanDisabled1?: [Boolean, Number]
    // disabled 将被转换为 true
    booleanDisabled2?: [Boolean, String]
    // disabled 将被转换为 true
    booleanDisabled3?: [Number, Boolean]
    // disabled 将被解析为空字符串 (disabled="")
    booleanDisabled4?: [String, Boolean]
    multiple?: [String, Number, Array<Number>]
    multiple2?: [String, Number]

}>()

const { foo } = props;
const { isPublished } = props;
const { commentIds } = props;
const { author } = props;

console.log("article props :", props);
// console.log(props.foo)

</script>