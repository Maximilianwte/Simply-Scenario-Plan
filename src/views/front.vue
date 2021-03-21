<template>
  <div id="front" class="w-full">
    <!-- <varList /> -->
    <varDraggableCanvas />
  </div>
</template>

<script>
import varList from "../components/varList";
import varDraggableCanvas from "../components/varDraggableCanvas";
export default {
  components: {varList, varDraggableCanvas},
};
</script>