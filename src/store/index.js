import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './action'
import mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  strict: debug
})

