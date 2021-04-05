import Vue from "vue";
import Vuex from "vuex";
import svgDraw from "./data/svgDraw";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // ---- UI ----
    colorful: true,
    // uiStep 0 (declare outcomeVariables), 1 (declare scenarioVariables)
    uiStep: 0,

    // ---- Variables ----

    outcomeVariables: [
      {
        id: 0,
        displayId: 0,
        title: "New Variable",
        top: 6,
        left: 4,
        cachePos: {
          top: null,
          left: null,
        },
      },
    ],
    scenarioVariables_1: [
      {
        id: 0,
        displayId: 0,
        title: "Item A",
        prob: 30,
      },
      {
        id: 1,
        displayId: 1,
        title: "Item B",
        prob: 11.2,
      },
      {
        id: 2,
        displayId: 2,
        title: "Item C",
        prob: 23,
      },
    ],
    // ---- Connected Shapes ----
    // ["outcomeVariables0", "scenarioVariables_1#1"]
    connectedShapes: [],
    // ---- Return Cache ----

    returnCache: {
      returnIndex: 0,
      values: [],
    },
  },
  mutations: {
    // ---- Handle UI ----
    moveUI(state, payload) {
      if (payload == "inc") {
        state.uiStep++;
      }
      else if (payload == "dec") {
        state.uiStep--;
      }
    },
    // ---- Add Data ----

    addConnection(state, payload) {
      state.connectedShapes.push(payload);
      console.log(state.connectedShapes);
      svgDraw.updateAndConnectAll();
    },
    addOutcomeVariable(state, payload) {
      state.outcomeVariables.push(payload);
    },
    addScenarioVariable(state, payload) {
      state.scenarioVariables.push(payload);
    },
    // ---- Handle Return Cache ----
    
    addReturnValue(state, payload) {
      state.returnCache.values.length >= 20 ? state.returnCache.values.shift() : null;
      state.returnCache.values.push({
        id: payload.id,
        value: payload.value
      });
      state.returnCache.returnIndex = 0;
      console.log(state.returnCache.values)
    },
    goStepBack(state) {
      const thisStep = state.returnCache.values[state.returnCache.values.length - state.returnCache.returnIndex - 1];
      switch (thisStep.id) {
        case "outcomeVariables": {
            state.outcomeVariables = thisStep.value;
            console.log(state.outcomeVariables)
            break;
        }
      }
      state.returnCache.returnIndex--;
    }
  },
});
