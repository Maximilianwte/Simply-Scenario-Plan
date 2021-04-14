<template>
  <div id="front" class="w-full flex">
    <declareOutcomeVariables v-if="getUIStep == 0" />
    <declareScenarioVariables v-if="getUIStep == 1" />
    <div class="fixed right-0 mt-4 mr-4" id="menu">
      <button @click="menuActive = !menuActive">
        <svg
          class="h-8"
          viewBox="0 0 515.555 515.555"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M303.347 18.875c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0M303.347 212.209c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0M303.347 405.541c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0"
          />
        </svg>
      </button>
      <div
        v-if="menuActive"
        class="dropdown border-2 w-48 py-2 px-2 bg-bg rounded"
      >
        <ul>
          <li
            @click="goForeOneStep" :class="getGoForeActive"
            class="border-b-2 py-2 cursor-pointer hover:bg-gray-100"
          >
            Reverse last undo
          </li>
          <li
            @click="goBackOneStep"
            class="border-b-2 py-2 cursor-pointer hover:bg-gray-100" :class="getGoBackActive"
          >
            Undo last edit
          </li>
          <li
            @click="handleClearAll"
            class="border-b-2 py-2 cursor-pointer hover:bg-gray-100"
          >
            Clear All
          </li>
          <li
            @click="switchColorfulMode"
            class="border-b-2 py-2 cursor-pointer hover:bg-gray-100"
          >
            Switch Colorful Mode
          </li>
          <li
            @click="switchDarkMode"
            class="border-b-2 py-2 cursor-pointer hover:bg-gray-100"
          >
            Switch Dark Mode
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import varList from "../components/varList";
import varDraggableCanvas from "../components/varDraggableCanvas";
import declareOutcomeVariables from "../components/declareOutcomeVariables";
import declareScenarioVariables from "../components/declareScenarioVariables";
import store from "../store";
export default {
  components: {
    varList,
    varDraggableCanvas,
    declareOutcomeVariables,
    declareScenarioVariables,
  },
  data() {
    return {
      nVarLists: 1,
      menuActive: false,
    };
  },
  computed: {
    getUIStep() {
      return store.state.ui.uiStep;
    },
    nStepsToGoBack() {
      return (
        store.state.returnCache.values.length -
        store.state.returnCache.returnIndex
      );
    },
    getGoBackActive() {
      return this.nStepsToGoBack > 0 ? "bg-bg" : "bg-gray-200 text-gray-400"; 
    },
    getGoForeActive() {
      return store.state.returnCache.returnIndex > 0 ? "bg-bg" : "bg-gray-200 text-gray-400"; 
    },
  },
  methods: {
    addList() {
      this.nVarLists++;
    },
    goBackOneStep() {
      store.commit("reverseEdit2")
    },
    goForeOneStep() {
      store.commit("undoReverse")
    },
    switchDarkMode() {
      store.commit("switchDarkMode");
    },
    switchColorfulMode() {
      store.commit("switchColorfulMode");
    },
    handleClearAll() {
      store.commit("clearAllEdits");
    },
  },
  mounted() {
  },
};
</script>