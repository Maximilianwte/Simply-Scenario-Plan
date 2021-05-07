<template>
  <div id="home" class="flex-col pt-24">
    <div id="svgTest" class="relative">
      <h5 class="px-8 w-80 text-center text-3xl text-bold">Bad things happen - Plan for all scenarios
      </h5>
      <svg class="h-40 absolute path1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 77.09 188"><path d="M74.59 2.5c-56.9 59.28-84.17 108-67 183" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4"/></svg>
      <svg class="h-40 absolute path2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.15 188"><path d="M13 2.5c-32.37 61.8 22.72 128.86 0 183" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4"/></svg>
      <svg class="h-40 absolute path3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 77.09 188"><path d="M2.5 2.5c56.9 59.28 84.17 108 67 183" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4"/></svg>
<!--       <svg class="h-64 absolute path1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120.52 484.5"><path d="M119.52 1C94.86 190.3-48.79 280.72 19 483.5" fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="5"/></svg>
      <svg class="h-64 absolute path2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.02 526"><path d="M4.5 1c-21.65 180.71 64.89 392.18 51 524" fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="5"/></svg>
      <div id="div1" class="absolute rounded py-4 px-2 border-2 text-xl">
        Ships get stuck
      </div>
      <div id="div2" class="absolute rounded py-4 px-2 border-2 text-xl">
        Employees leave
      </div> -->
    </div>
    <div id="usp" class="mt-80 py-12 text-2xl">
        <ul class="list-disc">
          <li>Plan for your business</li>
          <li>Plan for your projects</li>
          <li>Plan for your hobbies</li>
        </ul>
    </div>
    <h4 class="text-3xl">All for free!</h4>
          <router-link to="/register">
        <button
          class="bg-main hover:bg-alternative my-4 text-white text-xl rounded py-2 px-4"
        >
          Start now
        </button>
      </router-link>
    <div id="video" class="w-2/3 mt-20 h-80 border rounded">
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
        <ul
          @mouseleave="
            setMouse != true ? (activeHoverTemplate = 'smallBusiness') : ''
          "
        >
          <li
            class="px-4 py-2 bg-gray-100 hover:bg-gray-300 cursor-pointer"
            @click="setMouse = true"
            @mouseover="activeHoverTemplate = 'smallBusiness'"
          >
            Small Business Plan
          </li>
          <li
            class="px-4 py-2 bg-gray-100 hover:bg-gray-300 cursor-pointer"
            @click="setMouse = true"
            @mouseover="activeHoverTemplate = 'salesPitch'"
          >
            Sales Pitch Scenario Plan
          </li>
          <li
            class="px-4 py-2 bg-gray-100 hover:bg-gray-300 cursor-pointer"
            @click="setMouse = true"
            @mouseover="activeHoverTemplate = 'fantasyBasketball'"
          >
            Fantasy Basketball Draft Plan
          </li>
        </ul>
      </div>
      <div class="right h-full relative w-3/4">
        {{ getTemplateImage }}

        <button
          class="bg-main hover:bg-alternative absolute bottom-0 right-0 mb-4 mr-6 text-white text w-48 rounded py-2 px-4"
          @click="clickStartWithTemplate"
        >
          Start customizing the template
        </button>
      </div>
    </div>
    <div class="container mt-12 bg-gray-100">
    <h5 class="mb-6 text-2xl ml-4 mt-2">How the app works:</h5>
    <div id="processBanner" class="banner pb-6 flex items-start">
      <div class="box w-64 flex-col text-center">
        <svg
          class="w-16"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M474.414 122.438l24.832-24.829a15.008 15.008 0 003.48-15.757 14.999 14.999 0 00-12.828-9.797l-46.066-3.887-3.887-46.066a14.994 14.994 0 00-9.793-12.825 14.993 14.993 0 00-15.757 3.48l-24.832 24.829C349.406 12.965 303.493 0 256 0 187.621 0 123.332 26.629 74.98 74.98 26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256c0-47.492-12.965-93.402-37.586-133.563zM415 83.311A15.006 15.006 0 00428.688 97l26.503 2.234-35.875 35.875-39.125-3.3-3.3-39.125 35.875-35.875zM307 256c0 28.121-22.879 51-51 51s-51-22.879-51-51 22.879-51 51-51a50.655 50.655 0 0123.848 5.938l-34.453 34.457c-5.86 5.855-5.86 15.351 0 21.21C248.32 269.535 252.16 271 256 271s7.68-1.465 10.605-4.395l34.457-34.453A50.655 50.655 0 01307 256zm-5.348-66.867C288.645 180.227 272.922 175 256 175c-44.664 0-81 36.336-81 81s36.336 81 81 81 81-36.336 81-81c0-16.922-5.227-32.645-14.133-45.652l42.828-42.828C385.262 191.73 397 222.52 397 256c0 77.746-63.254 141-141 141s-141-63.254-141-141 63.254-141 141-141c33.48 0 64.27 11.738 88.48 31.305zm114.153 226.672C373.12 458.492 316.367 482 256 482s-117.121-23.508-159.805-66.195C53.508 373.12 30 316.367 30 256S53.508 138.879 96.195 96.195C138.88 53.508 195.633 30 256 30c39.492 0 77.746 10.145 111.672 29.477l-16.918 16.918a14.998 14.998 0 00-4.344 11.867l2.02 23.933C321.762 94.992 290.027 85 256 85c-94.29 0-171 76.71-171 171s76.71 171 171 171 171-76.71 171-171c0-34.027-9.992-65.762-27.195-92.43l23.933 2.02c.422.031.844.05 1.262.05.07 0 .145-.007.215-.011.2 0 .394-.016.594-.027.324-.02.652-.04.972-.079.2-.027.399-.058.598-.09.316-.05.629-.109.941-.18.2-.046.395-.097.59-.148.305-.082.606-.175.906-.277a13 13 0 001.45-.582c.183-.082.367-.164.55-.258.29-.148.57-.312.848-.476.168-.102.336-.196.5-.297.297-.195.582-.406.867-.621.133-.102.27-.192.399-.297.406-.328.8-.676 1.175-1.05l16.918-16.919C471.855 178.254 482 216.508 482 256c0 60.367-23.508 117.121-66.195 159.805zm0 0"
          />
        </svg>
        <h6 class="text-xl mt-4">1. Declare Outcome variables</h6>
        <p class="text-sm text-alternative">
          What can be impacted by different scenarios? Sales? Referalls? SEO
          Ranking?
        </p>
      </div>
      <div class="arrow mt-20 flex-col">
        <svg
          class="w-10 svg-noClick"
          viewBox="-74 0 362 362.667"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M213.668 181.332c0 4.27-1.281 8.535-3.629 11.734l-106.664 160c-3.84 5.762-10.242 9.602-17.707 9.602h-64c-11.734 0-21.336-9.602-21.336-21.336 0-4.266 1.281-8.531 3.629-11.73l98.773-148.27L3.961 33.066C1.613 29.867.332 25.602.332 21.332.332 9.602 9.934 0 21.668 0h64c7.465 0 13.867 3.84 17.707 9.602l106.664 160c2.348 3.199 3.629 7.464 3.629 11.73zm0 0"
          />
        </svg>
      </div>
      <div class="box w-64 mx-6 flex-col text-center">
        <svg
          class="w-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
        >
          <path
            d="M224 104c-22.055 0-40 17.945-40 40 0 13.234-10.766 24-24 24-22.055 0-40 17.945-40 40s17.945 40 40 40h32v-16h-32c-13.234 0-24-10.766-24-24s10.766-24 24-24c22.055 0 40-17.945 40-40 0-13.234 10.766-24 24-24h24v-16h-24zM464 60c0-33.086-26.914-60-60-60h-28v16h28c24.262 0 44 19.738 44 44s-19.738 44-44 44h-28a8 8 0 000 16h20c15.438 0 28 12.563 28 28s-12.563 28-28 28h-20c-44.113 0-80 35.887-80 80h16c0-35.289 28.711-64 64-64h20c24.262 0 44-19.738 44-44 0-12.688-5.395-24.133-14.012-32.172C448.227 107.039 464 85.328 464 60z"
          />
          <path
            d="M336 40c-22.055 0-40 17.945-40 40v40c0 13.234-10.766 24-24 24-22.055 0-40 17.945-40 40v72h16v-72c0-13.234 10.766-24 24-24 22.055 0 40-17.945 40-40V80c0-13.234 10.766-24 24-24h48V40h-48zM280 360H168a8 8 0 00-8 8v32a8 8 0 008 8h112a8 8 0 008-8v-32a8 8 0 00-8-8zm-8 32h-96v-16h96v16z"
          />
          <path
            d="M432 252c0-15.438-12.563-28-28-28h-20a7.997 7.997 0 00-6.859 3.883l-24 40a7.998 7.998 0 00-.102 8.059c.034.061.087.104.123.163l-.021.013L369.87 304H78.13l16.729-27.883-.021-.013c.036-.059.089-.102.123-.163.931-1.642 1.171-3.52.854-5.321l.063-.011-16.805-95.219c-3.418-19.371 8.082-38.676 26.746-44.898l56.711-18.902-5.063-15.18-56.711 18.902c-26.129 8.715-42.227 35.738-37.441 62.859l9.286 52.616-1.743-2.905A7.995 7.995 0 0064 224H44c-15.438 0-28 12.563-28 28s12.563 28 28 28h29.87l-16.729 27.883.046.027c-.55.914-.967 1.916-1.116 3.031l-3.792 28.438h-.001l-2.708 20.318-9.5 71.245c-.048.359.084.701.085 1.059H40v32c0 8.824 7.176 16 16 16h32c8.824 0 16-7.176 16-16v-24h240v24c0 8.824 7.176 16 16 16h32c8.824 0 16-7.176 16-16v-32h-.155c.001-.358.133-.699.085-1.059l-16-120c-.149-1.115-.566-2.118-1.116-3.031l.046-.027L374.13 280H404c15.438 0 28-12.562 28-28zM44 264c-6.617 0-12-5.383-12-12s5.383-12 12-12h15.469l14.402 24H44zm22.335 91.014l.488-3.657L128 373.602v16.813l-64.812-11.783 3.147-23.618zM88 464H56v-24h32v24zm304-24v24h-32v-24h32zm-7.187-61.371L320 390.414v-16.813l61.177-22.245 3.636 27.273zM376.996 320l2.016 15.117-69.746 25.364a8.007 8.007 0 00-5.266 7.52v32a8.005 8.005 0 009.43 7.871l73.501-13.365L390.863 424H57.137l3.933-29.492 73.501 13.363a7.99 7.99 0 006.555-1.73 8.005 8.005 0 002.875-6.141v-32a8.007 8.007 0 00-5.266-7.52l-69.746-25.364L71.004 320h305.992zm-2.867-56l14.402-24H404c6.617 0 12 5.383 12 12s-5.383 12-12 12h-29.871z"
          />
          <path d="M112 280h40v16h-40zM176 280h160v16H176z" />
        </svg>
        <h6 class="text-xl mt-4">2. Scenario variables</h6>
        <p class="text-sm text-alternative">
          What things could possibly happen? A recession? The new product
          release fails or is a total sucess? A new pandemic?
        </p>
      </div>
      <div class="arrow mt-20 flex-col">
        <svg
          class="w-10 svg-noClick"
          viewBox="-74 0 362 362.667"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M213.668 181.332c0 4.27-1.281 8.535-3.629 11.734l-106.664 160c-3.84 5.762-10.242 9.602-17.707 9.602h-64c-11.734 0-21.336-9.602-21.336-21.336 0-4.266 1.281-8.531 3.629-11.73l98.773-148.27L3.961 33.066C1.613 29.867.332 25.602.332 21.332.332 9.602 9.934 0 21.668 0h64c7.465 0 13.867 3.84 17.707 9.602l106.664 160c2.348 3.199 3.629 7.464 3.629 11.73zm0 0"
          />
        </svg>
      </div>
      <div class="box w-64 mx-6 flex-col text-center">
        <svg
          class="w-16"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M57 34.53V14.92c3.387-.488 6-3.401 6-6.92 0-3.859-3.14-7-7-7s-7 3.141-7 7H1v40h30.051c.52 8.356 7.465 15 15.949 15 8.822 0 16-7.178 16-16 0-5.039-2.347-9.535-6-12.47zM56 3c2.757 0 5 2.243 5 5s-2.243 5-5 5-5-2.243-5-5 2.243-5 5-5zM3 10h46.295a6.995 6.995 0 001.107 2.185l-6.116 6.116C43.894 18.113 43.462 18 43 18s-.894.113-1.285.301L39.7 16.286c.187-.392.3-.824.3-1.286 0-1.654-1.346-3-3-3s-3 1.346-3 3c0 .462.113.894.301 1.285L29.286 21.3A2.972 2.972 0 0028 21c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3a2.95 2.95 0 00-.301-1.285l5.015-5.015c.392.187.824.3 1.286.3s.894-.113 1.285-.301l2.015 2.015c-.187.392-.3.824-.3 1.286 0 1.654 1.346 3 3 3s3-1.346 3-3a2.95 2.95 0 00-.301-1.285l6.117-6.116A6.957 6.957 0 0055 14.921v18.245A15.874 15.874 0 0047 31c-4.78 0-9.066 2.118-12 5.453V32h-6v12h2.292a16.042 16.042 0 00-.241 2H3zm40 10a1.001 1.001 0 11-1 1c0-.552.449-1 1-1zm-7-5a1.001 1.001 0 111 1c-.551 0-1-.448-1-1zm-7 9a1.001 1.001 0 01-2 0 1.001 1.001 0 012 0zm18 31c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM33 39.271A15.88 15.88 0 0031.811 42H31v-8h2zm13-6.22v4c-5.046.504-9 4.773-9 9.949 0 1.463.324 2.85.891 4.104l-3.469 2.003A13.881 13.881 0 0133 47c0-7.382 5.747-13.433 13-13.949zM47 61c-4.814 0-9.068-2.443-11.588-6.155l3.483-2.011C40.713 55.352 43.664 57 47 57s6.287-1.648 8.105-4.166l3.483 2.011C56.068 58.557 51.814 61 47 61zm12.578-7.893l-3.469-2.003A9.934 9.934 0 0057 47c0-5.176-3.954-9.446-9-9.949v-4c7.253.516 13 6.567 13 13.949 0 2.191-.52 4.259-1.422 6.107z"
          />
          <path
            d="M47 41c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zM5 12h2v2H5zM9 12h14v2H9zM5 16h2v2H5zM9 16h14v2H9zM5 20h2v2H5zM9 20h14v2H9zM5 24h2v2H5zM9 24h14v2H9zM5 44h6V34H5zm2-8h2v6H7zM13 44h6v-8h-6zm2-6h2v4h-2zM21 44h6V28h-6zm2-14h2v12h-2z"
          />
        </svg>
        <h6 class="text-xl mt-4">3. Get new insights</h6>
        <p class="text-sm text-alternative">
          Get a clear vision what things could harm your business or project,
          and what scenarios are key drivers to sucess for you.
        </p>
      </div>
    </div>
    </div>

    <div id="featureTracker" class="border-2 mt-12 rounded px-8 py-4">
      <h4 class="text-xl">Feature Tracker</h4>
      <p class="text-base text-alternative">
        What features will be released next?
      </p>
      <ul class="mt-8 mb-4">
        <li class="flex items-center justify-between">
          <div class="text">
            <h6 class="mr-4">1. Backend Integration</h6>
            <p class="text-sm text-alternative">
              Release in {{ getDayToRelease("05/20/2021") }} days.
            </p>
          </div>
          <progressBar class="" :loadState="getLoadState('05/19/2021', 40)" />
        </li>
        <li class="flex items-center justify-between mt-4">
          <div class="text">
            <h6 class="mr-4">2. More charting features</h6>
            <p class="text-sm text-alternative">
              Release in {{ getDayToRelease("05/31/2021") }} days.
            </p>
          </div>
          <progressBar class="" :loadState="getLoadState('05/31/2021', 40)" />
        </li>
      </ul>
    </div>
    <div id="featureVoter" class="border-2 rounded px-8 py-4 mt-8">
      <h4 class="text-xl">Vote Features</h4>
      <p class="text-base text-alternative">
        What feature do you want built next?
      </p>
      <ul class="mt-8 mb-4">
        <li class="flex items-center">
          <h6 class="mr-4">1. More colors</h6>
          <button class="bg-focus hover:bg-main text-white rounded px-4 py-2">
            Vote
          </button>
        </li>
        <li class="flex items-center mt-4">
          <h6 class="mr-4">2. Saving all data</h6>
          <button class="bg-focus hover:bg-main text-white rounded px-4 py-2">
            Vote
          </button>
        </li>
        <li class="flex items-center mt-4">
          <input
            type="text"
            class="w-40 border-2 rounded mr-4"
            placeholder="3. New input"
          />
          <button class="bg-focus hover:bg-main text-white rounded px-4 py-2">
            Vote
          </button>
        </li>
      </ul>
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
import store from "../store";
export default {
  components: { progressBar },
  data() {
    return {
      setMouse: false,
      activeHoverTemplate: "smallBusiness",
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
    clickStartWithTemplate() {
      const states = {
        smallBusiness: {
          // put in the state here.
        },
      };
      //store.commit("setCompleteState", states[this.activeHoverTemplate])
      // check login state
      if (store.state.ui.login == true) {
        this.$router.push({ path: "app" });
      } else {
        this.$router.push({ path: "login", query: { sendFrom: "template" } });
      }
    },
  },
};
</script>