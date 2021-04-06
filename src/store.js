import Vue from "vue";
import Vuex from "vuex";
import svgDraw from "./data/svgDraw";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // ---- UI ----
    colorful: true,
    dark: false,
    // uiStep 0 (declare outcomeVariables), 1 (declare scenarioVariables)
    uiStep: 1,

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
    scenarioVariables: [
      [
        {
          id: 0,
          displayId: 0,
          title: "Scenario A",
          prob: 0,
        },
        {
          id: 1,
          displayId: 1,
          title: "Scenario B",
          prob: 11.2,
        },
        {
          id: 2,
          displayId: 2,
          title: "Scenario C",
          prob: 23,
        },
      ],
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
      } else if (payload == "dec") {
        state.uiStep--;
      }
    },
    switchDarkMode(state, payload) {
      state.dark = !state.dark;
    },
    switchColorfulMode(state, payload) {
      state.colorful = !state.colorful;
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
    addScenarioList(state, payload) {
      state.scenarioVariables.push([
        {
          id: 0,
          displayId: 0,
          title: "New Scenario",
          prob: 0,
        },
      ]);
    },
    addScenarioVariable(state, payload) {
      state.scenarioVariables[payload.listID].push(payload.value);
    },
    // ---- Handle Return Cache ----

    addReturnValue(state, payload) {
      state.returnCache.values.length >= 20
        ? state.returnCache.values.shift()
        : null;
      state.returnCache.values.push({
        id: payload.id,
        value: payload.value,
      });
      state.returnCache.returnIndex = 0;
      console.log(state.returnCache.values);
    },
    goStepBack(state) {
      const thisStep =
        state.returnCache.values[
          state.returnCache.values.length - state.returnCache.returnIndex - 1
        ];
      switch (thisStep.id) {
        case "outcomeVariables": {
          state.outcomeVariables = thisStep.value;
          console.log(state.outcomeVariables);
          break;
        }
      }
      state.returnCache.returnIndex--;
    },
  },
});
