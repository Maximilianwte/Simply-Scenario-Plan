<template>
  <div class="w-full flex-col justify-around mb-8">
    <div id="head" class="mb-8 h-96 lg:h-128 w-full">
      <div class="img w-full h-full" :style="get_background_image"></div>
    </div>
    <!-- <div id="products" class="w-full flex justify-around mt-16">
      <div
        class="container text-center pt-4 w-1/2 h-96 bg-main_primary text-bg_primary rounded-xl flex justify-between">
        <div id="correlation" class="w-1/2 px-2 py-2 text-xl">
          <li>
            <ul class="w-full flex justify-around mb-2">
              <svg class="svg-light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M154.5 124.3a71.4 71.4 0 0163 9 7.5 7.5 0 009.4-11.8c-1.3-1-32-25-76.7-11.5a7.5 7.5 0 004.3 14.3zM154.5 175a71.4 71.4 0 0163 9 7.5 7.5 0 009.4-11.8c-1.3-1-32-25-76.7-11.5a7.5 7.5 0 004.3 14.4zM217.5 234.7A7.5 7.5 0 00227 223c-1.3-1-32-25.1-76.7-11.5a7.5 7.5 0 004.3 14.3 71.4 71.4 0 0163 8.9zM361.8 110a86.4 86.4 0 00-76.7 11.5 7.5 7.5 0 009.4 11.7c1-.8 26.1-20 63-8.9a7.5 7.5 0 104.3-14.3zM361.8 160.7a86.4 86.4 0 00-76.7 11.5 7.5 7.5 0 009.4 11.8c1-.9 26.1-20.1 63-9a7.5 7.5 0 104.3-14.3zM361.8 211.5a86.4 86.4 0 00-76.7 11.5 7.5 7.5 0 009.4 11.7c1-.8 26.1-20 63-8.9a7.5 7.5 0 104.3-14.3z" />
                <path
                  d="M492 391h-13V137.7c0-18.5-15.1-33.5-33.6-33.5h-43.1v-37a16 16 0 00-12-15.4 170 170 0 00-100.1 3.4A154 154 0 00256 71.9c-6-4-17.8-11-34.2-16.7a170 170 0 00-100.1-3.4 16 16 0 00-12 15.5v36.9H66.6c-18.5 0-33.5 15-33.5 33.5V391H19.9C9 391 0 399.9 0 410.9A55.3 55.3 0 0055.2 466h401.6A55.3 55.3 0 00512 411c0-11-9-20-20-20zm-222-81.8a153.7 153.7 0 01116-14.7l-2.3 12c-.2.7-1 1.2-1.7 1a166.3 166.3 0 00-119.7 18.2c-3.9 2.3-8.7 2.3-12.6 0A166.3 166.3 0 00130 307.5c-.8.2-1.5-.3-1.7-1l-2.4-12a153.7 153.7 0 01116.2 14.7c8.6 5 19.2 5 27.8 0zm-145.3-242c0-.4.4-.7.8-.9 31-8.2 61.5-7.2 90.8 2.8 16 5.6 27.3 12.5 32.2 15.8v210.7c-10.7-6.1-27.8-14-49.8-18.4a170 170 0 00-74 2.2zm-76.6 70.5c0-10.2 8.3-18.5 18.5-18.5h43.1v20.2h-27c-8 0-14.4 6.4-14.4 14.3v144.8a7.5 7.5 0 1015 0V154.4h26.4v134.8l.2 1.3v.2l3.7 18.6c1.8 9 10.6 14.8 19.6 12.9 51.3-11.1 90.3 5.5 108.9 16.4 8.6 5 19.2 5 27.8 0a151.3 151.3 0 01108.9-16.4c9 2 17.8-3.8 19.6-12.9l3.7-18.6v-.2l.2-1.3V230a7.5 7.5 0 10-15 0v49.5a170 170 0 00-74-2.2c-22 4.3-39 12.3-49.8 18.4V85c5-3.4 16.2-10.3 32.2-15.9 29.3-10 59.8-11 90.8-2.8.4.2.8.5.8 1v127.6a7.5 7.5 0 1015 0v-40.5h26.4v201.4H83.3v-22.3a7.5 7.5 0 10-15 0v22.9c0 8 6.4 14.4 14.4 14.4h346.6c8 0 14.4-6.5 14.4-14.4V153.7c0-7.9-6.4-14.3-14.4-14.3h-27v-20.2h43.1c10.2 0 18.5 8.3 18.5 18.5V391H48.1zM183.7 406h144.6v7.5c0 4.2-3.4 7.5-7.5 7.5H191.2a7.5 7.5 0 01-7.5-7.5zm273 45.1H55.3C33 451.1 15 433.1 15 411a5 5 0 015-5h148.7v7.6a22.6 22.6 0 0022.5 22.5h129.6a22.6 22.6 0 0022.5-22.5V406h148.8a5 5 0 014.9 4.9c0 22.2-18 40.2-40.2 40.2z" />
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
    </div> -->
    <div id="products_header" class="text-2xl md:text-3xl mt-16 text-left w-full px-16">
      <h3>Artificial Intelligence für ihr Herzensgut.</h3>
    </div>
    <div id="products" class="w-full h-128 mt-4 bg-main_primary">
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
      <p class="mb-2">Ihre gewünschten Reporte:</p>
      <div id="option_product" class="flex justify-between">
        <div :class="get_class('product')"
          class="button text-bg_primary py-4 px-8 lg:px-16 rounded-tl-xl rounded-bl-xl ml-2 cursor-pointer"
          v-on:click="set_active('product')">
          <p>Produktsegment</p>
        </div>
        <div :class="get_class('finance')" class="button text-bg_primary py-4 px-8 lg:px-16 cursor-pointer"
          v-on:click="set_active('finance')">
          <p>Finanzen</p>
        </div>
        <div :class="get_class('marketing')" class="button text-bg_primary py-4 px-8 lg:px-16 cursor-pointer"
          v-on:click="set_active('marketing')">
          <p>Marketing</p>
        </div>
        <div :class="get_class('supplyChain')"
          class="button text-bg_primary py-4 px-8 lg:px-16 rounded-tr-xl rounded-br-xl mr-2 cursor-pointer"
          v-on:click="set_active('supplyChain')">
          <p>Supply Chain</p>
        </div>
      </div>
      <p class="mt-12">Ihre Anzahl an Mitarbeitern:</p>
      <div id="option_size" class="flex justify-between mt-2">
        <div :class="get_class_size('1')"
          class="button text-bg_primary py-4 px-8 lg:px-16 rounded-tl-xl rounded-bl-xl ml-2 cursor-pointer"
          v-on:click="input.size = 1">
          <p>Unter 10</p>
        </div>
        <div :class="get_class_size('3')" class="button text-bg_primary py-4 px-8 lg:px-16 cursor-pointer"
          v-on:click="input.size = 3">
          <p>10 - 50</p>
        </div>
        <div :class="get_class_size('6')"
          class="button text-bg_primary py-4 px-8 lg:px-16 rounded-tr-xl rounded-br-xl mr-2 cursor-pointer"
          v-on:click="input.size = 6">
          <p>Über 50</p>
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
          products: {
            product: true,
            finance: true,
            marketing: true,
            supply_chain: true
          },
          size: 1
        },
        prices: {
          product: 90,
          finance: 140,
          marketing: 70,
          supply_chain: 120
        }
      }
    },
    computed: {
      get_background_image() {
        return {
          'background-image': 'url(' + require('../assets/coffee.jpg') + ')'
        }
      },
      get_price: {
        get() {
          var price = 120;
          var key = null;
          for (var item in this.input.products) {
            switch (item) {
              case "product":
                price = (this.input.products.product == true) ? price + this.prices.product : price
                break;
              case "finance":
                price = (this.input.products.finance == true) ? price + this.prices.finance : price
                break;
              case "marketing":
                price = (this.input.products.marketing == true) ? price + this.prices.marketing : price
                break;
              case "supply_chain":
                price = (this.input.products.supply_chain == true) ? price + this.prices.supply_chain : price
                break;
            }
          }
          return price * this.input.size;
        }
      },
      get_price_text() {
        var products = "";
        for (var item in this.input.products) {
          if (products.length > 0 && products.slice(-1) != " ") {
            products = products + ", "
          }
          switch (item) {
            case "product":
              products = (this.input.products.product == true) ? "Produktanalyse" : products;
              break;
            case "finance":
              products = (this.input.products.finance == true) ? products + "Finanzanalyse" : products;
              break;
            case "marketing":
              products = (this.input.products.marketing == true) ? products + "Marketinganalyse" : products;
              break;
            case "supply_chain":
              products = (this.input.products.supply_chain == true) ? products + "Supply Chain Analyse" : products;
              break;
          }
        }
        return "Unser Preis für ihre Analyse mit der " + products + " sind " + this.get_price + "€."
      }
    },
    methods: {
      set_active: function (input) {
        if (input == "product") {
          this.input.products.product = !this.input.products.product
        } else if (input == "finance") {
          this.input.products.finance = !this.input.products.finance
        } else if (input == "marketing") {
          this.input.products.marketing = !this.input.products.marketing
        } else if (input == "supplyChain") {
          this.input.products.supply_chain = !this.input.products.supply_chain
        }
      },
      get_class(id) {
        var dataSource = null

        switch (id) {
          case "product":
            dataSource = this.input.products.product
            break;
          case "finance":
            dataSource = this.input.products.finance
            break;
          case "marketing":
            dataSource = this.input.products.marketing
            break;
          case "supplyChain":
            dataSource = this.input.products.supply_chain
            break;
        }

        if (dataSource == true) {
          return "bg-main_primary hover:bg-main_primary"
        } else {
          return "bg-main_secondary hover:bg-main_primary"
        }
      },
      get_class_size(id) {
        if (this.input.size == id) {
          return "bg-main_primary hover:bg-main_primary"
        } else {
          return "bg-main_secondary hover:bg-main_primary"
        }
      }
    }
  }
</script>