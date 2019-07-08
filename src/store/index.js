import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'

import tagsView from './modules/tagsView'
import user from './modules/user'
import data from './modules/data'
import getters from './getters'
import enumeration from './modules/enumeration'
import img from './modules/img'
import coupling from './modules/coupling'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    tagsView,
    user,
    data,
    enumeration,
    coupling,
    img
  },
  getters
})

export default store
