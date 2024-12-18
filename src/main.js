import Vue from 'vue'
import App from './App.vue'
import router from './router';
import ElementUI from 'element-ui';
import store from './utils/store'
import 'element-ui/lib/theme-chalk/index.css';
import dataV from '@jiaminghi/data-view'
import './assets/icon/font/iconfont.js';

Vue.use(dataV)
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')