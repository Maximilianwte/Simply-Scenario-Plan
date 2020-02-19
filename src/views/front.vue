<template>
  <div class="w-full flex-col justify-around mt-2">
    <div id="contact" class="w-full mt-8 flex-col">
      <div id="option" class="flex justify-between">
        <template v-if="input.active_reg == true">
          <div class="button bg-main_secondary hover:bg-main_primary text-bg_primary py-4 px-8 rounded mx-2 cursor-pointer" v-on:click="set_active('correlation')"><p>Korrelation</p></div>
          <div class="button bg-main_primary hover:bg-main_primary text-bg_primary py-4 px-8 rounded mx-2 cursor-pointer" v-on:click="set_active('regression')"><p>Prognose</p></div>
        </template>
        <template v-else>
          <div class="button bg-main_primary hover:bg-main_primary text-bg_primary py-4 px-8 rounded mx-2 cursor-pointer" v-on:click="set_active('correlation')"><p>Korrelation</p></div>
          <div class="button bg-main_secondary hover:bg-main_primary text-bg_primary py-4 px-8 rounded mx-2 cursor-pointer" v-on:click="set_active('regression')"><p>Prognose</p></div>
        </template>
      </div>
      <div id="variables" class="text-left w-1/2 px-24 mt-4">
        <p>Variablen zu Berechnen:</p>
        <div class="slider flex justify-between mt-4">
          <input id="range_variables" type="range" min="1" max="20" step="1" v-model="input.variables">
          <p class="label">{{input.variables}}</p>
          </div>
      </div>
      <div id="price">
        <p>{{get_price}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        input: {
          active_reg: true,
          variables: 1
        },
        price: {
          korrelation: 30,
          regression: 60
        },
        factor: 0.955
      }
    },
    computed: {
      get_price: {
        get() {
          //return product(input.variables, price.regression)
        }
      }
    },
    methods: {
      set_active: function(input) {
        if (input == "regression") {
          this.input.active_reg = true
        }
        else {
          this.input.active_reg = false
        }
      }
    }
  }
</script>