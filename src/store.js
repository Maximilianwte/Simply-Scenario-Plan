import Vue from "vue";
import Vuex from "vuex";
import svgDraw from "./data/svgDraw";
import cookie_functions from "./data/cookie_functions";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // ---- UI ----
    ui: {
      colorful: true,
      dark: false,
      // uiStep 0 (declare outcomeVariables), 1 (declare scenarioVariables)
      uiStep: 1,
    },

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
      if (payload == "inc" && state.ui.uiStep < 1) {
        state.ui.uiStep++;
      } else if (payload == "dec" && state.ui.uiStep > 0) {
        state.ui.uiStep--;
      }
      this.commit("setDataToCookie");
    },
    switchDarkMode(state, payload) {
      state.ui.dark = !state.ui.dark;
      this.commit("setDataToCookie");
    },
    switchColorfulMode(state, payload) {
      state.ui.colorful = !state.ui.colorful;
      this.commit("setDataToCookie");
    },
    // ---- Add Data ----

    addConnection(state, payload) {
      state.connectedShapes.push(payload);
      console.log(state.connectedShapes);
      svgDraw.updateAndConnectAll();
    },
    addOutcomeVariable(state, payload) {
      state.outcomeVariables.push(payload);
      this.commit("setDataToCookie");
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
      this.commit("setDataToCookie");
    },
    addScenarioVariable(state, payload) {
      state.scenarioVariables[payload.listID].push(payload.value);
      this.commit("setDataToCookie");
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
      this.commit("setDataToCookie");
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
    // ---- Handle Cookie Cache ----

    setDataFromCookie(state, payload) {
      for (var id in state) {
        var data = cookie_functions.getCookie("data_" + id);
        if (data != "") {
          state[id] = JSON.parse(data);
        }
      }
    },
    setDataToCookie(state, payload) {
      for (var id in state) {
        cookie_functions.setCookie("data_" + id, state[id], 90);
      }
    },
    clearAllEdits(state, payload) {
      for (var id in state) {
        cookie_functions.deleteCookie("data_" + id);
      }
      state = {
        // ---- UI ----
        ui: state.ui,

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
      };
    },
  },
});
