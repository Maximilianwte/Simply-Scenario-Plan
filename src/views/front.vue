<template>
  <div id="front" class="w-full">
    <v-stage class="absolute z-0" :config="configKonva">
      <v-layer>
        <vRect v-for="item in moreDragRects" :key="item.index" :x="250" :y="125+280*index" :color="'#FADA89'" :dataProps="vRect1"/>
        <vRect v-for="item in moreListRects" :key="item.index" :x="250" :y="125+130*index" :color="colors[index]" :dataProps="vRect1" />
        <vRect :x="250" :y="125" :color="'#FADA89'" :dataProps="vRect1"/>
      </v-layer>
    </v-stage>
    <button class="x-4 y-4 absolute bottom-0 mb-12 ml-12 cursor-pointer z-30 px-6 py-3 text-xl bg-main text-bg rounded-full"
      @click="addListRect">+</button>
  </div>
</template>

<script>
  import vRect from "../components/vRect";
  const width = window.innerWidth;
  const height = window.innerHeight;
  export default {
    components: {vRect},
    data() {
      return {
        configKonva: {
          width: width,
          height: height
        },
        moreDragRects: [],
        moreListRects: [],
        colors: ["#FADA89", "#70C1FF", "#FF5964", "#F7DCF9"],
        index: 0,
        vRect1: {
          title: "Employee happiness",
          open: false
        }
      }
    },
    methods: {
      addDragRect() {
        var config = {
          x: 250 + this.index * 30,
          y: 125 + this.index * 5,
          width: 300,
          height: 250,
          fill: this.colors[this.index],
          cornerRadius: 12,
          draggable: true
        };
        this.moreDragRects.push({
          index: this.index,
          config: config
        });
        this.index < 3 ? this.index++ : this.index = 0;
      },
      addListRect() {
        var config = {
          x: 150,
          y: 50 + this.index * 270,
          width: 300,
          height: 250,
          fill: this.colors[this.index],
          cornerRadius: 12,
        };
        this.moreListRects.push({
          index: this.index,
          config: config
        });
        this.index < 3 ? this.index++ : this.index = 0;
      }
    },
    mounted() {

    },
  }
</script>