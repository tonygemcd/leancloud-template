import Vue from 'vue'
import App from './App'
import router from './lib/router'

Vue.config.debug = process.env.NODE_ENV !== 'production'

router.start(App, '#app')
