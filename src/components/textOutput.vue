<template>
  <transition-group name="fade" tag="div">
    <div v-for="number in [index]" :key="number" class="textOutput flex text-xl md:w-128 py-12">
      <div class="left w-2/3 mx-4">
        <p>{{ activeText }}</p>
      </div>
      <div class="right w-1/3 mx-4">
        <svg v-if="activeKey == 'maximumConsequence'" class="w-32" version="1.0" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <path
            d="M201 15.5V31h-35v30l17.6.2 17.6.3 1.9 7.3a55.9 55.9 0 0035.2 38.1l2.7 1.1v40.9l-13.7.3-13.8.3-.3 14.7-.3 14.8h86.2l-.3-14.8-.3-14.7-13.7-.3-13.8-.3v-20.5c0-18.6.2-20.5 1.8-21.1a55 55 0 0021.1-13.2 50.5 50.5 0 0015-25.3l1.9-7.3 17.8-.5 17.9-.5.3-14.8.3-14.7H311V0H201v15.5zm80 28.8c0 16.7-1.2 21.6-6.9 27.5a24.3 24.3 0 01-35.4.7c-6.5-6.5-7.7-10.9-7.7-28.2V30h50v14.3zM169.8 245.7l-.3 34.8-69.7.3-69.8.2v201H0v30h512v-30h-32V347H340V211H170l-.2 34.7zM310 361.5V482H200V241h110v120.5zm-140 35V482H60V311h110v85.5zm280 33V482H340V377h110v52.5z" />
          <path d="M229 284v15h19v65h30v-95h-49v15z" />
        </svg>
        <svg v-if="activeKey == 'maximumNegConsequence'" class="w-32" version="1.0" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <path
            d="M244.2 1.6A49.6 49.6 0 00222 14c-4.3 4.2-29.4 42.1-106 160A15103 15103 0 0013.4 333.1 58.8 58.8 0 008 355a50.7 50.7 0 0025.7 42.7c10.2 5.4 14.9 6.3 34 6.3H85v17H72.6c-11.1 0-12.6.2-15.7 2.3-6.2 4.2-7.2 6.7-14.3 39.3-7.3 33.2-7.6 36.8-3.6 42.4 2.6 3.7 9 6.9 13.5 7a20 20 0 0013.9-7.8c1-1.8 4.2-13.7 7-26.5l5.2-23.2h354.8l5.2 23.2c2.8 12.8 6 24.7 7 26.5a20 20 0 0013.9 7.8c4.5-.1 10.9-3.3 13.5-7 4-5.6 3.7-9.2-3.6-42.4-7.1-32.6-8.1-35.1-14.3-39.3-3-2.1-4.6-2.3-14.7-2.3H429v-17h16.3c18 0 22.9-.9 33-6.3A50.7 50.7 0 00504 355c0-6-2.5-16.2-5.4-21.9A15103 15103 0 00396 174C317.3 52.8 294.5 18.3 290 14a49.1 49.1 0 00-45.8-12.4zm20.5 34.6c3 1.8 21.5 30 188.6 287.3l16.9 26-.4 6.2c-.3 5.3-.9 6.8-3.3 9.4-6 6.3 9.3 5.9-210.5 5.9-168.5 0-201.6-.2-204.3-1.4-7-3-11.2-11-9.6-18.4.3-1.8 2.2-5.6 4.1-8.5l100.7-154.9a5821.3 5821.3 0 0199.9-151.4 16.4 16.4 0 0117.9-.2zM144 412.5v8.5h-25v-17h25v8.5zm192 0v8.5H178v-17h158v8.5zm59 0v8.6l-12.7-.3-12.8-.3-.3-6.9c-.2-3.8-.1-7.5.2-8.3.4-1 3.5-1.3 13.1-1.3H395v8.5z" />
          <path
            d="M249.5 94.4c-1.6.8-4.2 2.6-5.6 4.2-2.2 2.4-134.3 205.2-140.2 215.2-4.4 7.4-1.2 18.7 6.5 22.9 3.1 1.7 11.1 1.8 145.8 1.8 160.1 0 146.2.7 151.6-7.5 3-4.4 3.6-11.9 1.4-16.1-2.9-5.5-138.5-213.6-140.9-216.3-4.8-5.3-12.3-7-18.6-4.2zm60.1 128.4l53.1 81.7-53.3.3H202.6l-53.3-.3 53.1-81.7c29.2-45 53.3-81.8 53.6-81.8.3 0 24.4 36.8 53.6 81.8z" />
          <path
            d="M251.8 175.6c-5.9 3.2-6 3.4-4.3 45A527 527 0 00250 260c2.4 4.6 12.4 5.1 16.7.8 2.2-2.2 2.3-3.2 3.7-39.7 1.7-41.4 1.6-42.5-4.3-45.5-3.8-2-10.7-2-14.3 0zM253.4 277.4c-4 1.8-7.4 7.3-7.4 12.1 0 7 6.3 13.5 13.1 13.5 3.4 0 8.8-3 11-6.1 2.6-3.6 2.7-10.7.4-14.3a13.7 13.7 0 00-17.1-5.2z" />
        </svg>
      </div>
    </div>
  </transition-group>
</template>
<script>
  import output_functions from "../data/generate_output";
  import store from "../store";
  export default {
    props: ["variables"],
    data() {
      return {
        outcomeVarIndex: 0,
        index: 0,
        outcomeVarTitle: null,
        activeKey: null,
        activeText: null,
        timer: null,
      };
    },
    computed: {
      getText() {
        return output_functions.buildText2()
      },
      getOutcomeVars() {
        return store.state.outcomeVariables;
      }
    },
    methods: {
      startSlide: function () {
        this.timer = setInterval(this.next, 12000);
      },
      next: function () {
        this.outcomeVarIndex = Math.round(Math.random() * (this.getOutcomeVars.length - 1));
        this.outcomeVarTitle = this.getOutcomeVars[this.outcomeVarIndex].title;
        if (this.getText[this.outcomeVarTitle] == undefined) {
          console.log(this.getText)
        }
        var keys = Object.keys(this.getText[this.outcomeVarTitle])
        this.index = Math.round(Math.random() * (keys.length - 1));
        this.activeKey = keys[this.index];
        this.activeText = this.getText[this.outcomeVarTitle][this.activeKey];
      },
    },
    mounted() {
      this.next();
      this.startSlide();
      console.log(this.getText)
    },
  };
</script>