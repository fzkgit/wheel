import Vue from 'vue';
import VueRouter from 'vue-router';

const Index = () => import('@/views/Index.vue');
const Detail = () => import('@/views/Detail.vue');
const Inquiry = () => import('@/views/Inquiry.vue');
const Carmoney = () => import('@/views/Carmoney.vue');
const Imgs = () => import('@/views/Img.vue');
const Color = () => import('@/views/Color.vue');

Vue.use(VueRouter)

export default new VueRouter({
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
  } ,{
    path: '*',
    redirect: '/'
  }]
})