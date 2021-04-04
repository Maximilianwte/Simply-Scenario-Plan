<template>
  <div id="declareOutcomeVariables" class="w-full flex-col text-3xl">
    <div id="header" class="absolute top-0 left-0 mt-24 ml-12 w-80">
      Which outcome variables do you want to declare?
    </div>
    <div class="drop-zone flex-col w-80" @dragover.prevent @dragenter.prevent>
      <div
        class="dropZoneTop w-64 py-16 cursor-pointer"
        @drop="onDrop($event, 0)"
      />
      <div
        v-for="item in items"
        :key="item.displayId"
        @dragstart="startDrag($event, item)"
        draggable
        @dragover.prevent
        @dragenter.prevent
        @click.right.prevent
      >
        <div
          class="dropZoneTop w-80 py-10 -mt-6 absolute cursor-pointer"
          @drop="onDrop($event, item.displayId)"
          @click.right="setOpen(item.id)"
        />
        <div
          v-if="item.id != openID"
          @click.right="setOpen(item.id)"
          @click.right.prevent
          :id="componentId + '#' + item.id"
          class="item w-80 text-center cursor-pointer front rounded-lg bg-gray-300 py-8 mt-3"
          :style="{backgroundColor: getColor(item.id)}"
          tooltip-content="content"
          tooltip-position="up"
        >
          {{ item.title }}
        </div>
        <div
          v-else
          @click.right="setOpen(item.id)"
          @click.right.prevent
          :id="componentId + '#' + item.id"
          class="open item w-80 h-48 rounded-lg cursor-pointer"
          :style="{backgroundColor: getColor(item.id)}"
        >
          <div class="inner mt-3 flex">
            <div id="left" class="flex-col w-1/2 h-48 justify-around">
              <div id="title" class="">
                <form>
                  <input
                    type="text"
                    v-model="item.title"
                    class="w-full cursor-pointer backgroundHidden text-main text-center"
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
                    min="0"
                    max="100"
                    step="any"
                    class="w-full cursor-pointer backgroundHidden text-main text-center"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="dropZoneBottom w-64 py-16 cursor-pointer"
        @drop="onDrop($event, items.length)"
      />
      <button
        @click="addItem"
        class="absolute bottom-0 mb-8 px-6 py-3 rounded-full bg-main text-bg hover:bg-focus text-2xl"
      >
        +
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      openID: null,
      componentId: "declareOutcomeVariables",
      colors: ["#FFBCB5", "#85E0FF", "#91DBBC", "#F2E5AA", "#F59D7D"],
      items: [
        {
          id: 0,
          displayId: 0,
          title: "New Variable",
          prob: 30,
        },
      ],
    };
  },
  methods: {
    // ---- Variable Operations ----

    setOpen(id) {
      if (this.openID == id) {
        this.openID = null;
      } else {
        this.openID = id;
      }
      return null;
    },
    addItem() {
      this.items.push({
        id: this.items.length + 1,
        title: "New Variable",
        prob: 0,
      })
    },
    getColor(id) {
      const nCol = this.colors.length;
      const colValue =
        id > nCol - 1 ? Math.round(Math.random() * (nCol - 1)) : id;
      return this.colors[colValue];
    },
    // ---- Drag methods ----
    
    startDrag: (evt, item) => {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
    onDrop(evt, dropID) {
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.items.find((item) => item.id == itemID);
      item.displayId = dropID - 0.49;
      this.items.sort((a, b) => a.displayId - b.displayId);
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].displayId = i;
      }
    },
  },
};
</script>