import Vue from 'vue'
import Router from 'vue-router'
import login from 'pages/login'
import index from 'pages/index'
import AdminEdit from 'pages/AdminEdit'
import AddAdmin from 'pages/AddAdmin'
import edit from 'pages/edit'
import BlogsEdit from 'pages/BlogsEdit'
import BlogPublish from 'pages/BlogPublish'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      name:'tanpopo后台管理',
      path:'/',
      component:index,
    },
    {
      name:'index',
      path:'/index',
      redirect:'/',
    },
    {
      name:'登录',
      path:'/login',
      meta:{
        aside:1,
      },
      component:login
    },
    {
      name:'成员列表',
      path:'/AdminEdit',
      component:AdminEdit
    },
    {
      name:'添加管理员',
      path:'/AddAdmin',
      component:AddAdmin
    },
    {
      name:'编辑',
      path:'/edit',
      component:edit
    },
    {
      name:'文章管理',
      path:'/BlogsEdit',
      component:BlogsEdit
    },
    {
      name:'文章发布',
      path:'/BlogPublish',
      component:BlogPublish
    },
    {
      name:'文章编辑',
      path:'/BlogEdit/:id',
      component:BlogPublish
    },
  ]
})


export default router
