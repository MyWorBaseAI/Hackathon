import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import routes from './routes'

createApp(App)
    .use(vuetify)
    .use(routes)
    .mount('#app')
