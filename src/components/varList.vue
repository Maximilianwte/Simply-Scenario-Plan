<template>
  <div class="draggableList text-2xl">
    <div
      class="drop-zone flex-col bg-gray-100 h-screen w-80"
      @dragover.prevent
      @dragenter.prevent
    >
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
          class="dropZoneTop w-64 py-10 -mt-6 absolute cursor-pointer"
          @drop="onDrop($event, item.displayId)"
          @click.right="setOpen(item.id)"
        />
        <div
          v-if="item.id != openID"
          @click.right="setOpen(item.id)"
          @click.right.prevent
          :id="'list' + item.id"
          class="item w-64 text-center cursor-pointer front rounded-lg bg-gray-300"
          :class="getHeight"
        >
          {{ item.title }}
        </div>
        <div
          v-else
          @click.right="setOpen(item.id)"
          @click.right.prevent
          :id="'list' + item.id"
          class="open item w-64 h-48 bg-gray-300 rounded-lg cursor-pointer"
        >
          <div class="inner mt-3 flex">
            <div id="left" class="flex-col w-1/2 h-48 justify-around">
              <div id="title" class=""><form>
                <input type="text" v-model="item.title"
                    class="w-full cursor-pointer bg-gray-300 text-main text-center" />
                </form></div>
            </div>
            <div id="right" class="h-48 ml-4 w-1/2 flex-col">
              <div id="probTitle">Prob.</div>
              <div id="probability">
                <form>
                <input type="number" v-model="item.prob" min="0" max="100" step="any"
                    class="w-full cursor-pointer bg-gray-300 text-main text-center" />
                </form></div>
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
        class="absolute bottom-0 mb-8 px-6 py-3 rounded-full bg-main text-bg hover:bg-focus"
      >
        +
      </button>
    </div>
  </div>
</template>
<script>
import svgDraw from "../data/svgDraw";
export default {
  data() {
    return {
      openID: null,
      items: [
        {
          id: 0,
          displayId: 0,
          title: "Item A",
          prob: 30,
        },
        {
          id: 1,
          displayId: 1,
          title: "Item B",
          prob: 11.2,
        },
        {
          id: 2,
          displayId: 2,
          title: "Item C",
          prob: 23,
        },
      ],
    };
  },
  computed: {
    getHeight() {
      return this.items.length > 4 ? "py-4 mt-1" : "py-8 mt-3";
    },
  },
  methods: {
    startDrag: (evt, item) => {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
    addItem() {
      this.items.push({
        id: this.items.length + 1,
        title: "New item",
        prob: 0,
      });
      svgDraw.updateAndConnectAll();
    },
    onDrop(evt, dropID) {
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.items.find((item) => item.id == itemID);
      item.displayId = dropID - 0.49;
      console.log(item.displayId)
      this.items.sort((a, b) => a.displayId - b.displayId);
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].displayId = i;
      }
      svgDraw.updateAndConnectAll();
    },
    onDropToList(evt, list) {
      // this is a variation of the onDrop function that changes the list of the item.
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.items.find((item) => item.id == itemID);
      item.list = list;
    },
    setOpen(id) {
      if (this.openID == id) {
        this.openID = null;
      } else {
        this.openID = id;
      }
      return null;
    },
  },
};
</script>