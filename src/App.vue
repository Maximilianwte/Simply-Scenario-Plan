<template>
  <div class="min-h-screen w-screen relative theme_light text-main bg-bg">
    <router-view />
  </div>
</template>

<script>
  import texts from "./data/text.json";

  export default {
    data() {
      return {
        currentLang: "de",
        text: texts
      }
    },
    mounted() {
    },
  }
</script>

<style src="./main.css" />