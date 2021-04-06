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
      store.commit("setDataFromCookie");
      //let data = JSON.parse(cookie_functions.getCookie("scenarioVariables"));
      /* Console here and in store looks good, why doesnt it come to component */
 /*      console.log('from cookie read: ') */
 /*      console.log(data); */
 /*      store.commit("setData", {id: "scenarioVariables", value: data}) */
    }
  }
</script>

<style src="./main.css" />