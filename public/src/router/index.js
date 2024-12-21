// src/router/index.js  
import Vue from 'vue';  
import Router from 'vue-router';  
import index from '@/view/index/index.vue';  

Vue.use(Router);  

export default new Router({  
  mode: 'hash',  
  base: process.env.BASE_URL,  
  routes: [  
    {  
      path: '/',  
      name: 'index',  
      component: () => import('@/view/index/index.vue')
    }
  ]  
});