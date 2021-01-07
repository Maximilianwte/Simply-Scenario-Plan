import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    steps: {
      current: 0,
      fulFilled: true,
      maxStep: 1,
      toDo: ["general"]
    },
    activeCategories: {
      electricity: false,
      water: false,
      heating: false,
      trash: false,
      nActive: 0
    },
    input: {
      general: {
        id: "general",
        haveHouse: null,
        typeOfHouse: null,
        sizeOfHouse: null,
        nFloors: null
      },
      electricity: {
        id: "electricity",
        doKnowCost: null,
        doKnowAmount: null,
        electricityBill: null,
        electricityAmount: null,
        peopleInHouse: null
      },
      water: {},
      heating: {
        id: "heating",
        doKnowType: null,
        doKnowCost: null,
        doKnowAmount: null,
        heatingBill: null,
        heatingAmount: null,
        peopleInHouse: null
      }
    }
  },
  mutations: {
    toggleCategorie(state, payload) {
      state.activeCategories[payload] = !state.activeCategories[payload]
      if (state.activeCategories[payload] == true) {
        state.activeCategories.nActive++;
      } else {
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
      } else if (payload == "dec" && state.steps.current > 0) {
        state.steps.current--;
        state.steps.fulFilled = true;
      }

      if (state.steps.current == 0) {
        state.steps.maxStep = 1;
        state.steps.toDo = ["general"];
      }

      if (payload == "inc" && state.steps.current == 1) {
        state.steps.maxStep++;
        for (var index in state.activeCategories) {
          if (index != "nActive" && state.activeCategories[index] == true) {
            state.steps.maxStep++;
            state.steps.toDo.push(index);
          }
        }
      }
    },
    pushData(state, payload) {
      state.input[payload.id] = payload
      console.log(state.input[payload.id])
    }
  },
  actions: {

  }
})