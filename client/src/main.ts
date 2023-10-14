import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import routes from './routes'
import store from './store'

createApp(App)
    .use(vuetify)
    .use(routes)
    .use(store)
    .mount('#app')
