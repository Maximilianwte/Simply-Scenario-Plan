<template>
  <div id="front" class="w-full flex-col">
    <!-- <varList /> -->
    <varDraggableCanvas />
  </div>
</template>

<script>
import varList from "../components/varList";
import varDraggableCanvas from "../components/varDraggableCanvas";
export default {
  components: {varList, varDraggableCanvas},
  mounted() {
   /*  dragDIV1 = new PlainDraggable(document.getElementById("div1")) */
  }
};
</script>