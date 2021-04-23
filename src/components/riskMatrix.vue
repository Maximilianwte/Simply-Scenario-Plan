<template>
  <div class="riskMatrix">
    <h5 class="ml-2 py-2 px-2">{{ title }}</h5>
    <table :id="'tableEl_' + title" class="">
      <tr>
        <th class="text-left topLeft"></th>
        <th class="text-left">Low Consequence</th>
        <th class="text-right">Medium Consequence</th>
        <th class="text-right">High Consequence</th>
      </tr>
      <tr>
        <th class="text-left">High Likelihood</th>
        <th style="backgroundColor: #FFE882;" class="text-left"><p v-for="(item, index) in getData('highLLowC')" :key="index">{{item.title}}</p></th>
        <th style="backgroundColor: #FF7373;" class="text-right"><p v-for="(item, index) in getData('highLMedC')" :key="index">{{item.title}}</p></th>
        <th style="backgroundColor: #FF5E5E" class="text-right"><p v-for="(item, index) in getData('highLHighC')" :key="index">{{item.title}}</p></th>
      </tr>
      <tr>
        <th class="text-left">Medium Likelihood</th>
        <th style="backgroundColor: #76E376" class="text-left"><p v-for="(item, index) in getData('medLLowC')" :key="index">{{item.title}}</p></th>
        <th style="backgroundColor: #FFE882;" class="text-right"><p v-for="(item, index) in getData('medLMedC')" :key="index">{{item.title}}</p></th>
        <th style="backgroundColor: #FF7373;" class="text-right"><p v-for="(item, index) in getData('medLHighC')" :key="index">{{item.title}}</p></th>
      </tr>
      <tr>
        <th class="text-left">Low Likelihood</th>
        <th style="backgroundColor: #76E376" class="text-left"><p v-for="(item, index) in getData('lowLLowC')" :key="index">{{item.title}}</p></th>
        <th style="backgroundColor: #76E376;" class="text-right"><p v-for="(item, index) in getData('lowLMedC')" :key="index">{{item.title}}</p></th>
        <th style="backgroundColor: #FFE882;" class="text-right"><p v-for="(item, index) in getData('lowLHighC')" :key="index">{{item.title}}</p></th>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: ["title", "data"],
  methods: {
    getData(id) {
      return id in this.data ? this.data[id] : [];
    }
  }
};
</script>