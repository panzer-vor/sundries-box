// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'css/common.css'
import {httpPost,httpBinaryPost,httpGet} from "common/http";

window.httpPost = httpPost
window.httpGet = httpGet
window.httpBinaryPost = httpBinaryPost
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI)
/* eslint-disable no-new */

console.log(process.env.IMGHOST)

router.beforeEach((to, from, next) => {
  if(to.path!='/login'&&from.path=='/login'&&!localStorage.loginBean) next(router.go(-1))
  else if(to.path!='/login'){
    if(localStorage.loginBean){
      for(let j in store.state){
        if(localStorage[j]) store.state[j] = JSON.parse(localStorage[j])
      }
      next()
    }else {
      router.push('/login')
      next()
    }
  }
  next()

});



new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})



