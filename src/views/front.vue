<template>
  <div id="front" class="w-full">
    <svg v-for="id in nConnections" :key="id" :id="'svg' + id" class="absolute top-0 left-0 clickThrough" width="0" height="0">
      <path
        :id="'path' + id"
        d="M0 0"
        stroke-width="0.3em"
        style="stroke: #555; fill: none"
      />
    </svg>
    <varDraggableCanvas />
    <varList class="ml-80" />
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
  computed: {
    nConnections() {
      return store.state.connectedShapes.length;
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