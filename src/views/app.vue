<template>
  <div id="front" class="w-full flex">
    <!-- ---- Components ---- -->

    <declareOutcomeVariables v-if="id == 0" />
    <declareScenarioVariables v-if="id == 1" />
    <outputs v-if="id == 2" />

    <!-- ---- Overlay for clearAll Menu ---- -->

    <div
      id="clearAllAskOverlay"
      v-if="askClearAll"
      class="fixed z-20 centered flex-col w-80 h-48 shadow text-2xl bg-bg rounded border-4"
    >
      <h6 class="w-full text-center">
        Are you sure you want to clear all edits?
      </h6>
      <div class="rowButtons mt-4">
        <button
          @click="handleClearAll"
          class="px-6 py-2 bg-focus text-white mx-2 rounded cursor-pointer hover:bg-main"
        >
          Yes
        </button>
        <button
          @click="askClearAll = false"
          class="px-6 py-2 bg-focus mx-2 text-white rounded cursor-pointer hover:bg-main"
        >
          No
        </button>
      </div>
    </div>
    <!-- ---- Overlay for loading file---- -->

    <div
      id="loadFileAskOverlay"
      v-if="askLoadFile"
      class="fixed z-20 centered flex-col w-80 py-4 shadow text-xl bg-bg rounded border-4"
    >
      <h6 class="w-full text-center">Which file do you want to load?</h6>
      <!-- show list of file names from backend here -->
      <ul class="rounded px-2 py-2 border-2 my-4">
        <li
          @click="setLoadFile('idOfFile from v-for')"
          class="py-2 hover:bg-gray-100 cursor-pointer"
          :class="[loadFile == 'idOfFile from v-for' ? 'bg-gray-100' : null]"
        >
          File 1 (last saved 20.04.2021)
        </li>
        <li class="py-2 hover:bg-gray-100 cursor-pointer">
          File 2 (last saved 28.04.2021)
        </li>
      </ul>
      <div class="rowButtons mt-4">
        <button
          @click="handleLoadFile"
          class="px-6 py-2 bg-focus text-white mx-2 rounded cursor-pointer hover:bg-main"
        >
          Load file
        </button>
        <button
          @click="askLoadFile = false"
          class="px-6 py-2 bg-focus mx-2 text-white rounded cursor-pointer hover:bg-main"
        >
          Go back
        </button>
      </div>
    </div>

    <!-- ---- Overlay for saving file---- -->

    <div
      id="saveFileAskOverlay"
      v-if="askSaveFile"
      class="fixed z-20 centered flex-col w-80 py-4 shadow text-xl bg-bg rounded border-4"
    >
      <h6 class="w-full text-center">How do you want to name this file?</h6>
      <form class="flex items-center mt-4 mb-4">
        <label for="text" class="mr-4">Filename:</label>
        <input
          type="text"
          v-model="fileName"
          @change="checkInputs"
          class="rounded border-2"
        />
      </form>
      <h6 class="text-focus">{{ warnText }}</h6>
      <div class="rowButtons mt-4">
        <button
          @click="handleSaveNewFile"
          class="px-6 py-2 bg-focus text-white mx-2 rounded cursor-pointer hover:bg-main"
        >
          Save
        </button>
        <button
          @click="askSaveFile = false"
          class="px-6 py-2 bg-focus mx-2 text-white rounded cursor-pointer hover:bg-main"
        >
          Don't save
        </button>
      </div>
    </div>

    <!-- ---- Overlay Dropdown Menu ---- -->

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
            @click="goForeOneStep"
            :class="getGoForeActive"
            class="border-b-2 py-2 cursor-pointer hover:bg-gray-100"
          >
            Reverse last undo
          </li>
          <li
            @click="goBackOneStep"
            class="border-b-2 py-2 cursor-pointer hover:bg-gray-100"
            :class="getGoBackActive"
          >
            Undo last edit
          </li>
          <li
            @click="askLoadFile = true"
            class="border-b-2 py-2 cursor-pointer hover:bg-gray-100"
          >
            Load File
          </li>
          <li
            @click="handleSaveFile"
            class="border-b-2 py-2 cursor-pointer hover:bg-gray-100"
          >
            Save File
          </li>
          <li
            @click="askSaveFile = true"
            class="border-b-2 py-2 cursor-pointer hover:bg-gray-100"
          >
            Save as new
          </li>
          <li
            @click="askClearAll = true"
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
import declareOutcomeVariables from "./declareOutcomeVariables";
import declareScenarioVariables from "./declareScenarioVariables";
import outputs from "./outputs";
import store from "../store";
import $ from "jquery";
export default {
  components: {
    declareOutcomeVariables,
    declareScenarioVariables,
    outputs,
  },
  props: ["id"],
  data() {
    return {
      nVarLists: 1,
      menuActive: false,
      askClearAll: false,
      askLoadFile: false,
      askSaveFile: false,
      loadFile: null,
      fileName: this.getFileName,
      warnText: null,
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
    getFileName() {
      return store.state.user.fileName;
    },
    getGoBackActive() {
      return this.nStepsToGoBack > 0 ? "bg-bg" : "bg-gray-200 text-gray-400";
    },
    getGoForeActive() {
      return store.state.returnCache.returnIndex > 0
        ? "bg-bg"
        : "bg-gray-200 text-gray-400";
    },
  },
  methods: {
    addList() {
      this.nVarLists++;
    },
    goBackOneStep() {
      store.commit("reverseEdit2");
    },
    goForeOneStep() {
      store.commit("undoReverse");
    },
    switchDarkMode() {
      store.commit("switchDarkMode");
    },
    switchColorfulMode() {
      store.commit("switchColorfulMode");
    },
    handleClearAll() {
      store.commit("clearAllEdits");
      this.askClearAll = false;
    },
    checkInputs() {
      if (this.fileName.length > 3) {
        this.warnText = null;
      } else {
        this.warnText = "Please choose a longer file name.";
      }
    },
    setLoadFile(id) {
      this.loadFile = id;
    },
    handleLoadFile() {
      store.commit("");
      this.askLoadFile = false;
    },
    handleSaveFile() {
      if (store.state.user.fileName != undefined) {
        // do stuff
      } else {
        this.askSaveFile = true;
      }
    },
    handleSaveNewFile() {
      if (this.fileName.length > 3) {
        store.commit("");
        console.log(this.fileName);
        this.askSaveFile = false;
      }
    },
  },
  mounted() {
    this.$router.push({
      name: "app",
      params: {
        id: this.getUIStep,
      },
    });
  },
};
</script>