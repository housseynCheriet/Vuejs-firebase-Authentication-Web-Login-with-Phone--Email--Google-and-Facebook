// src/store/store.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import AuthModule from './auth/AuthModule'
export const store = new Vuex.Store({
   modules: {
      auth: AuthModule
      
   }
   });
