<template>
  <div id="front" class="w-full">
<transition name="fade">
      <TheCircle v-if="getSteps.current == 0" />
    <ElectricityInput v-if="activeCategories.electricity && getSteps.current == 1" />
</transition>
    <div id="ux" class="z-20">
      <div id="progressIndicator" v-if="getSteps.current > 0">
        <div id="progressBar" class="w-full h-2 absolute top-0 bg-main" :style="handleProgressBar" />
        <div id="pageIndicator">
          <h3 class="text-4xl text-main absolute top-0 left-0 pt-2 pl-4">{{getSteps.current}} / {{getSteps.maxStep}}
          </h3>
        </div>
      </div>
      <div id="leftArrow" v-if="getSteps.current > 0">
        <svg @click="handleProgress('dec')" class="w-16 left absolute top-0 left-0 mt-72 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213.333 213.333">
          <path d="M0 53.333L106.667 160 213.333 53.333z" /></svg>
      </div>
      <div id="rightArrow">
        <svg @click="getSteps.fulFilled ? handleProgress('inc') : ''" class="w-16 right absolute top-0 right-0 mt-72"
          title="Weiter" :class="getSteps.fulFilled == false ? 'svg-noClick' : 'cursor-pointer'"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213.333 213.333">
          <path d="M0 53.333L106.667 160 213.333 53.333z" /></svg>
      </div>
    </div>
  </div>
</template>

<script>
  import store from "../store";
  import TheCircle from "../components/TheCircle";
  import ElectricityInput from "../components/ElectricityInput";


  export default {
    components: {
      TheCircle,
      ElectricityInput
    },
    data() {
      return {
        activeCategories: store.state.activeCategories,
      }
    },
    computed: {
      handleProgressBar() {
        var amount = (1 - (this.getSteps.current / this.getSteps.maxStep)) * 100;
        return `transform: translateX(-${amount}%)`
      },
      getSteps() {
        return store.state.steps;
      }
    },
    methods: {
      handleProgress(id) {
        store.commit("handleProgress", id)
      }
    }
  }
</script>