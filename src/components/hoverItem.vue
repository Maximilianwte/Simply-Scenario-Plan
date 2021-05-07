<template>
  <div class="bg-bg px-2 py-2 w-40 text-left rounded absolute floatingTop" :style="'backgroundColor:' + color ">
    <ul>
        <li class="mb-2">{{item.title}}</li>
        <li>Impact: {{ item.impact }}{{item.unit}}</li>
        <li>Probability: {{ item.pathProb }}%</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["item", "color"],
};
</script>