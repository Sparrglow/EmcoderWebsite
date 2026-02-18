/**
 * 应用入口 (规范 §0 技术架构)
 * Vue 3 + Vue Router 4 + vue-i18n
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './lib/i18n'
import './styles/global.scss'

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
