<template>
  <div class="table">
    <h5 class="ml-2 w-full py-2 px-2 text-dark" :style="{ backgroundColor: getColorMode(color) }">{{ title }}</h5>
    <table :id="'tableEl_' + title" class="tableEl w-full">
      <tr>
        <th class="text-left">Layer</th>
        <th class="text-left">Scenario</th>
        <th class="text-right">Probability</th>
        <th class="text-right">Impact</th>
      </tr>
      <tr v-for="(scenario, index) in data" :key="index">
        <td class="text-left">{{scenario.list}}</td>
        <td class="text-left">{{scenario.title}}</td>
        <td class="text-right">{{scenario.pathProb}}%</td>
        <td class="text-right">{{scenario.impact + scenario.unit}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import store from "../store";
export default {
  props: ["title", "data", "color"],
  methods: {
    getColorMode(color) {
      return store.state.ui.colorful ? color : "#e2e8f0";
    },
  }
};
</script>