<template>
  <div class="w-full flex-col justify-around">
    <div id="head" class="mb-8">
      <img class="w-full " src="../assets/repair.jpg" alt="">
    </div>
    <div id="contact" class="w-full mt-8 flex-col">
      <div id="option" class="flex justify-between">
        <template v-if="input.active_reg == true">
          <div
            class="button bg-main_secondary hover:bg-main_primary text-bg_primary py-4 px-8 lg:px-16 rounded mx-2 cursor-pointer"
            v-on:click="set_active('correlation')">
            <p>Korrelation</p>
          </div>
          <div
            class="button bg-main_primary hover:bg-main_primary text-bg_primary py-4 px-8 lg:px-16 rounded mx-2 cursor-pointer"
            v-on:click="set_active('regression')">
            <p>Prognose</p>
          </div>
        </template>
        <template v-else>
          <div
            class="button bg-main_primary hover:bg-main_primary text-bg_primary py-4 px-8 lg:px-16 rounded mx-2 cursor-pointer"
            v-on:click="set_active('correlation')">
            <p>Korrelation</p>
          </div>
          <div
            class="button bg-main_secondary hover:bg-main_primary text-bg_primary py-4 px-8 lg:px-16 rounded mx-2 cursor-pointer"
            v-on:click="set_active('regression')">
            <p>Prognose</p>
          </div>
        </template>
      </div>
      <div id="variables" class="text-left w-64 lg:w-96 mt-4">
        <p>Variablen zu Berechnen:</p>
        <div class="slider flex justify-between mt-4">
          <input id="range_variables" type="range" min="1" max="20" step="1" v-model="input.variables">
          <p class="label">{{input.variables}}</p>
        </div>
      </div>
      <div id="price" class="text-lg text-center mt-6 w-96 lg:w-128">
        <p>{{get_price_text}}</p>
      </div>
      <div id="send" class="mt-12 text-lg">
        <div
            class="button bg-main_focus hover:bg-main_focus_active text-bg_primary py-4 px-12 lg:px-24 rounded mx-2 cursor-pointer">
            <p>Anfrage senden</p>
          </div>
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
        factor: 0.195,
      }
    },
    computed: {
      get_price_text: {
        get() {
          if (this.input.active_reg == true) {
            return "Unser Preis für eine Regressionsanalyse mit " + this.get_variable_text +
              " sind " + this.get_price + "€. "
          } else {
            return "Unser Preis für eine Korrelationsanalyse mit " + this.get_variable_text +
              " sind " + this.get_price + "€. "
          }
        }
      },
      get_price: {
        get() {
          if (this.input.active_reg == true) {
            return Math.round((this.input.variables * this.price.regression - (((this.input.variables - 1)** 1.32) * this.factor * this.price.regression))* 100) / 100
          }
          else {
            return Math.round((this.input.variables * this.price.korrelation - (((this.input.variables - 1)** 1.32) * this.factor * this.price.korrelation))* 100) / 100
          }
        }
      },
      get_variable_text: {
        get() {
          if (this.input.variables == 1) {
            return "einer Variable"
          } else {
            return String(this.input.variables) + " Variablen"
          }
        }
      }
    },
    methods: {
      set_active: function (input) {
        if (input == "regression") {
          this.input.active_reg = true
        } else {
          this.input.active_reg = false
        }
      }
    }
  }
</script>