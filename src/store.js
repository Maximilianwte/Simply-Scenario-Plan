import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connectedShapes: [
      ["free0", "list0"]
    ]
  },
  mutations: {
    addConnection(state, payload) {
      state.connectedShapes.push(payload);
      console.log(state.connectedShapes);
    }
  }
})