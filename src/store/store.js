import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { staysStore } from './stays.store.js'
import { reviewStore } from './review.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    staysStore,
    reviewStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
