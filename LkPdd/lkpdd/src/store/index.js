/*
* Vuex状态管理文件入口
*公用状态放入Vuex
* */

import  Vue from  'vue'
import  Vuex from  'vuex'
import state from  './state'
import actions from  './actions'
import mutations from  './mutations'

Vue.use(Vuex);//全局使用vuex
//全局暴露 state、mutations、actions
export  default  new Vuex.Store({
   state,
  mutations,
  actions
})
