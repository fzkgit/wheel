import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store'

const Index = () => import('@/views/Index.vue');
const Detail = () => import('@/views/Detail.vue');
const Inquiry = () => import('@/views/Inquiry.vue');
const Carmoney = () => import('@/views/Carmoney.vue');
const Imgs = () => import('@/views/Img.vue');
const Color = () => import('@/views/Color.vue');
const Element = () => import('@/views/Element.vue');

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/Detail',
    name: 'Detail',
    component: Detail
  }, {
    path: '/Inquiry',
    name: 'Inquiry',
    component: Inquiry
  }, {
    path: '/Carmoney',
    name: 'Carmoney',
    component: Carmoney
  }, {
    path: '/Imgs',
    name: 'Imgs',
    component: Imgs
  }, {
    path: '/Color',
    name: 'Color',
    component: Color
  }, {
    path: '/Element',
    name: 'Element',
    component: Element
  } ,{
    path: '*',
    redirect: '/'
  }]
})

router.beforeEach((to, from ,next)=>{
  store.commit('updateShowLoading', true);
  next()
})

router.afterEach(()=>{
  setTimeout(function(){
    store.commit('updateShowLoading', false);
  },0)
})

export default router