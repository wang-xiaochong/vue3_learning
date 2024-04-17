import { createApp } from "vue";
import App from './App.vue'

const app = createApp(App)

function sum(a: number, b: number) {
    return a + b
}

app.config.globalProperties = {
    msg: 'global hello',
    sum: sum,
}

app.config.errorHandler = (err) => {
    /* 处理错误 */
    console.log('err', err);
}

app.mount('#app')