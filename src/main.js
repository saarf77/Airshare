import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import VCalendar from 'v-calendar';


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/styles/main.scss'
import './assets/styles/setup/_typography.scss'
import rootCmp from './root-cmp.vue'

const app = createApp(rootCmp)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VCalendar, {});
app.mount('#app')
