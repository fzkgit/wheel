import Vue from 'vue';
import Vuex from 'vuex';
import Logger from 'vuex/dist/logger';

import Index from './module/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Index
  },
  plugins: [Logger()]
})