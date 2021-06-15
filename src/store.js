import Vue from "vue";
import Vuex from "vuex";
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
      shownMobile: false,
    },
    // ---- User Data
    user: {
      enableTracking: null,
      login: true,
      email: null,
      id: null,
      fileName: null,
      // this keeps track of time for autosaving
      lastChanged: null
    },

    // ---- Variables ----

    outcomeVariables: [
      {
        id: 0,
        displayId: 0,
        title: "Happiness",
        color: "#F2E5AA",
        top: 6,
        left: 4,
      },
    ],
    scenarioVariables: [
      [
        {
          id: 0,
          displayId: 0,
          title: "Scenario A",
          prob: 0,
          impact: [20],
          unit: ["b"],
          color: "#85E0FF"
        },
        {
          id: 1,
          displayId: 1,
          title: "Scenario B",
          prob: 11.2,
          impact: [-5.2],
          unit: ["k"],
          color: "#91DBBC"
        }
      ],
    ],
    // ---- Connected Shapes ----
    // ["outcomeVariables0", "scenarioVariables_1#1"]
    connectedShapes: [],
    connectedShapesOutput: [],
    // ---- Return Cache ----

    returnCache: {
      returnIndex: 0,
      values: [],
    },
  },
  mutations: {
    // ---- Handle UI ----

    moveUI(state, payload) {
      if (payload == "inc" && state.ui.uiStep < 2) {
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
    setMobileNoteShown(state) {
      state.ui.shownMobile = true;
      this.commit("setDataToCookie", "ui");
    },
    // ---- Handle User ----

    setUser(state, payload) {
      state.user.email = payload.email;
      state.user.id = payload.id;
      state.user.login = true;
      console.log("changed to ", state.user.email)
    },
    setLogout(state) {
      state.user.email = "";
      state.user.login = false;
    },
    setLastUpdateTime(state, payload) {
      state.user.lastChanged = payload;
    },
    setFileName(state, payload) {
      state.user.fileName = payload;
    },
    setTracking(state, payload) {
      state.user.enableTracking = payload;
    },
    // ---- Add Data ----

    addConnection(state, payload) {
      console.log("addcon", payload)
      for (var i = 0; i < state.connectedShapes.length; i++) {
        if (state.connectedShapes[i].length < 2) {
          state.connectedShapes.splice(i, 1)
        }
      }
      state.connectedShapes.push(payload);
      this.commit("setDataToCookie", "connectedShapes");
    },
    // i must have the ability to process for multiple vars
    addAllOutputConnections(state, payload) {
      state.connectedShapesOutput[payload.id] = payload.values;
    },
    deleteConnection(state, payload) {
      state.connectedShapes.splice(payload, 1);
      this.commit("setDataToCookie", "connectedShapes");
    },
    addOutcomeVariable(state, payload) {
      state.outcomeVariables.push(payload);
      this.commit("setDataToCookie", "outcomeVariables");
    },
    addScenarioList(state) {
      const colors = ["#FFBCB5", "#85E0FF", "#91DBBC", "#F2E5AA", "#F59D7D"];
      const nCol = colors.length;
      const colValue = Math.round(Math.random() * (nCol - 1));
      state.scenarioVariables.push([
        {
          id: 0,
          displayId: 0,
          title: "New Scenario",
          prob: 0,
          color: colors[colValue],
          impact: Array(state.outcomeVariables.length).fill(0),
          unit: Array(state.outcomeVariables.length).fill(" ")
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
      state.connectedShapes = state.connectedShapes.filter(list => (testAllElements(list) == 0));
      state.connectedShapes = state.connectedShapes.filter(list => list.length > 0)
      //state.connectedShapes = state.connectedShapes.filter(list => list.length != 0)
      var index = state.scenarioVariables[payload.listID].findIndex(item => item.id == payload.id)
      state.scenarioVariables[payload.listID].splice(index, 1);
      this.commit("setDataToCookie", "scenarioVariables");

      function testAllElements(list) {
        for (var i = 0; i < list.length; i++) {
          if (list[i] == displayID) {
            return 1
          } 
        }
        return 0;
      }
    },
    deleteOutcomeVariable(state, payload) {
      state.outcomeVariables.splice(payload.id, 1);
/*       state.scenarioVariables.forEach(list => {
        list.forEach(variable => {
          console.log(variable)
          //variable.splice(payload.id, 1);
        })
      }) */
      this.commit("setDataToCookie", "scenarioVariables");
    },
    // ---- Handle Return Cache ----

    addReturnValue2(state, payload) {
      state.returnCache.values.length >= 20
        ? state.returnCache.values.shift()
        : null;
      state.returnCache.values.push({
        type: payload.type,
        path: payload.path,
        valBefore: payload.valBefore,
        valAfter: payload.valAfter,
      });
      state.returnCache.returnIndex = 0;
      //this.commit("setDataToCookie", "returnCache");
    },
    reverseEdit2(state) {
      if (
        state.returnCache.values.length != 0 &&
        state.returnCache.returnIndex <= (state.returnCache.values.length -1)
      ) {
        const thisStep =
          state.returnCache.values[
            state.returnCache.values.length - 1 - state.returnCache.returnIndex
          ];
        switch (thisStep.type) {
          case "clearAll": {
            Object.assign(state, thisStep.valBefore);
          }
          case "deleteOutcomeVariable": {
            this.commit("addOutcomeVariable", thisStep.valBefore);
            break;
          }
          case "addOutcomeVariable": {
            state.outcomeVariables.pop();
            break;
          }
          case "changeOutcomeVariable": {
            state.outcomeVariables[thisStep.path].title = thisStep.valBefore;
            break;
          }
          case "addScenarioVariable": {
            this.commit("deleteScenarioVariable", {
              listID: thisStep.path,
              id: thisStep.valAfter.id,
            });;
            break;
          }
          case "deleteScenarioVariable": {
            this.commit("addScenarioVariable", {
              listID: thisStep.path,
              value: thisStep.valBefore,
            });
            break;
          }
          case "changeScenarioVariable": {
            if (thisStep.path[2] == "impact" || thisStep.path[2] == "unit") {
              Vue.set(state.scenarioVariables[thisStep.path[0]][thisStep.path[1]][thisStep.path[2]], thisStep.path[3], thisStep.valBefore);
            }
            else {
              state.scenarioVariables[thisStep.path[0]][thisStep.path[1]][thisStep.path[2]] = thisStep.valBefore;
            }
            break;
          }
        }
        state.returnCache.returnIndex++;
      }
    },
    undoReverse(state) {
      if (
        state.returnCache.values.length != 0 &&
        state.returnCache.returnIndex > 0
      ) {
        state.returnCache.returnIndex--;
        const thisStep =
          state.returnCache.values[
            state.returnCache.values.length - 1 - state.returnCache.returnIndex
          ];
        switch (thisStep.type) {
          case "clearAll": {
            Object.assign(state, thisStep.valAfter);
            break
          }
          case "addOutcomeVariable": {
            this.commit("addOutcomeVariable", thisStep.valAfter);
            break;
          }
          case "changeOutcomeVariable": {
            state.outcomeVariables[thisStep.path].title = thisStep.valAfter;
            break;
          }
          case "deleteOutcomeVariable": {
            state.outcomeVariables.pop();
            break;
          }
          case "scenarioVariable": {
            state.outcomeVariables[thisStep.path[0]][thisStep.path[1]][thisStep.path[2]] = thisStep.valBefore;
            break;
          }
          case "addScenarioVariable": {
            this.commit("addScenarioVariable", {
              listID: thisStep.path,
              value: thisStep.valAfter,
            });
            break;
          }
          case "deleteScenarioVariable": {
            this.commit("deleteScenarioVariable", {
              listID: thisStep.path,
              id: thisStep.valBefore.id,
            });
            break;
          }
          case "changeScenarioVariable": {
            if (thisStep.path[2] == "impact" || thisStep.path[2] == "unit") {
              Vue.set(state.scenarioVariables[thisStep.path[0]][thisStep.path[1]][thisStep.path[2]], thisStep.path[3], thisStep.valAfter)
            }
            else {
              state.scenarioVariables[thisStep.path[0]][thisStep.path[1]][thisStep.path[2]] = thisStep.valAfter;
            }
            break;
          }
        }
      }
    },
    setCompleteState(state, payload) {
      Object.assign(state, payload);
      this.commit("setDataToCookie");
    },
    // ---- Handle Cookie Cache ----
    setDataFromCookie(state) {
      for (var id in state) {
        var data = cookie_functions.getCookie("data_" + id);
        if (data != "") {
          state[id] = JSON.parse(data.replaceAll("_{percent}", "%"));
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
      var currentState = {}
      Object.assign(currentState, state);
      const startValues = {
        // ---- UI ----
        ui: {
          colorful: state.ui.colorful,
          dark: state.ui.dark,
          // uiStep 0 (declare outcomeVariables), 1 (declare scenarioVariables)
          uiStep: 0,
          shownMobile: false,
        },

        // ---- Variables ----

        outcomeVariables: [
          {
            id: 0,
            displayId: 0,
            title: "New Variable",
            top: 6,
            left: 4,
            color: "#85E0FF"
          },
        ],
        scenarioVariables: [
          [
            {
              id: 0,
              displayId: 0,
              title: "Scenario A",
              prob: 0,
              impact: [0],
              unit: [" "],
              color: "#FFBCB5"
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
      cookie_functions.deleteWholeCookie();
      for (var id in state) {
        cookie_functions.deleteCookie("data_" + id);
      }
      Object.assign(state, startValues);
      this.commit("addReturnValue2", {
        type: "clearAll",
        valBefore: currentState,
        valAfter: startValues
      })
    },
  },
});
