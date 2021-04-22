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
        <th style="backgroundColor: #FFE882;" class="text-left"><p v-for="item in getData('highLLowC')" :key="item.id">{{item.title}}</p></th>
        <th style="backgroundColor: #FF7373;" class="text-right"><p v-for="item in getData('highLMedC')" :key="item.id">{{item.title}}</p></th>
        <th style="backgroundColor: #FF5E5E" class="text-right"><p v-for="item in getData('highLHighC')" :key="item.id">{{item.title}}</p></th>
      </tr>
      <tr>
        <th class="text-left">Medium Likelihood</th>
        <th style="backgroundColor: #76E376" class="text-left"><p v-for="item in getData('medLLowC')" :key="item.id">{{item.title}}</p></th>
        <th style="backgroundColor: #FFE882;" class="text-right"><p v-for="item in getData('medLMedC')" :key="item.id">{{item.title}}</p></th>
        <th style="backgroundColor: #FF7373;" class="text-right"><p v-for="item in getData('medLHighC')" :key="item.id">{{item.title}}</p></th>
      </tr>
      <tr>
        <th class="text-left">Low Likelihood</th>
        <th style="backgroundColor: #76E376" class="text-left"><p v-for="item in getData('lowLLowC')" :key="item.id">{{item.title}}</p></th>
        <th style="backgroundColor: #76E376;" class="text-right"><p v-for="item in getData('lowLMedC')" :key="item.id">{{item.title}}</p></th>
        <th style="backgroundColor: #FFE882;" class="text-right"><p v-for="item in getData('lowLHighC')" :key="item.id">{{item.title}}</p></th>
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