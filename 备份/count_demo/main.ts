import { createApp } from "vue";
import App from './App.vue'

const app = createApp(App)
app.mount('#app')

app.config.errorHandler = (err) => {
    /* 处理错误 */
    console.log('err', err);
}