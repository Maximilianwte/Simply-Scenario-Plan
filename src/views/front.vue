<template>
  <div id="front" class="w-full flex justify-around">
    <svg v-for="id in nConnections" :key="id" :id="'svg' + id" class="absolute top-0 left-0 clickThrough" width="0" height="0">
      <path
        :id="'path' + id"
        d="M0 0"
        stroke-width="0.3em"
        style="stroke: #555; fill: none"
      />
    </svg>
    <varDraggableCanvas />
    <varList v-for="i in nVarLists" :key="i" />
    <button
        @click="addList"
        class="absolute bottom-0 mb-8 px-6 py-3 rounded-full bg-main text-bg hover:bg-focus text-2xl"
      >+</button>
  </div>
</template>

<script>
import varList from "../components/varList";
import varDraggableCanvas from "../components/varDraggableCanvas";
import store from "../store";
import svgDraw from "../data/svgDraw";
import $ from "jquery";
export default {
  components: { varList, varDraggableCanvas },
  data() {
    return {
      nVarLists : 1
    }
  },
  computed: {
    nConnections() {
      return store.state.connectedShapes.length;
    }
  },
  methods: {
    addList() {
      this.nVarLists++;
    }
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