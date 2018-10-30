import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store'

const Index = () => import('@/views/Index.vue');
const Main = () => import('@/views/children/Main.vue');
const follow = () => import('@/views/children/follow.vue');
const message = () => import('@/views/children/message.vue');
const more = () => import('@/views/children/more.vue');
const myself = () => import('@/views/children/myself.vue');
const recommend = () => import('@/views/children/children/recommend.vue');
const city = () => import('@/views/children/children/city.vue');

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index,
    children: [{
      path: '/index/Main',
      name: 'Main',
      component: Main,
      children: [{
        path: '/index/main/recommend',
        name: 'recommend',
        component: recommend,
      }, {
        path: '/index/main/city',
        name: 'city',
        component: city,
      }]
    }, {
      path: '/index/follow',
      name: 'follow',
      component: follow,
    }, {
      path: '/index/message',
      name: 'message',
      component: message,
    }, {
      path: '/index/more',
      name: 'more',
      component: more,
    }, {
      path: '/index/myself',
      name: 'myself',
      component: myself,
    }, {
      path: '*',
      redirect: '/index/main/recommend'
    }]
  }]
})

router.beforeEach((to, from ,next)=>{
  next()
})

router.afterEach(()=>{
})

export default router