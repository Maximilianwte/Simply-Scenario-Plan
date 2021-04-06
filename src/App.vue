<template>
  <div class="min-h-screen w-screen relative text-main bg-bg" :class="getTheme">
    <router-view />
  </div>
</template>

<script>
  import texts from "./data/text.json";
  import store from "./store.js";
  import cookie_functions from "./data/cookie_functions";

  export default {
    data() {
      return {
        currentLang: "de",
        text: texts
      }
    },
    computed: {
      getTheme() {
        return store.state.ui.dark ? "theme_dark" : "theme_light"
      }
    },
    mounted() {
      let data = JSON.parse(cookie_functions.getCookie("data"));
      console.log(data);
      store.commit("setData", {id: "data", value: data})
    }
  }
</script>

<style src="./main.css" />