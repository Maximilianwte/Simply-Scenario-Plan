<template>
  <div id="processView">
    <svg
      v-for="id in nConnectionsOutput"
      :key="'svg' + id"
      :id="'svg' + id"
      class="absolute clickThrough"
      width="0"
      height="0"
    >
      <path
        :id="'path' + id"
        d="M0 0"
        stroke-width="0.21rem"
        style="stroke: #cbd5e0; fill: none"
      />
    </svg>
    <div class="row inline-block flex text-dark" id="rowForHappiness">
      <div
        v-for="(list, list_index) in data"
        :key="'list ' + list_index"
        class="flex-col mr-16"
      >
        <div
          v-for="(item, index) in list"
          :key="index"
          :id="'outputVar_' + (list_index + 1) + '_' + index"
          class="scenarioVar px-4 py-6 w-40 text-center mt-2 text-xl rounded"
          :style="getColor(item.color)"
        >
          {{ item.title }}
          <p class="text-base text-alternative">
            Impact: {{ item.impact + item.unit }}
          </p>
          <p class="text-base text-alternative">
            Probability: {{ item.prob }}%
          </p>
        </div>
      </div>
      <div class="outputVarContainer flex-col">
        <div
          class="scenarioVar px-4 py-6 mt-2 text-xl rounded bg-alternative"
        >
          Happiness
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../store";
import svgDraw from "../data/svgDraw";
export default {
  props: ["data"],
  computed: {
    nConnectionsOutput() {
      return store.state.connectedShapesOutput.length;
    },
  },
  methods: {
    getColor(color) {
      return "backgroundColor: " + color + ";";
    },
    connectShapes() {
      var connectedShapesOutput = [];
      const connectedShapes = store.state.connectedShapes;
      for (var i = 0; i < connectedShapes.length; i++) {
        connectedShapesOutput.push([
          "outputVar_" +
            connectedShapes[i][0].substring(
              connectedShapes[i][0].indexOf("_") + 1,
              connectedShapes[i][0].indexOf("#")
            ) +
            "_" +
            connectedShapes[i][0].substring(
              connectedShapes[i][0].indexOf("#") + 1
            ),
          "outputVar_" +
            connectedShapes[i][1].substring(
              connectedShapes[i][1].indexOf("_") + 1,
              connectedShapes[i][1].indexOf("#")
            ) +
            "_" +
            connectedShapes[i][1].substring(
              connectedShapes[i][1].indexOf("#") + 1
            ),
        ]);
      }
      store.commit("addAllOutputConnections", connectedShapesOutput);
      svgDraw.connectAllInOutputProcess();
      console.log(connectedShapesOutput);
    },
  },
  mounted() {
    this.connectShapes();
  },
};
</script>