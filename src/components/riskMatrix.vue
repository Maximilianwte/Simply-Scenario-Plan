<template>
  <div class="riskMatrix">
    <h5 class="ml-2 w-full py-2 px-2" :style="{ backgroundColor: getColorMode(color) }">{{ title }}</h5>
    <table :id="'tableEl_' + title" class="w-full">
      <tr>
        <th class="text-left topLeft"></th>
        <th class="text-left">Low Consequence</th>
        <th class="text-right">Medium Consequence</th>
        <th class="text-right">High Consequence</th>
      </tr>
      <tr>
        <th class="text-left">High Likelihood</th>
        <th style="backgroundColor: #FFE882;" class="text-left"><p v-for="item in data.highLLowC" :key="item.id">{{item.title}}</p></th>
        <th style="backgroundColor: #FF7373;" class="text-right"><p v-for="item in data.highLMedC" :key="item.id">{{item.title}}</p></th>
        <th style="backgroundColor: #FF5E5E" class="text-right"><p v-for="item in data.highLHighC" :key="item.id">{{item.title}}</p></th>
      </tr>
      <tr>
        <th class="text-left">Medium Likelihood</th>
        <th style="backgroundColor: #76E376" class="text-left"><p v-for="item in data.mediumLLowC" :key="item.id">{{item.title}}</p></th>
        <th style="backgroundColor: #FFE882;" class="text-right"><p v-for="item in data.mediumLMedC" :key="item.id">{{item.title}}</p></th>
        <th style="backgroundColor: #FF7373;" class="text-right"><p v-for="item in data.mediumLHighC" :key="item.id">{{item.title}}</p></th>
      </tr>
      <tr>
        <th class="text-left">Low Likelihood</th>
        <th style="backgroundColor: #76E376" class="text-left"><p v-for="item in data.lowLLowC" :key="item.id">{{item.title}}</p></th>
        <th style="backgroundColor: #76E376;" class="text-right"><p v-for="item in data.lowLMedC" :key="item.id">{{item.title}}</p></th>
        <th style="backgroundColor: #FFE882;" class="text-right"><p v-for="item in data.lowLHighC" :key="item.id">{{item.title}}</p></th>
      </tr>
    </table>
  </div>
</template>
<script>
import store from "../store";
export default {
  props: ["title", "data"],
  methods: {
    getColorMode(color) {
      return store.state.ui.colorful ? color : "#e2e8f0";
    },
  }
};
</script>