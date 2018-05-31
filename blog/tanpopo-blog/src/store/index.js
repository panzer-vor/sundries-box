import Vue from 'vue'
import Vuex from 'vuex'

import base from './base/index'


Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    base:base
  }
});

