import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    step: 0,
    maxStep: 1,
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
    handleProgress(state, payload) {
      if (payload == "inc" && state.step < 4) {
        state.step = state.step + 1;
      }
      else if (payload == "dec" && state.step > 1) {
        state.step--;
      }

      if (payload == "inc" && state.step == 1) {
        console.log("calculate maxStep")
        if (state.activeCategories.electricity == true) {
          state.maxStep = state.maxStep + 3;
          console.log("Electricity added")
        }
        if (state.activeCategories.water) {
          state.maxStep = state.maxStep + 3;
        }
        if (state.activeCategories.heating) {
          state.maxStep = state.maxStep + 4;
        }
      }
      console.log(state.step)
    }
  },
  actions: {

  }
})
