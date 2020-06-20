import Vue from 'vue'
import App from './App.vue'
//import App from './test3.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false;
Vue.use(Antd);

new Vue({
  render: h => h(App)
}).$mount('#app')
