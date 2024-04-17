import { createApp } from "vue";
import App from './App.vue'
import App2 from './App2.vue'

const app = createApp(App)
app.mount('#app')

app.config.errorHandler = (err) => {
    /* 处理错误 */
    console.log('err', err);
}

const app2 = createApp(App2)
app2.mount('#app2')

app2.config.errorHandler = (err) => {
    /* 处理错误 */
    console.log('err', err);
}