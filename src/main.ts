import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ApiService from './services/ApiService'
// import axios from 'axios'

// axios.defaults.baseURL = 'http://127.0.0.1:5173';

const app = createApp(App)
app.use(createPinia())
app.use(router)
ApiService.init(app)
app.mount('#app')
