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
        <td style="backgroundColor: #FFE882;" class="text-left text-dark"><div class="relative item" v-for="(item, index) in getData('highLLowC')" :key="index"><p>{{item.title}}</p><hoverItem :item="item" color="#FFE882" /></div></td>
        <td style="backgroundColor: #FF7373;" class="text-right text-dark"><div class="relative item" v-for="(item, index) in getData('highLMedC')" :key="index"><p>{{item.title}}</p><hoverItem :item="item" color="#FF7373" /></div></td>
        <td style="backgroundColor: #FF5E5E" class="text-right text-dark"><div class="relative item" v-for="(item, index) in getData('highLHighC')" :key="index"><p>{{item.title}}</p><hoverItem :item="item" color="#FF5E5E" /></div></td>
      </tr>
      <tr>
        <th class="text-left">Medium Likelihood</th>
        <td style="backgroundColor: #76E376" class="text-left text-dark"><div class="relative item" v-for="(item, index) in getData('medLLowC')" :key="index"><p>{{item.title}}</p><hoverItem :item="item" color="#76E376" /></div></td>
        <td style="backgroundColor: #FFE882;" class="text-right text-dark"><div class="relative item" v-for="(item, index) in getData('medLMedC')" :key="index"><p>{{item.title}}</p><hoverItem :item="item" color="#FFE882" /></div></td>
        <td style="backgroundColor: #FF7373;" class="text-right text-dark"><div class="relative item" v-for="(item, index) in getData('medLHighC')" :key="index"><p>{{item.title}}</p><hoverItem :item="item" color="#FF7373" /></div></td>
      </tr>
      <tr>
        <th class="text-left">Low Likelihood</th>
        <td style="backgroundColor: #76E376" class="text-left text-dark"><div class="relative item" v-for="(item, index) in getData('lowLLowC')" :key="index"><p>{{item.title}}</p><hoverItem :item="item" color="#76E376" /></div></td>
        <td style="backgroundColor: #76E376;" class="text-right text-dark"><div class="relative item" v-for="(item, index) in getData('lowLMedC')" :key="index"><p>{{item.title}}</p><hoverItem :item="item" color="#76E376" /></div></td>
        <td style="backgroundColor: #FFE882;" class="text-right text-dark"><div class="relative item" v-for="(item, index) in getData('lowLHighC')" :key="index"><p>{{item.title}}</p><hoverItem :item="item" color="#FFE882" /></div></td>
      </tr>
    </table>
  </div>
</template>
<script>
import hoverItem from "./hoverItem";
export default {
  props: ["title", "data"],
  components: {hoverItem},
  methods: {
    getData(id) {
      return id in this.data ? this.data[id] : [];
    }
  }
};
</script>