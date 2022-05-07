import { createApp } from 'vue'
import App from './pages/App.vue'

function initVueApplication() {
  const app = createApp(App)
  app.mount('#app')
}

initVueApplication()
