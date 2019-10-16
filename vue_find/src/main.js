// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./vuex/mine"
Vue.config.productionTip = false

/* eslint-disable no-new */
//登录拦截
router.beforeEach((to, from, next) => {
  /* 必须调用 `next` */
    if(store.state.loginUser||to.path=="/users/login"||to.path=="/users/userEdit"){
      //登录用户信息会保存到this.$store.state.loginUser，如果loginUser初始设置为'';
      next();
    }else{
      next({
        path:"/users/login"
      });
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
