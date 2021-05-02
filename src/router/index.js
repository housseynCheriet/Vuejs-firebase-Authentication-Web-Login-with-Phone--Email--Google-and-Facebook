// /src/routes.js
//import Home from '@/components/Home'
import Login from '@/components/Login'
import AuthGuard from './AuthGuard.js'

import rouutes from './rouutes'
//import childLogin from './ChildrenLogin'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
 
export default new VueRouter({
  mode: 'history',
  routes:[
  {
      path: '/',
      name: 'Home',
      component: Login,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: AuthGuard //no if off
    },
   {
      path: '*',
      redirect: '/'
   },{
      path: '/hahahaahaahaaha',
   children: rouutes
   }
   /*,
   {
      //path: '/app2/:uid',
      path: '/app2',
      name: 'Home1',
      component: App2,
       
    children: childLogin
   },{
      path: '/login/app2',
      name: 'logreg1',
      component: App2,
      children: childLogin
   },{
      path: '/dashboard/app2',
      name: 'Dashboard1',
      component: App2,
       
    children: childLogin,
      meta: {
         requiresAuth: true
      }
   }*/
]
})