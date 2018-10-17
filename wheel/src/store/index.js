import Vue from 'vue';
import Vuex from 'vuex';
import Logger from 'vuex/dist/logger';

import Index from './module/index'
import Detail from './module/detail'
import Inquiry from './module/Inquiry'
import Imgs from './module/img'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Index,
    Detail,
    Inquiry,
    Imgs
  },
  plugins: [Logger()]
})