import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import JsonViewer from 'vue-json-viewer'
import globalServices from '@utils/globalServices'
import formatDate from '@utils/formatDate'
import '@assets/styles/base.scss'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-json-viewer/style.css'
import './permission' // permission control

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(JsonViewer)

Vue.prototype.api = globalServices;
Vue.prototype.formatDate = formatDate;

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
      document.title = to.meta.title;
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
