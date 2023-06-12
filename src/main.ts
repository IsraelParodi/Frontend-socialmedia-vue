import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from '@/axios'
// import axios from 'axios'

// axios.defaults.baseURL = 'http://127.0.0.1:5173';

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(axios, {
  baseUrl: 'http://127.0.0.1:5173'
})
app.mount('#app')
