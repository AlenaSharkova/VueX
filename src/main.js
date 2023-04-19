import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from '@/router.js'
import vuetify from './plugins/vuetify'


createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')

