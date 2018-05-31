import Vue from 'vue'
import Router from 'vue-router'
const index = resolve => require(['@/pages/index'], resolve);
const blog = resolve => require(['@/pages/blog'],resolve);
Vue.use(Router)

export default new Router({
  routes: [
    { //首页
      path: '/',
      redirect:'/index',
      component: index,
    },
    { //首页
      path:'/index',
      component:index
    },
    { //首页
      path:'/index/:pid',
      component:index
    },
    {  //前端列表
      name:'web',
      path:'/web/:pid',
      component:index
    },
    { //acg列表
      name:'acg',
      path:'/acg/:pid',
      component:index
    },
    { //杂项列表
      name:'another',
      path:'/another/:pid',
      component:index
    },
    { //博文内容
      path:'/:type/:date/:id',
      component:blog,
    }
  ]
})
