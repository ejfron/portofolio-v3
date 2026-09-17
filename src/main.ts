import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import logo from '../public/images/CD1D618A-63DE-4FB0-9277-1BEEEFA43796.png'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const link: HTMLLinkElement =
  document.querySelector("link[rel~='icon']") || document.createElement('link')
link.rel = 'icon'
link.href = logo
document.head.appendChild(link)
