import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index.js'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueTheMask from 'vue-the-mask'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import VueClipboard from 'vue-clipboard2'
import VueLazyload from 'vue-lazyload'
import VCalendar from 'v-calendar';
import Vuelidate from 'vuelidate'
 
Vue.use(Vuetify)
import ru from 'vuetify/es5/locale/ru'



import 'swiper/css/swiper.css'

const user = JSON.parse(localStorage.getItem("user"))
store.dispatch("auth/VALIDATE", user);

const calc = JSON.parse(localStorage.getItem("calc"))
store.dispatch("smeta/GET_CALC", calc);


Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://nikitapugachev.ru/wp-content/uploads/2021/03/lzld.jpg',
  loading: 'https://nikitapugachev.ru/wp-content/uploads/2021/03/lzld.jpg',
  attempt: 1,
  listenEvents: [ 'scroll' ]
})


Vue.use(VueRouter) 
Vue.use(Vuelidate)
Vue.use(require('vue-cookies'))
Vue.use(VueClipboard)
Vue.use(VCalendar);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  vuetify: new Vuetify({
    lang: {
      locales: { ru },
      current: 'ru'
    }
  }),
})

