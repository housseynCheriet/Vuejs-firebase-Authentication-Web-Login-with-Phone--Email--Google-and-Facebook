
import Vue from 'vue'
Vue.prototype.$fire = '';
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);



///////console.log(global);
/*global.jQuery = require('jquery');
var jQuery = global.jQuery;
window.jQuery = jQuery;*/

import {firebase} from './firestore'


import  router  from './router'

import {store} from './store/store'   // <-- add this line ---------
import vuetify from './plugins/vuetify';

//console.log(store);
Vue.use(firebase);
Vue.config.productionTip = false


let app = '';
//console.log(router.history._startLocation)
//console.log(firebase);
/*router.beforeEach((to, from, next) => {
console.log(to,from,next);
next();
 
})*/

firebase.auth(firebase.apps[3]).onAuthStateChanged(user => { console.log('****00: ',user);
if(!app){
    console.log(user);
    app = new Vue({
      router,
      //1==3?router:router,
      store,
      vuetify,
      render: h =>h(App)// h(dashboard)
    }).$mount('#app')
  }
});




