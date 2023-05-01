import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

import VDContainer from 'vue-flexable-dnd'

import './assets/style.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VCalendar, {})
app.use(VDContainer)

app.mount('#app')