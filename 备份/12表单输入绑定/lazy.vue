<template>
    <div>
        <input v-model="msg" @change="showMsg" />
        msg:{{ msg }}
    </div>
    <div>
        <!-- 在 "change" 事件后同步更新而不是 "input" -->
        <input v-model.lazy="msgWithLazy" @change="showMsgWithLazy" />
        msgWithLazy:{{ msgWithLazy }}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const msg = ref("")
const msgWithLazy = ref("")

function showMsg() {
    console.log(`msg:${msg.value}`)
}
function showMsgWithLazy() {
    console.log(`msgWithLazy:${msgWithLazy.value}`)
}
</script>