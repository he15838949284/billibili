import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue';
import Register from '@/views/register.vue';
import Login from '@/views/Login.vue';
import Userinfo from '@/views/userinfo.vue';
import edit from '@/views/edit.vue';
import Article from '@/views/Article.vue';
import EditCategory from '../views/EditCategory.vue';

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

  const routes = [
  {
    path:"/",
    component:Home,
    meta:{
      keepalive:true
    }
  },
  {
    path:"/register",
    component:Register
  },
  {
    path:"/editcategory",
    component:EditCategory
  },
  {
    path:"/login",
    component:Login
  },
  {
    path:"/article/:id",
    component:Article
  },
  {
    path:"/userinfo",
    component:Userinfo,
    meta:{
      istoken:true
    }
  },
  {
    path:"/edit",
    component:edit,
    meta:{
      istoken:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  if((!localStorage.getItem('token') || !localStorage.getItem('id'))&&to.meta.istoken == true){
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()
})

export default router
