<template>
  <div class="w-full flex-col justify-around mb-8">
    <div id="head" class="mb-8 h-96 lg:h-128 w-full">
      <div class="img w-full h-full" :style="get_background_image"></div>
    </div>
    <div id="products" class="w-full flex justify-around mt-16">
      <div
        class="container text-center pt-4 w-1/2 h-96 bg-main_primary text-bg_primary rounded-xl flex justify-between">
        <div id="correlation" class="w-1/2 px-2 py-2 text-xl">
          <li>
            <ul class="w-full flex justify-around mb-2">
              <svg class="svg-light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <path d="M154.5 124.3a71.4 71.4 0 0163 9 7.5 7.5 0 009.4-11.8c-1.3-1-32-25-76.7-11.5a7.5 7.5 0 004.3 14.3zM154.5 175a71.4 71.4 0 0163 9 7.5 7.5 0 009.4-11.8c-1.3-1-32-25-76.7-11.5a7.5 7.5 0 004.3 14.4zM217.5 234.7A7.5 7.5 0 00227 223c-1.3-1-32-25.1-76.7-11.5a7.5 7.5 0 004.3 14.3 71.4 71.4 0 0163 8.9zM361.8 110a86.4 86.4 0 00-76.7 11.5 7.5 7.5 0 009.4 11.7c1-.8 26.1-20 63-8.9a7.5 7.5 0 104.3-14.3zM361.8 160.7a86.4 86.4 0 00-76.7 11.5 7.5 7.5 0 009.4 11.8c1-.9 26.1-20.1 63-9a7.5 7.5 0 104.3-14.3zM361.8 211.5a86.4 86.4 0 00-76.7 11.5 7.5 7.5 0 009.4 11.7c1-.8 26.1-20 63-8.9a7.5 7.5 0 104.3-14.3z"/>
  <path d="M492 391h-13V137.7c0-18.5-15.1-33.5-33.6-33.5h-43.1v-37a16 16 0 00-12-15.4 170 170 0 00-100.1 3.4A154 154 0 00256 71.9c-6-4-17.8-11-34.2-16.7a170 170 0 00-100.1-3.4 16 16 0 00-12 15.5v36.9H66.6c-18.5 0-33.5 15-33.5 33.5V391H19.9C9 391 0 399.9 0 410.9A55.3 55.3 0 0055.2 466h401.6A55.3 55.3 0 00512 411c0-11-9-20-20-20zm-222-81.8a153.7 153.7 0 01116-14.7l-2.3 12c-.2.7-1 1.2-1.7 1a166.3 166.3 0 00-119.7 18.2c-3.9 2.3-8.7 2.3-12.6 0A166.3 166.3 0 00130 307.5c-.8.2-1.5-.3-1.7-1l-2.4-12a153.7 153.7 0 01116.2 14.7c8.6 5 19.2 5 27.8 0zm-145.3-242c0-.4.4-.7.8-.9 31-8.2 61.5-7.2 90.8 2.8 16 5.6 27.3 12.5 32.2 15.8v210.7c-10.7-6.1-27.8-14-49.8-18.4a170 170 0 00-74 2.2zm-76.6 70.5c0-10.2 8.3-18.5 18.5-18.5h43.1v20.2h-27c-8 0-14.4 6.4-14.4 14.3v144.8a7.5 7.5 0 1015 0V154.4h26.4v134.8l.2 1.3v.2l3.7 18.6c1.8 9 10.6 14.8 19.6 12.9 51.3-11.1 90.3 5.5 108.9 16.4 8.6 5 19.2 5 27.8 0a151.3 151.3 0 01108.9-16.4c9 2 17.8-3.8 19.6-12.9l3.7-18.6v-.2l.2-1.3V230a7.5 7.5 0 10-15 0v49.5a170 170 0 00-74-2.2c-22 4.3-39 12.3-49.8 18.4V85c5-3.4 16.2-10.3 32.2-15.9 29.3-10 59.8-11 90.8-2.8.4.2.8.5.8 1v127.6a7.5 7.5 0 1015 0v-40.5h26.4v201.4H83.3v-22.3a7.5 7.5 0 10-15 0v22.9c0 8 6.4 14.4 14.4 14.4h346.6c8 0 14.4-6.5 14.4-14.4V153.7c0-7.9-6.4-14.3-14.4-14.3h-27v-20.2h43.1c10.2 0 18.5 8.3 18.5 18.5V391H48.1zM183.7 406h144.6v7.5c0 4.2-3.4 7.5-7.5 7.5H191.2a7.5 7.5 0 01-7.5-7.5zm273 45.1H55.3C33 451.1 15 433.1 15 411a5 5 0 015-5h148.7v7.6a22.6 22.6 0 0022.5 22.5h129.6a22.6 22.6 0 0022.5-22.5V406h148.8a5 5 0 014.9 4.9c0 22.2-18 40.2-40.2 40.2z"/>
</svg>

            </ul>
            <ul>
              <h5>Korrelationsanalyse</h5>
            </ul>
          </li>
        </div>
        <div id="regression" class="w-1/2 px-2 py-2 text-xl">
          <li>
            <ul class="w-full flex justify-around mb-2">
              <svg class="svg-light px-1" viewBox="0 0 480 480.1" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M448 416.1h-24v-16a32 32 0 00-30.7-31.9 216 216 0 10-306.5 0 32 32 0 00-30.7 31.9v16H32a32 32 0 00-32 32v24a8 8 0 008 8h464a8 8 0 008-8v-24a32 32 0 00-32-32zm-408-200a200 200 0 11330 152H110a199.5 199.5 0 01-70-152zm32 184a16 16 0 0116-16h304a16 16 0 0116 16v16H72zm392 64H16v-16a16 16 0 0116-16h416a16 16 0 0116 16zm0 0" />
                <path
                  d="M296 136.1a30.6 30.6 0 0132 32 8 8 0 0016 0 30.6 30.6 0 0132-32 8 8 0 000-16 30.6 30.6 0 01-32-32 8 8 0 00-16 0 30.6 30.6 0 01-32 32 8 8 0 000 16zm40-20.4c3.3 5 7.5 9.1 12.4 12.4a44.4 44.4 0 00-12.3 12.4 44.4 44.4 0 00-12.4-12.4c4.9-3.3 9-7.5 12.4-12.4zm0 0M240 64.1v-16a168 168 0 00-162.6 126l15.5 4A152 152 0 01240 64.1zm0 0M72 216.1h16c0-7.6.6-15.3 1.8-22.8l-15.9-2.4c-1.2 8.3-1.8 16.8-1.8 25.2zm0 0M288 240.1h16v-16h16v-16h-16v-16h-16v16h-16v16h16zm0 0" />
              </svg>
            </ul>
            <ul>
              <h5>Regressionsanalyse</h5>
            </ul>
          </li>
        </div>
      </div>
    </div>
    <div id="dsgvo" class="text-2xl mt-32 flex-col text-main_primary text-center w-128">
      <svg class="svg-2xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M455.8 62.6C392 58.6 326.6 38 261.6 1.5c-3.5-2-7.7-2-11.2 0-65 36.5-130.3 57.1-194.2 61.1-6 .4-10.7 5.3-10.7 11.4V290c0 35.8 11.2 69.8 33.2 101.2a280.6 280.6 0 0071.3 68.3 435.7 435.7 0 00102.5 51.9 11.4 11.4 0 007 0c2-.7 52-17 102.5-51.9 30-20.7 54-43.7 71.3-68.3 22-31.4 33.2-65.4 33.2-101.2V74c0-6-4.7-11-10.7-11.4zm-12 227.5c0 56.6-31.8 107.3-94.3 150.5a426 426 0 01-93.5 48c-12-4.3-52.7-19.8-93.1-47.7-62.8-43.3-94.6-94-94.6-150.8V84.5c62-5.6 125-25.8 187.7-60.1 62.6 34.3 125.7 54.5 187.7 60.1v205.6z" />
        <path
          d="M298.5 298.3c-1.6-9.6-3.3-19.6-4.7-29.4a68.3 68.3 0 10-75.6 0c-1.4 9.8-3.1 19.8-4.7 29.4-3.3 19.8-6.7 40.2-8.7 60.6a11.4 11.4 0 0011.4 12.4h79.6a11.4 11.4 0 0011.3-12.4c-1.9-20.4-5.3-40.8-8.6-60.6zm-28.4-33.8c1.8 12.6 4 25.3 6 37.6 2.5 15.2 5.1 31 7 46.5H229c1.9-15.6 4.5-31.3 7-46.5 2-12.3 4.2-25 6-37.6.6-4.8-1.9-9.6-6.2-11.8a45.6 45.6 0 1140.7 0c-4.4 2.2-7 7-6.3 11.8z" />
        <path
          d="M250.8 52.9a509.6 509.6 0 01-150.2 50.5c-5.5.9-9.6 5.6-9.6 11.2v175.5c0 48.3 28 92.4 83.1 130.9a404.9 404.9 0 0077.6 41.6 11.4 11.4 0 008.6 0 422 422 0 0036.3-16.7 11.4 11.4 0 10-10.5-20.2 401.6 401.6 0 01-30.1 14c-16-6.6-42.8-19.1-68.8-37.4-48.7-34-73.4-71.7-73.4-112.2v-166c47.3-8.6 95-24.8 142.2-48.3a534.5 534.5 0 00142.2 48.4v166c0 29.9-13.6 58.5-40.5 85.1a11.4 11.4 0 1016 16.2c31.4-31 47.3-65.1 47.3-101.4V114.6c0-5.6-4-10.3-9.6-11.2-49.8-8-100.4-25-150.2-50.5a11.4 11.4 0 00-10.4 0z" />
        <path d="M322.9 403.8l-1 1a11.4 11.4 0 1016 16.2l1.1-1.2a11.4 11.4 0 10-16.1-16z" />
      </svg>
      <h5 class="mt-4">Alle Daten werden natürlich DSGVO konform von uns für sie verarbeitet.</h5>
    </div>
    <div id="contact" class="w-full mt-24 lg:w-2/3 mt-20 flex-col rounded-xl lg:border-2 py-12 mb-12">
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
      <div id="send" class="mt-20 text-lg">
        <input type="email" placeholder="Email" class="mb-6 w-full border-2 border-main_secondary px-2 py-1">
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
        factor: 0.195
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
      get_background_image() {
        return {
          'background-image': 'url(' + require('../assets/repair.jpg') + ')'
        }
      },
      get_price: {
        get() {
          if (this.input.active_reg == true) {
            return Math.round((this.input.variables * this.price.regression - (((this.input.variables - 1) ** 1.32) *
              this.factor * this.price.regression)) * 100) / 100
          } else {
            return Math.round((this.input.variables * this.price.korrelation - (((this.input.variables - 1) ** 1.32) *
              this.factor * this.price.korrelation)) * 100) / 100
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

/*

<svg height="512" viewBox="0 0 56 49" width="512" xmlns="http://www.w3.org/2000/svg">
  <g fill="#000" fill-rule="nonzero">
    <path
      d="M52.2 17h.2c.2.1 1 .8 1.8 4l-3.2.3v-1c0-2.1 0-2.9 1.2-3.3zM48.8 24.2c.1-.3.4-.6.7-.6l.5-.1c1.8-.3 3.6-.5 5.3-.5.3 0 .6.2.6.4.2 2 .1 4-.3 6a15 15 0 01-1.7 4 22.9 22.9 0 00-6.1-7.2c.4-.6.8-1.3 1-2zM39.1 28.4l5-1.9c5.4 2.1 8.7 9 9.3 10.3-.6 1-2.4 3.3-7 5-1.5.7-3.2 1-4.9 1.2h-1.3a8 8 0 01-2-.4l-.2-1c-.5-2.4-1.3-8.7 1.1-13.2zM35.7 40.4c-1.3-.4-2.6-1.1-3.7-2a17.2 17.2 0 01-3.8-4.4c0-.2 0-.5.2-.7 1.4-1.2 2.9-2.3 4.4-3.3.2 0 .4-.2.5-.3.3-.1.6-.1.8 0a8 8 0 002 1c-.7 3.1-.9 6.4-.4 9.7zM27 26.7l.3-.2c1-.4 1.5 0 2.8 1.7l.7.8-2.7 2c-1-2.3-1.2-3.7-1-4.3zM0 28.5c0-4 .6-8.5 5.2-8.5 1 0 1.9.1 2.8.4v2.2c-.9-.4-1.9-.6-2.8-.6-3 0-3.2 3-3.2 6.5C2 31.9 3.2 34 5.2 34c1 0 1.9-.2 2.8-.5v.5l.1 1.6c-1 .2-2 .4-3 .4C2 36 0 33.2 0 28.5z" />
    <path
      d="M10.2 36l-.2-2V18c0-.6.4-1 1-1h22c.6 0 1 .4 1 1v9.6l-1.5.3a23 23 0 01-.8-1c-1.2-1.4-2.6-3.2-5.1-2.3-.7.3-1.2.8-1.4 1.4-.5 1.3 0 3.5 1.4 6.4-.6.8-.6 1.9 0 2.7 1 1.9 2.5 3.5 4.2 5l.5.3A9 9 0 0125 43h-6a9 9 0 01-8.8-7zM56 47c0 1-1.4 2-3 2H7c-1.6 0-3-1-3-2v-2H56zM21 12a1 1 0 01-1-1c0-1.2.4-2.3 1.2-3.1a2.6 2.6 0 000-3.8c-.8-.8-1.2-2-1.2-3.1a1 1 0 012 0c0 .7.3 1.4.8 1.9a4.6 4.6 0 010 6.2c-.5.5-.8 1.2-.8 1.9 0 .6-.4 1-1 1zM15 12a1 1 0 01-1-1c0-1.2.4-2.3 1.2-3.1a2.6 2.6 0 000-3.8c-.8-.8-1.2-2-1.2-3.1a1 1 0 012 0c0 .7.3 1.4.8 1.9a4.6 4.6 0 010 6.2c-.5.5-.8 1.2-.8 1.9 0 .6-.4 1-1 1zM27 12a1 1 0 01-1-1c0-1.2.4-2.3 1.2-3.1a2.6 2.6 0 000-3.8c-.8-.8-1.2-2-1.2-3.1a1 1 0 012 0c0 .7.3 1.4.8 1.9a4.6 4.6 0 010 6.2c-.5.5-.8 1.2-.8 1.9 0 .6-.4 1-1 1z" />
  </g>
</svg>

*/