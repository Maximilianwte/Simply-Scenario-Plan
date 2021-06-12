<template>
  <div id="app" class="min-h-screen min-w-screen relative text-main bg-bg" :class="getTheme">
    <router-view />
    <div id="askTracking" v-if="getTrackingState == null"
      class="fixed bottom-0 border-2 px-2 py-2 right-0 mr-16 md:mr-4 mb-4 text-2xl bg-bg">
      <h6>Allow cookies?</h6>
      <p class="text-sm w-64 mt-1">We use tracking only to get an understanding what you like about the product and
        what not. No advertising, no data selling!</p>
      <div class="flex mt-2 justify-center">
        <button @click="enableCookies()"
          class="px-2 py-2 rounded border-2 text-base hover:border-alternative hover:text-alternative">Allow</button>
        <button @click="disableTracking()"
          class="ml-4 px-2 py-2 rounded border-2 text-base hover:border-alternative hover:text-alternative">Disable
          {{getTrackingState}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  import texts from "./data/text.json";
  import store from "./store.js";
  import cookie_functions from "./data/cookie_functions";
  export default {
    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'Simply Scenario Plan | The Risk Management App to plan for all scenarios',
      // all titles will be injected into this template
      titleTemplate: '%s | Simply Scenario Plan'
    },
    data() {
      return {
        currentLang: "de",
        text: texts
      }
    },
    computed: {
      getTheme() {
        return store.state.ui.dark ? "theme_dark" : "theme_light"
      },
      getTrackingState() {
        return store.state.user.enableTracking;
      }
    },
    methods: {
      checkTracking() {
      var enableTracking = cookie_functions.getCookie("enableTracking");
      if (enableTracking == "true") {
          this.enableCookies()
        }
      },
      enableCookies() {
        cookie_functions.setCookie("enableTracking", true, 90);
        store.commit("setTracking", true);
      },
      disableTracking() {
        store.commit("setTracking", false);
        this.$ga.disable();
      },
    },
    mounted() {
      store.commit("setDataFromCookie");
      this.checkTracking();
    }
  }
</script>

<style src="./main.css" />