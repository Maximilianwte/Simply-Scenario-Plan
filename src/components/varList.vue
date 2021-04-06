<template>
  <div
    :id="componentId"
    class="draggableList text-2xl h-screen w-80 pt-6 border-l-4 border-r-4 border-dashed"
  >
    <div class="drop-zone flex-col" @dragover.prevent @dragenter.prevent>
      <h3 class="text-lg text-gray-500">
        Scenario Layer {{ this.idList + 1 }}
      </h3>
      <div
        class="dropZoneTop w-64 py-16 cursor-pointer"
        @drop="onDrop($event, 0)"
      />
      <div
        v-for="item in getItems"
        :key="item.displayId"
        @dragstart="startDrag($event, item)"
        draggable
        @dragover.prevent
        @dragenter.prevent
        @click.right.prevent
      >
        <div
          class="dropZoneTop w-64 py-10 -mt-6 absolute cursor-pointer"
          @drop="onDrop($event, item.displayId)"
          @click.right="setOpen(item.id)"
        />
        <div
          v-if="item.id != openID"
          @click.right="setOpen(item.id)"
          @click.right.prevent
          :id="componentId + '#' + item.id"
          class="item w-64 text-center cursor-pointer front rounded-lg"
          :class="getHeight"
          :style="{ backgroundColor: getColor(item.id) }"
        >
          {{ item.title }}
        </div>
        <div
          v-else
          @click.right="setOpen(item.id)"
          @click.right.prevent
          :id="componentId + '#' + item.id"
          class="open item w-64 h-48 rounded-lg cursor-pointer"
          :style="{ backgroundColor: getColor(item.id) }"
        >
          <div class="inner mt-3 flex">
            <div id="left" class="flex-col w-1/2 h-48 justify-around">
              <div id="title" class="">
                <form>
                  <input
                    type="text"
                    v-model="item.title"
                    @change="sendToStore"
                    class="w-full cursor-pointer text-main text-center"
                    ondblclick="this.setSelectionRange(0, this.value.length)"
                  />
                </form>
              </div>
            </div>
            <div id="right" class="h-48 ml-4 w-1/2 flex-col">
              <div id="probTitle">Prob.</div>
              <div id="probability">
                <form>
                  <input
                    type="number"
                    v-model="item.prob"
                    @change="sendToStore"
                    min="0"
                    max="100"
                    step="any"
                    class="w-full cursor-pointer text-main text-center"
                    ondblclick="this.setSelectionRange(0, this.value.length)"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="dropZoneBottom w-64 py-16 cursor-pointer"
        @drop="onDrop($event, getItems.length)"
      />
      <button
        @click="addItem"
        class="absolute bottom-0 mb-8 px-6 py-3 rounded-full bg-main text-bg hover:bg-focus"
      >
        +
      </button>
    </div>
  </div>
</template>
<script>
import store from "../store";
import svgDraw from "../data/svgDraw";
export default {
  props: ["id", "idList"],
  data() {
    return {
      componentId: this.id,
      openID: null,
      colors: ["#FFBCB5", "#85E0FF", "#91DBBC", "#F2E5AA", "#F59D7D"],
    };
  },
  computed: {
    getHeight() {
      return this.getItems.length > 4 ? "py-4 mt-1" : "py-8 mt-3";
    },
    getItems() {
      return store.state.scenarioVariables[this.idList];
    },
  },
  methods: {
    // ---- Drag methods ----

    startDrag: (evt, item) => {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
    onDrop(evt, dropID) {
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.getItems.find((item) => item.id == itemID);
      item.displayId = dropID - 0.49;
      console.log(item.displayId);
      this.getItems.sort((a, b) => a.displayId - b.displayId);
      for (var i = 0; i < this.getItems.length; i++) {
        this.getItems[i].displayId = i;
      }
      svgDraw.updateAndConnectAll();
    },
    onDropToList(evt, list) {
      // this is a variation of the onDrop function that changes the list of the item.
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.getItems.find((item) => item.id == itemID);
      item.list = list;
    },
    // ---- Variable Operations ----

    sendToStore() {
      store.commit("addReturnValue", {
        id: this.componentId,
        value: this.items,
      });
    },
    addItem() {
      store.commit("addScenarioVariable", {
        listID: this.idList,
        value: {
          id: this.getItems.length + 1,
          title: "New Scenario",
          prob: 0,
        },
      });
      svgDraw.updateAndConnectAll();
    },
    setOpen(id) {
      if (this.openID == id) {
        this.openID = null;
      } else {
        this.openID = id;
      }
      return null;
    },
    getColor(id) {
      if (store.state.ui.colorful) {
        const nCol = this.colors.length;
        const colValue =
          id > nCol - 1 ? Math.round(Math.random() * (nCol - 1)) : id;
        return this.colors[colValue];
      } else {
        return "#e2e8f0";
      }
    },
  },
};
</script>