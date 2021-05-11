<template>
  <div class="carousel">
    <transition-group name="fade" tag="div">
      <div
        class="rounded-lg border-2 w-72"
        v-for="number in [index]"
        :key="number"
      >
        <img class="rounded-t-lg" :src="resolve_img_url(currentData.image)" />
        <h5 class="flex-col py-6 text-xl">{{currentData.header}}</h5>
        <p class="py-2 px-4">{{currentData.text}}</p>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [{
          header: "A key employee leaves",
          image: "bye.png",
          text: "Scenario planning helps you to plan for the future."
      },
      {
          header: "A ship gets stuck",
          image: "ship.png",
          text: "Your supply chain is stuck? By planning for all possible scenarios, you can identify other opportunities."
      }],
      timer: null,
      index: 0,
    };
  },
  computed: {
    currentData: function () {
      return this.data[Math.abs(this.index) % this.data.length];
    },
  },
  methods: {
    resolve_img_url: function (path) {
      let images = require.context("../assets/", false, /\.png$|\.jpg$/);
      return images("./" + path);
    },
    startSlide: function () {
      this.timer = setInterval(this.next, 8000);
    },

    next: function () {
      this.index += 1;
    },
    prev: function () {
      this.index -= 1;
    },
  },
  mounted() {
    this.startSlide();
  },
};
</script>