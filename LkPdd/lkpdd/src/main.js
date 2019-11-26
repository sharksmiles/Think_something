
import Vue from 'vue'
import App from './App'
import store from './store/index'//全局引用Vuex
import router from './router/index'
import  LyTab from "ly-tab"
import 'common/stylus/mixins.styl'

 Vue.use(LyTab);
new Vue({
  el: '#app',
   router,
   store,

  components: { App },
  template: '<App/>'
});
