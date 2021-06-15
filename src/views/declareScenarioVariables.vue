<template>
  <div id="declareScenarioVariables" class="flex relative text-3xl">
    <svg v-for="id in nConnections" :key="'svg' + id" :id="'svg' + id" class="absolute top-0 left-0 clickThrough"
      width="0" height="0">
      <path :id="'path' + id" d="M0 0" stroke-width="0.21rem" style="stroke: #cbd5e0; fill: none" />
    </svg>
    <div id="header" class="top-0 left-0 mt-24 ml-4 mb-32 md:ml-12 sm:w-screen md:w-80">
      <h2
        tooltip-content="Scenarios can be all possible events that could occure. You can add & edit the scenarios and change the probability of occuring."
        tooltip-position="down">
        What scenarios could happen to your business?
      </h2>
      <toolOpen class="mt-16 md:ml-10"
        :data="['1. Here you can edit all scenarios that could affect your business or project.', '2. The scenario layers that span from left to right represent the time axis.', '3. So if you want to chain the likelihood of an event to another one happening before it in time, you can add another scenario layer.', '4. To connect two scenarios or delete the connection you can use drag & drop on desktop. On mobile devices with touch input, you can add and delete by clicking the + button, when the scenario is opened (long tap).']" />
    </div>
        <!-- UI Handling Buttons -->

    <button id="backUIStep" class="absolute hidden md:block centerY mt-16 md:mt-0 left-0 px-3 py-3 rounded-full text-2xl"
      style="transform: rotateY(180deg)" >
      <svg @click="moveUI('dec')" class="w-10" viewBox="-74 0 362 362.667" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M213.668 181.332c0 4.27-1.281 8.535-3.629 11.734l-106.664 160c-3.84 5.762-10.242 9.602-17.707 9.602h-64c-11.734 0-21.336-9.602-21.336-21.336 0-4.266 1.281-8.531 3.629-11.73l98.773-148.27L3.961 33.066C1.613 29.867.332 25.602.332 21.332.332 9.602 9.934 0 21.668 0h64c7.465 0 13.867 3.84 17.707 9.602l106.664 160c2.348 3.199 3.629 7.464 3.629 11.73zm0 0" />
      </svg>
    </button>
    <div class="fixed md:block h-full top-0 right-0">
    <button id="nextUIStep" class="px-3 centerY z-10 py-3 rounded-full text-2xl"
      tooltip-content="Finished adding scenarios? Go to ouput." tooltip-position="left">
      <svg @click="moveUI('inc')" class="w-10 z-10" viewBox="-74 0 362 362.667" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M213.668 181.332c0 4.27-1.281 8.535-3.629 11.734l-106.664 160c-3.84 5.762-10.242 9.602-17.707 9.602h-64c-11.734 0-21.336-9.602-21.336-21.336 0-4.266 1.281-8.531 3.629-11.73l98.773-148.27L3.961 33.066C1.613 29.867.332 25.602.332 21.332.332 9.602 9.934 0 21.668 0h64c7.465 0 13.867 3.84 17.707 9.602l106.664 160c2.348 3.199 3.629 7.464 3.629 11.73zm0 0" />
      </svg>
    </button>
    </div>

    <button id="nextUIStep2" class="absolute md:hidden text-xl bg-main hover:bg-focus text-white bottom-0 left-0 mb-6 ml-6 rounded px-4 py-2" @click="moveUI('dec')">
      Back
    </button>
    <button id="nextUIStep2" class="absolute md:hidden text-xl bg-main hover:bg-focus text-white bottom-0 right-0 mb-6 mr-6 rounded px-4 py-2" @click="moveUI('inc')">
      Next
    </button>
    <!-- Var List Component -->

    <varList :id="'scenarioVariables_' + i" :idList="i - 1" v-for="i in getNVarLists" :key="'scenarioVariables_' + i"
      class="ml-12" @addConnectionStart="setAddConnectionStart($event)" :addConnectionStart="addConnectionStart" />
    <div class="buttonContainer z-0 ml-8 flex-col justify-around">
      <button id="button_addScenarioVariableList" @click="addList"
        tooltip-content="Add another scenario layer to chain events later in time." tooltip-position="down"
        class="w-16 h-16 behind rounded-full bg-main text-bg hover:bg-focus text-2xl">
        +
      </button>
    </div>
  </div>
</template>
<script>
  import store from "../store";
  import varList from "../components/varList2";
  import toolOpen from "../components/toolOpen";
  import svgDraw from "../data/svgDraw";
  export default {
    components: {
      varList,
      toolOpen
    },
    data() {
      return {
        addConnectionStart: null,
      }
    },
    computed: {
      nConnections() {
        return store.state.connectedShapes.length;
      },
      getNVarLists() {
        return store.state.scenarioVariables.length;
      },
    },
    methods: {
      addList() {
        store.commit("addScenarioList");
      },
      setAddConnectionStart(item) {
        this.addConnectionStart = item;
      },
      moveUI(val) {
        store.commit("moveUI", val);
        if (val == "inc") {
          this.$router.push({
            name: "app",
            params: {
              id: 2,
            },
          });
        } else {
          this.$router.push({
            name: "app",
            params: {
              id: 0,
            },
          });
        }
      },
    },
    mounted() {
      svgDraw.updateAndConnectAll();
    },
  };
  /* $(window).resize(function() {
    svgDraw.updateAndConnectAll();
  }); */
</script>