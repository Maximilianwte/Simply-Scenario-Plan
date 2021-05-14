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

    <!-- ---- Overlay for Not built for mobile ---- -->

    <div
      id="notBuildForMobile"
      v-if="getIfMobile"
      class="fixed light w-2/3 z-20 flex mt-4 ml-4 py-4 shadow text-xl bg-bg rounded border-focus border-4"
    >
      <svg
        class="w-20 mx-6"
        style="stroke-width: 0.8rem"
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          d="M108.5.7C78.9 4.9 54 25.7 43.6 54.8l-3.1 8.7-.3 189.3c-.2 187.8-.2 189.5 1.8 198 5.4 22.8 21.3 42.5 42.5 52.7 17.3 8.3 13.8 8 93.5 8 68.7 0 70.6-.1 73.9-2 5.6-3.3 9.3-8.7 9.9-14.4.7-7.2-.5-11.7-4.1-15.8-6.7-7.6-3.3-7.3-76.7-7.3-72.1 0-72.7 0-82.2-6.1-6.4-4.2-12.5-11-15.6-17.7l-2.7-5.7v-373l3.3-6.7c4.1-8.4 12.8-16.7 20.9-20l5.8-2.3 104-.3C316.6 40 318.6 40 325.2 42c10.8 3.3 18.9 10.3 24.1 21l3.2 6.5.5 118c.5 127.1.3 120.9 5.8 126.9 8.6 9.2 22.6 8.4 30.6-1.7l3.1-3.9V63.5l-3.1-8.7c-9.2-25.7-28.4-43.9-54.6-52L327.5.5l-108-.1c-59.4-.1-109.3.1-111 .3z"
        />
        <path
          d="M189.6 72.4c-7.8 2.9-12.6 9.9-12.6 18.4 0 8.8 3.7 14.7 11.5 18.3 3.5 1.6 6.7 1.9 28 1.9 27 0 29.2-.5 35.2-7.3 5.6-6.4 5.9-17.9.6-24.5-6.1-7.5-6.8-7.7-34.3-7.9-19.1-.2-25.4 0-28.4 1.1zM314.5 343.9c-4.7 2.2-8.9 6.4-10.4 10.4-1.4 3.6-1.4 11.7-.1 15.4.6 1.5 13.3 15.1 28.3 30l27.2 27.3-27.2 27.2c-15 15-27.7 28.6-28.3 30.1-1.3 3.7-1.3 11.8.1 15.4 2.5 6.6 11 12.3 18.4 12.3 7.5 0 11-2.8 38-29.9 14.3-14.4 26.4-26.1 27-26.1.6 0 12.7 11.7 27 26.1 16.6 16.7 27.4 26.8 30 28 11.5 5.4 26.1-2.6 27.3-15 1-10.8 1.6-10-28.6-40.4L415.6 427l27.6-27.8c30.2-30.3 29.6-29.5 28.6-40.3-1.2-12.4-15.8-20.4-27.3-15-2.6 1.2-13.4 11.3-30 28-14.3 14.4-26.4 26.1-27 26.1-.6 0-12.7-11.7-27-26.1-16.6-16.7-27.4-26.8-30-28-5.1-2.4-10.9-2.4-16 0zM209.5 403.2c-8 2.8-12.5 9.1-12.5 17.6 0 8.8 3.7 14.7 11.5 18.3 9.8 4.5 22.7-.6 26.4-10.4 1.7-4.5 1.3-12.4-.9-16.7-4.1-8.1-15.2-12.1-24.5-8.8z"
        />
      </svg>
      <h6 class="w-full">
        Note: The app is not built for mobile devices right now
      </h6>
    </div>

    <!-- ---- Overlay for report bug & give feedback ---- -->

    <div
      id="giveFeedbackOverlay"
      v-if="askGiveFeedback"
      class="fixed z-20 centered flex-col w-80 py-4 shadow text-xl bg-bg rounded border-4"
    >
      <h6 class="w-full px-4">
        What feature would you enjoy having or what should be changed?
      </h6>
      <form class="w-full mt-4 mb-4 px-4">
        <textarea
          type="text"
          v-model="feedback"
          class="rounded border-2 w-full"
          rows="7"
        />
      </form>
      <h6 class="text-focus">{{ warnText }}</h6>
      <div class="rowButtons mt-4">
        <button
          @click="handleGiveFeedback"
          class="px-6 py-2 bg-focus text-white mx-2 rounded cursor-pointer hover:bg-main"
        >
          Send Feedback
        </button>
        <button
          @click="askGiveFeedback = false"
          class="px-6 py-2 bg-focus mx-2 text-white rounded cursor-pointer hover:bg-main"
        >
          Don't send
        </button>
      </div>
    </div>

    <!-- ---- Menu button & overlay Dropdown Menu ---- -->

    <div class="fixed right-0 mt-4 mr-4" id="menu">
      <button id="openMenu" class="dots" @click="menuActive = !menuActive">
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
          <li class="flex items-center justify-between mt-2 px-4">
            <button
              id="giveFeedback"
              title="Give feedback"
              alt="Give feedback"
              class="mx-4"
              @click="askGiveFeedback = true"
            >
              <svg
                class="h-8"
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M196.5 1.1c-8.9 1.8-20.5 8.2-27.6 15.2-11.3 11.2-16.4 23.5-16.4 39.7 0 11.3 2 19 7 27.7l2.4 4.3h-60.6c-51.9 0-61.4.2-66.7 1.6C18.4 93.8 5.3 107 1.5 123.1c-2.1 9.2-2.1 50.1 0 58.4 3.2 12.2 13.2 24.3 24.8 29.9l5.7 2.8v128.2c0 140.5-.2 135.3 6 146 3.5 6.1 11.8 14.4 18 17.9 10.3 5.9.8 5.7 199.6 5.7 118.2 0 184-.4 187.4-1 12.1-2.3 24.7-11.4 31-22.5 6.2-10.8 6-5.5 6-146.1V214.2l5.8-2.8c11.7-5.7 22.2-18.8 25.1-31.4 1.7-7.3 1.4-49.3-.4-56.9-3.8-16.1-16.9-29.4-33-33.6-5-1.3-15.3-1.5-66.5-1.5h-60.7l3.3-6.5c11.2-22.1 6.9-48.1-10.6-65.4C326.5-.2 301.6-4.4 280.5 5.4c-8.6 4-17 10.9-20.9 17-1.6 2.5-3.2 4.6-3.6 4.6-.4 0-2.1-2.2-3.9-4.9-5.2-8.2-16.6-16.2-28-19.7-5.9-1.9-21.2-2.6-27.6-1.3zm18.6 32c4.2 1.4 9.4 5.3 11.5 8.4 3.4 5.2 7.6 21 10.9 40.8l.6 3.8-3.8-.6c-10.7-1.7-24.7-4.9-31.8-7.2-6.3-2-8.9-3.5-12-6.7-9.1-9.4-8.7-22.5 1-32.1 6.9-7 15.2-9.2 23.6-6.4zm96.3.1C320 35.8 328 46.8 328 56c0 10.7-6.4 18.4-18.5 22.3-7.5 2.5-21.3 5.6-31.3 7.1l-4.3.6.6-3.7c3.3-19.7 7.5-35.6 10.9-40.8 5.1-7.7 16-11.2 26-8.3zM208 152v32h-82.2c-91.8 0-86.7.4-91.5-6.9-2.2-3.3-2.3-4.2-2.3-25 0-24.1.5-26 7.2-30.1 3.2-1.9 5.2-2 86.1-2H208v32zm64 0v32h-32v-64h32v32zm200.8-30c1.8 1.1 4.1 3.4 5.2 5.2 1.9 3.1 2 4.7 1.8 25.5-.3 20.6-.4 22.4-2.4 25-1.1 1.5-3.6 3.6-5.5 4.5-3.2 1.7-9.3 1.8-85.6 1.8H304v-64h82.8c80.8 0 82.8.1 86 2zM208 348v132h-66.2c-73.9 0-70.7.3-75.5-6.9l-2.3-3.4V216h144v132zm64 0v132h-32V216h32v132zm176-5.8c0 118.3-.1 126.5-1.8 129.7-.9 1.9-3 4.4-4.5 5.5-2.8 2.1-3.9 2.1-70.3 2.4l-67.4.2V216h144v126.2z"
                />
              </svg>
            </button>
            <button
              id="reportBug"
              title="Report bug"
              alt="Report bug"
              class="mx-4"
              @click="askGiveFeedback = true"
            >
              <svg
                class="h-8"
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M189.9 2c-3.9 2.1-7.9 8.7-7.9 13.1 0 1.3 2.7 8.5 6 15.9s6 13.7 6 14.1c0 .3-2.1 1.2-4.7 1.9-17.1 4.6-31.9 17.2-39.7 33.5-6.1 12.6-6.6 16.7-6.6 50.7v30.5l-10.6.6c-12.1.7-17.4 2.7-22.5 8.4-4.6 5.3-6 9.5-6.6 19.8l-.6 9.2-4.2-1.2c-19.2-5.8-36.8-24.4-42-44.5-1.2-4.2-2-12.6-2.4-24-.5-15.3-.8-17.8-2.6-20.2-6.3-8.3-19.3-8.1-24.5.5-1.8 2.8-2 5.1-2 20.4 0 18.8 1.2 27.2 5.5 39.3 5.8 16.1 19.1 33.6 33.1 43.6 8.2 5.8 23.1 12.8 32.2 14.9l7.2 1.8V261H57.5c-50 0-50.2 0-54.5 6-4.8 6.8-3.1 16.1 3.9 20.7l3.4 2.3h92.8l-.3 15.6-.3 15.6-7.2 1.9C68.1 330 45.2 349 33.4 374.4c-6.6 14.3-7.6 20-8.1 42.6-.5 20.2-.4 20.5 1.9 24 6.4 9.5 19.9 8.9 25-1.1 1.4-2.7 1.8-6 1.8-15.4.1-28 4.7-41.2 19.6-56.1 5.4-5.4 9.2-8.2 15.5-11.3 4.6-2.2 9.6-4.3 11.2-4.7 2.5-.6 2.7-.4 2.7 2.2.1 7.8 2.1 28 3.5 35 11.6 57 55.7 103.2 112.2 117.5 24.2 6.1 50.4 6.1 74.6 0 56.5-14.3 100.6-60.5 112.2-117.5 1.4-7 3.4-27.2 3.5-35 0-2.6.2-2.8 2.8-2.2 1.5.4 6.5 2.5 11.1 4.7 6.3 3.1 10.1 5.9 15.5 11.3 14.9 14.9 19.5 28.1 19.6 56.1 0 9.4.4 12.7 1.8 15.4 5.1 10 18.6 10.6 25 1.1 2.3-3.5 2.4-3.8 1.9-24-.3-17.3-.8-21.6-2.6-27.9-9.8-33.2-34.9-57.8-67.4-66l-7.2-1.9-.3-15.6-.3-15.6h92.8l3.4-2.3c7-4.6 8.7-13.9 3.9-20.7-4.3-6-4.5-6-54.5-6H409V230.3l7.3-1.8c9-2.1 23.9-9.1 32.1-14.9 14-10 27.3-27.5 33.1-43.6 4.3-12.1 5.5-20.5 5.5-39.3 0-15.3-.2-17.6-2-20.4-5.2-8.6-18.2-8.8-24.5-.5-1.8 2.4-2.1 4.9-2.6 20.2-1 27.5-4.9 38-19.4 52.7-6.7 6.7-9.7 9-16.6 12.2-13.5 6.4-12.5 6.7-13.2-4.2-.6-10.5-2-14.7-6.6-20-5.1-5.7-10.4-7.7-22.5-8.4l-10.6-.6v-30.5c0-34-.5-38.1-6.6-50.7-7.8-16.3-22.6-28.9-39.6-33.5-2.7-.7-4.8-1.6-4.8-1.9 0-.4 2.7-6.7 6-14.1 3.3-7.4 6-14.6 6-15.9 0-4.6-4-11-8.1-13.1-4.5-2.3-7.8-2.5-12.2-.6-5.2 2.2-7.2 5.2-15.6 24.1l-8 18h-60.2l-8-18c-4.4-9.9-9-19.1-10.2-20.4C203 0 196-1.2 189.9 2zm130.3 75.8c8 3.9 13.8 10.1 17 18.1 2.1 5.3 2.2 7.3 2.6 35.8l.4 30.3H171.8l.4-30.3c.3-28.1.5-30.6 2.5-35.5 4-9.8 9.8-15.6 20-19.8l5.8-2.4 56.5.3 56.5.2 6.7 3.3zm-79 188c.3 69.2.4 74 2.1 76.5 5.8 8.9 19.6 8.9 25.4 0 1.7-2.5 1.8-7.3 2.1-76.5l.2-73.8h108.1l-.4 92.2c-.3 101.1-.1 96.2-6.4 114.8-12.9 37.9-44.4 67.8-82.8 78.7-20.6 5.8-46.4 5.8-67 0-38.4-10.9-69.9-40.8-82.8-78.7-6.3-18.6-6.1-13.7-6.4-114.8l-.4-92.2H241l.2 73.8z"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import declareOutcomeVariables from "./declareOutcomeVariables";
import declareScenarioVariables from "./declareScenarioVariables";
import data_functions from "../data/data_functions";
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
      askGiveFeedback: false,
      loadFile: null,
      fileName: this.getFileName,
      warnText: null,
      feedback: null,
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
    getIfMobile() {
      return navigator.userAgent.toLowerCase().match(/mobile/i);
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
        data_functions.saveOrUpdateState({title: this.fileName, state: store.state}).then(res => {
          if (res.status == 200) {
            this.askSaveFile = false;
            // set last update time
            store.commit("");
          }
          else {
            console.log(res.data);
          }
        })
      }
    },
    handleGiveFeedback() {
      if (this.feedback.length > 3) {
        store.commit("");
        console.log(this.feedback);
        this.feedback = null;
        this.askGiveFeedback = false;
      }
    },
  },
  mounted() {
    if (store.state.user.login == false) {
      this.$router.push({
        name: "home",
      });
    } else {
      this.$router.push({
        name: "app",
        params: {
          id: this.getUIStep,
        },
      });
    }
  },
};
</script>