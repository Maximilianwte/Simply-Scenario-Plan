<template>
  <div id="declareScenarioVariables" class="flex text-3xl">
    <svg v-for="id in nConnections" :key="'svg' + id" :id="'svg' + id" class="absolute top-0 left-0 clickThrough" width="0" height="0">
      <path
        :id="'path' + id"
        d="M0 0"
        stroke-width="0.21rem"
        style="stroke: #cbd5e0; fill: none"
      />
    </svg>
    <div id="header" class="top-0 left-0 mt-24 ml-12 w-80">
      <h2 tooltip-content="Scenarios can be all possible events that could occure. You can add & edit the scenarios and change the probability of occuring." tooltip-position="down">
        What scenarios could happen to your business?
      </h2>
    </div>
    <!-- Var List Component -->

    <varList
      :id="'scenarioVariables_' + i"
      :idList="i - 1"
      v-for="i in getNVarLists"
      :key="'scenarioVariables_' + i"
      class="ml-12"
    />
    <div class="buttonContainer ml-8 flex-col justify-around">
      <button
        id="button_addScenarioVariableList"
        @click="addList"
        tooltip-content="Add another scenario layer to chain events later in time."
        tooltip-position="down"
        class="px-6 py-3 rounded-full bg-main text-bg hover:bg-focus text-2xl"
      >
        +
      </button>
    </div>
    <!-- UI Handling Buttons -->

    <button
      id="backUIStep"
      class="absolute left-0 mt-64 px-3 py-3 rounded-full text-2xl"
      style="transform: rotateY(180deg)"
      tooltip-content="Go back to editing outcome variables."
      tooltip-position="left-abs"
      @click="moveUI('dec')"
    >
      <svg
        class="w-10"
        viewBox="-74 0 362 362.667"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M213.668 181.332c0 4.27-1.281 8.535-3.629 11.734l-106.664 160c-3.84 5.762-10.242 9.602-17.707 9.602h-64c-11.734 0-21.336-9.602-21.336-21.336 0-4.266 1.281-8.531 3.629-11.73l98.773-148.27L3.961 33.066C1.613 29.867.332 25.602.332 21.332.332 9.602 9.934 0 21.668 0h64c7.465 0 13.867 3.84 17.707 9.602l106.664 160c2.348 3.199 3.629 7.464 3.629 11.73zm0 0"
        />
      </svg>
    </button>
    <button
      id="nextUIStep"
      class="absolute right-0 mt-64 px-3 py-3 rounded-full text-2xl"
      tooltip-content="Finished adding scenarios? Look at your scenario dashboard."
      tooltip-position="left-fxd"
      @click="moveUI('inc')"
    >
      <svg
        class="w-10"
        viewBox="-74 0 362 362.667"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M213.668 181.332c0 4.27-1.281 8.535-3.629 11.734l-106.664 160c-3.84 5.762-10.242 9.602-17.707 9.602h-64c-11.734 0-21.336-9.602-21.336-21.336 0-4.266 1.281-8.531 3.629-11.73l98.773-148.27L3.961 33.066C1.613 29.867.332 25.602.332 21.332.332 9.602 9.934 0 21.668 0h64c7.465 0 13.867 3.84 17.707 9.602l106.664 160c2.348 3.199 3.629 7.464 3.629 11.73zm0 0"
        />
      </svg>
    </button>
  </div>
</template>
<script>
import store from "../store";
import varList from "../components/varList2";
import $ from "jquery";
import svgDraw from "../data/svgDraw";
export default {
  components: { varList },
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
    moveUI(val) {
      store.commit("moveUI", val);
    },
  },
   mounted() {
    svgDraw.updateAndConnectAll();
  }
};
$(window).resize(function() {
  svgDraw.updateAndConnectAll();
});
</script>

