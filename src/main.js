import Vue from 'vue'
import App from './App'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

// import 'leaflet/dist/leaflet.css'
// import 'leaflet-measure-path/leaflet-measure-path.css';
// import { OpenStreetMapProvider } from 'leaflet-geosearch';

// import echarts from 'echarts'
// import echarts from 'echarts-gl'
// import liquidfill from 'echarts-liquidfill'
// Vue.prototype.$echarts = echarts;
// Vue.config.productionTip = false;

Vue.use(ElementUI);
import promise from 'es6-promise';
import store from './store'
import i18n from './lang' // Internationalization

// import './icons' // icon
import './errorLog'// error log
import * as filters from './filters' // global filters

// import Video from 'video.js'
// import 'video.js/dist/video-js.css'
// Vue.prototype.$video = Video;

promise.polyfill();
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {App}
})
