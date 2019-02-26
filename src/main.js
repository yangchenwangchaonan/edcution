import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'asset/css/reset.css'
import 'asset/css/common.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'

import echarts from 'echarts'
import axios from 'axios'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'


Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);

// axios.defaults.baseURL='http://zhihuotech.com:8888';
axios.defaults.baseURL='https://zhihuotech.com/rep/';


Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.axios = axios;
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
});

