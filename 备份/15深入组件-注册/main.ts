import { createApp } from 'vue'
import App from './App.vue'
import GlobalButtonCounterA from './GlobalButtonCounterA.vue'
import GlobalButtonCounterB from './GlobalButtonCounterB.vue'

const app = createApp(App)
app
    .component('GlobalButtonCounterCustomA', GlobalButtonCounterA)
    .component('GlobalButtonCounterCustomB', GlobalButtonCounterB)


app.mount('#app')
