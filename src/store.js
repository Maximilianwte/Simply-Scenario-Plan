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
      electricity: true,
      water: false,
      heating: false,
      trash: false,
      nActive: 1
    }
  },
  mutations: {
    toggleCategorie(state, payload) {
      state.activeCategories[payload] = !state.activeCategories[payload]
      if (state.activeCategories[payload] == true) {
        state.activeCategories.nActive++;
      }
      else {
        state.activeCategories.nActive--;
      }
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
