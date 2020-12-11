import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    steps: {
      current: 0,
      fulFilled: true,
      maxStep: 1
    },
    activeCategories: {
      electricity: false,
      water: true,
      heating: false,
      trash: false,
    }
  },
  mutations: {
    toggleCategorie(state, payload) {
      state.activeCategories[payload] = !state.activeCategories[payload]
    },
    handleFulfilled(state, payload) {
      state.steps.fulFilled = payload;
    },
    handleProgress(state, payload) {
      if (payload == "inc" && state.steps.current < state.steps.maxStep) {
        state.steps.current++;
        state.steps.fulFilled = false;
      }
      else if (payload == "dec" && state.steps.current > 0) {
        state.steps.current--;
      }

      if (state.steps.current == 0) {
        state.steps.maxStep = 1;
      }

      if (payload == "inc" && state.steps.current == 1) {
        if (state.activeCategories.electricity == true) {
          state.steps.maxStep = state.steps.maxStep + 3;
        }
        if (state.activeCategories.water) {
          state.steps.maxStep = state.steps.maxStep + 3;
        }
        if (state.activeCategories.heating) {
          state.steps.maxStep = state.steps.maxStep + 4;
        }
      }
    }
  },
  actions: {

  }
})
