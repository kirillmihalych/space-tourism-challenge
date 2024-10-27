import './css/normalize.css'
import './css/utils.css'
import './css/layout.css'
import './css/properties.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
