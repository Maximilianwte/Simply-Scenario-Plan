<template>
  <div id="home" class="flex pt-24 px-12">
    <div class="left w-1/2">
      <h2 class="text-5xl font-extrabold">Bad things happen</h2>
      <!-- Alternative find digital art.. two people shaking hands.. but where to find? -->
      <carousel class="mt-12" />
    </div>
    <div class="right w-1/2"></div>
  </div>
</template>
<script>
import carousel from "../components/carousel"
export default {
    components: {carousel}
};
</script>