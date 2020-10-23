import Vue from 'vue'
import Vuex from 'vuex'
import { ModalBus, MODAL_OPEN } from '../helpers/modalBus';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    openDialog(context, { component, props = {} }) {
      ModalBus.$emit(MODAL_OPEN, { component, props })
    },
  },
  modules: {}
})
