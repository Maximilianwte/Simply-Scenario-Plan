import Vue from 'vue'
import Vuex from 'vuex'
import svgDraw from "./data/svgDraw";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connectedShapes: [
      ["free0", "list2"]
    ]
  },
  mutations: {
    addConnection(state, payload) {
      state.connectedShapes.push(payload);
      console.log(state.connectedShapes);
      svgDraw.updateAndConnectAll();
    }
  }
})