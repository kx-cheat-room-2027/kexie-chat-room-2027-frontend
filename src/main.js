import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from "pinia";

const app = createApp(App)
app.use(createPinia())  // Pinia 必须在 mount 之前注册
app.use(ElementPlus)
app.use(router)
app.mount('#app')
