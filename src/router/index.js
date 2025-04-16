import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
//import { component } from 'vue/types/umd'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomeView,
    redirect:'home/register',
    /*children:[
      {
    path: 'home/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: 'home/register',
    component: () => import('../views/RegisterView.vue')
  }
    ]*/
  },
  {
    path: '/home/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/home/register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path:'/home/user',
    component:() => import('../views/UserView.vue')
  },
  {
    path:'/home/manager',
    component:() => import('../views/ManagerView.vue')
  },
  {
    path:'/404',
    component:()=>import('../views/NotFoundView.vue')
  },
  {
    path:'*',
    redirect:'/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
