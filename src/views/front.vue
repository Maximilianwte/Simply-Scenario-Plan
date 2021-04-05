<template>
  <div id="front" class="w-full flex">
    <svg v-for="id in nConnections" :key="'svg' + id" :id="'svg' + id" class="absolute top-0 left-0 clickThrough" width="0" height="0">
      <path
        :id="'path' + id"
        d="M0 0"
        stroke-width="0.3em"
        style="stroke: #555; fill: none"
      />
    </svg>
    <declareOutcomeVariables v-if="getUIStep == 0"/>
    <declareScenarioVariables v-if="getUIStep == 1"/>
    <!-- <varDraggableCanvas id="outcomeVariables" /> -->
    <!-- <varList :id="'scenarioVariables_' + i" v-for="i in nVarLists" :key="i" /> -->
    <!-- <button
        id="button_addScenarioVariableList"
        @click="addList"
        class="absolute bottom-0 mb-8 px-6 py-3 rounded-full bg-main text-bg hover:bg-focus text-2xl"
      >+</button> -->
<!--       <button @click="goBackOneStep" :class="getIfBackButtonIsActive" class="absolute top-0 left-0 py-4 px-4 rounded-full" title="Undo last change"><svg class="w-8 svg-light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M142.716 293.147l-94-107.602 94-107.602c7.596-8.705 6.71-21.924-1.995-29.527-8.705-7.596-21.917-6.703-29.527 1.995L5.169 171.782c-6.892 7.882-6.892 19.65 0 27.532l106.026 121.372a20.913 20.913 0 0015.771 7.157 20.84 20.84 0 0013.755-5.169c8.706-7.603 9.598-20.822 1.995-29.527z"/><path d="M359.93 164.619H20.926C9.368 164.619 0 173.986 0 185.545c0 11.558 9.368 20.926 20.926 20.926H359.93c60.776 0 110.218 49.441 110.218 110.211S420.706 426.893 359.93 426.893H48.828c-11.558 0-20.926 9.368-20.926 20.926 0 11.558 9.368 20.926 20.926 20.926H359.93c83.844 0 152.07-68.219 152.07-152.063s-68.219-152.063-152.07-152.063z"/></svg></button>
 -->  </div>
</template>

<script>
import varList from "../components/varList";
import varDraggableCanvas from "../components/varDraggableCanvas";
import declareOutcomeVariables from "../components/declareOutcomeVariables";
import declareScenarioVariables from "../components/declareScenarioVariables";
import store from "../store";
import svgDraw from "../data/svgDraw";
import $ from "jquery";
export default {
  components: { varList, varDraggableCanvas, declareOutcomeVariables, declareScenarioVariables },
  data() {
    return {
      nVarLists : 1,
    }
  },
  computed: {
    nConnections() {
      return store.state.connectedShapes.length;
    },
    getUIStep() {
      return store.state.uiStep;
    },
    nStepsToGoBack() {
      return (store.state.returnCache.values.length - store.state.returnCache.returnIndex)
    },
    getIfBackButtonIsActive() {
      return this.nStepsToGoBack > 0 ? "bg-main" : "bg-gray-200";
    }
  },
  methods: {
    addList() {
      this.nVarLists++;
    },
    goBackOneStep() {
      this.nStepsToGoBack > 0 ? store.commit("goStepBack") : null;
    }
  },
  mounted() {
    
  }
};

// these functions run the svg drawings on domReady and resize
// there are also update functions in addConnection and onDrag
$(document).ready(function() {
  svgDraw.updateAndConnectAll();
});

$(window).resize(function() {
  svgDraw.updateAndConnectAll();
});

</script>