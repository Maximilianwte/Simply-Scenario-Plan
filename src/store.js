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
      uiStep: 0,
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
      this.commit("setDataToCookie", "ui");
    },
    switchDarkMode(state) {
      state.ui.dark = !state.ui.dark;
      this.commit("setDataToCookie", "ui");
    },
    switchColorfulMode(state) {
      state.ui.colorful = !state.ui.colorful;
      this.commit("setDataToCookie", "ui");
    },
    // ---- Add Data ----

    addConnection(state, payload) {
      state.connectedShapes.push(payload);
      //Vue.set(state, "connectedShapes", state.connectedShapes.push(payload));
      svgDraw.updateAndConnectAll();
      this.commit("setDataToCookie", "connectedShapes");
    },
    addOutcomeVariable(state, payload) {
      state.outcomeVariables.push(payload);
      this.commit("setDataToCookie", "outcomeVariables");
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
      this.commit("setDataToCookie", "scenarioVariables");
    },
    addScenarioVariable(state, payload) {
      state.scenarioVariables[payload.listID].push(payload.value);
      this.commit("setDataToCookie", "scenarioVariables");
    },
    deleteScenarioVariable(state, payload) {
      var displayID = "scenarioVariables_" + (payload.listID+1) + "#" + payload.id;
      state.connectedShapes.forEach(list => testAllElements(list));
      state.connectedShapes = state.connectedShapes.filter(list => list.length != 0)
      state.scenarioVariables[payload.listID].splice(payload.id-1, 1);
      this.commit("setDataToCookie", "scenarioVariables");

      function testAllElements(list) {
        for (var i = 0; i < list.length; i++) {
          if (list[i] == displayID) {
            list.splice(i);
            break;
          } 
        }
      }
    },
    // ---- Handle Return Cache ----

    addReturnValue(state, payload) {
      state.returnCache.values.length >= 20
        ? state.returnCache.values.shift()
        : null;
      state.returnCache.values.push({
        id: payload.id,
        idList: payload.idList,
        value: payload.value,
      });
      state.returnCache.returnIndex = 0;
      this.commit("setDataToCookie", "returnCache");
    },
    undoEdit(state) {
      if (
        state.returnCache.values.length != 0 &&
        state.returnCache.returnIndex <= (state.returnCache.values.length -1)
      ) {
        const thisStep =
          state.returnCache.values[
            state.returnCache.values.length - 1 - state.returnCache.returnIndex
          ];
        switch (thisStep.id) {
          case "declareOutcomeVariables": {
            Vue.set(state, "outcomeVariables", thisStep.value);
            break;
          }
          case "scenarioVariables": {
            Vue.set(state.scenarioVariables, thisStep.idList , thisStep.value);
            break;
          }
          case "allData": {
            Object.assign(state, thisStep.value);
          }
        }
        state.returnCache.returnIndex++;
      }
    },
    // ---- Handle Cookie Cache ----

    setDataFromCookie(state) {
      for (var id in state) {
        var data = cookie_functions.getCookie("data_" + id);
        if (data != "") {
          state[id] = JSON.parse(data);
        }
      }
    },
    setDataToCookie(state, payload) {
      if (payload == null) {
        for (var id in state) {
          cookie_functions.setCookie("data_" + id, state[id], 90);
        }
      } else {
        cookie_functions.setCookie("data_" + payload, state[payload], 90);
      }
    },
    clearAllEdits(state) {
      /* const cachedState = {};
      Object.assign(cachedState, state)
      this.commit("addReturnValue", {
        id: "allData",
        value: cachedState,
      }); */
      for (var id in state) {
        cookie_functions.deleteCookie("data_" + id);
      }
      const startValues = {
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
      Object.assign(state, startValues);
    },
  },
});
