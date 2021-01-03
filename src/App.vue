<template>
  <div class="min-h-screen w-screen relative theme_light text-main bg-bg pb-8">
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
      this.$router.push({
        name: 'home',
        params: {
          component: 0
        }
      })
    },
  }
</script>

<style src="./main.css" />