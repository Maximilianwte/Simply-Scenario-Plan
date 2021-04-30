<template>
  <div id="home" class="flex-col pt-24">
    <div id="video" class="w-2/3 h-80 border rounded">
      <p class="mt-2 ml-2 text-alternative">Video</p>
    </div>
    <div class="cta flex-col mt-6">
      <router-link to="/register">
        <button
          class="bg-focus hover:bg-main text-white text-xl rounded py-2 px-4"
        >
          Register
        </button>
      </router-link>
      <p>You can use the app 100% for free.</p>
    </div>
    <div id="template" class="w-2/3 flex h-80 mt-20 border rounded">
      <div class="left h-full w-1/4 border-r-2">
        <p class="mt-4 ml-4 mb-2 text-alternative">Templates</p>
        <li @mouseleave="setMouse != true ? (activeHoverTemplate = null) : ''">
          <ul
            class="px-4 py-2 bg-gray-100 hover:bg-gray-300 cursor-pointer"
            @click="setMouse = true"
            @mouseover="activeHoverTemplate = 'smallBusiness'"
          >
            Small Business Plan
          </ul>
          <ul
            class="px-4 py-2 bg-gray-100 hover:bg-gray-300 cursor-pointer"
            @click="setMouse = true"
            @mouseover="activeHoverTemplate = 'salesPitch'"
          >
            Sales Pitch Scenario Plan
          </ul>
          <ul
            class="px-4 py-2 bg-gray-100 hover:bg-gray-300 cursor-pointer"
            @click="setMouse = true"
            @mouseover="activeHoverTemplate = 'fantasyBasketball'"
          >
            Fantasy Basketball Draft Plan
          </ul>
        </li>
      </div>
      <div class="right h-full w-3/4">{{ getTemplateImage }}</div>
    </div>
    <div id="featureTracker" class="border-2 mt-12 rounded px-8 py-4">
      <h4 class="text-xl">Feature Tracker</h4>
      <p class="text-base text-alternative">
        What features will be released next?
      </p>
      <li class="mt-8 mb-4">
        <ul class="flex items-center justify-between">
          <div class="text">
            <h6 class="mr-4">1. Backend Integration</h6>
            <p class="text-sm text-alternative">
              Release in {{ getDayToRelease("05/20/2021") }} days.
            </p>
          </div>
          <progressBar class="" :loadState="getLoadState('05/19/2021', 40)" />
        </ul>
        <ul class="flex items-center justify-between mt-4">
          <div class="text">
            <h6 class="mr-4">2. More charting features</h6>
            <p class="text-sm text-alternative">
              Release in {{ getDayToRelease("05/31/2021") }} days.
            </p>
          </div>
          <progressBar class="" :loadState="getLoadState('05/31/2021', 40)" />
        </ul>
      </li>
    </div>
    <div id="featureVoter" class="border-2 rounded px-8 py-4 mt-8">
      <h4 class="text-xl">Vote Features</h4>
      <p class="text-base text-alternative">
        What feature do you want built next?
      </p>
      <li class="mt-8 mb-4">
        <ul class="flex items-center">
          <h6 class="mr-4">1. More colors</h6>
          <button class="bg-focus hover:bg-main text-white rounded px-4 py-2">
            Vote
          </button>
        </ul>
        <ul class="flex items-center mt-4">
          <h6 class="mr-4">2. Saving all data</h6>
          <button class="bg-focus hover:bg-main text-white rounded px-4 py-2">
            Vote
          </button>
        </ul>
        <ul class="flex items-center mt-4">
          <input
            type="text"
            class="w-40 border-2 rounded mr-4"
            placeholder="3. New input"
          />
          <button class="bg-focus hover:bg-main text-white rounded px-4 py-2">
            Vote
          </button>
        </ul>
      </li>
    </div>
    <div class="footer">
      <router-link to="/imprint">
        <h2 class="ml-4 mt-8">Imprint</h2>
      </router-link>
    </div>
  </div>
</template>
<script>
import progressBar from "../components/progressBar";
export default {
  components: { progressBar },
  data() {
    return {
      setMouse: false,
      activeHoverTemplate: null,
    };
  },
  computed: {
    getTemplateImage() {
      switch (this.activeHoverTemplate) {
        case "smallBusiness": {
          return "smallBusinessImgPathHere";
        }
        case "salesPitch": {
          return "salesPitchPathHere";
        }
        default: {
          return "show image here of the template";
        }
      }
    },
  },
  methods: {
    getDayToRelease(releaseDay) {
      var release = new Date(releaseDay);
      var today = new Date();
      var difference = Math.round(
        (release.getTime() - today.getTime()) / (1000 * 3600 * 24)
      );

      return difference > 0 ? difference : "0";
    },
    getLoadState(releaseDay, fullDevTime) {
      var untilRelease = this.getDayToRelease(releaseDay);
      return Math.round(100 - (untilRelease / fullDevTime) * 100);
    },
  },
};
</script>