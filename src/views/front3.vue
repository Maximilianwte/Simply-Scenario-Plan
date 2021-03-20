<template>
  <div class="list text-2xl">
    <div
      class="drop-zone flex-col bg-gray-100 h-screen w-80"
      @drop="onDrop($event, items.length)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div
        v-for="item in items"
        :key="item.id"
        @dragstart="startDrag($event, item)"
        draggable
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          class="dropZoneTop w-64 py-10 -mt-6 absolute cursor-pointer"
          @drop="onDrop($event, item.id)"
        ></div>
        <div
          v-if="item.id != openID"
          @click="setOpen(item.id)"
          class="item w-64 text-center cursor-pointer front rounded-lg bg-gray-300"
          :class="getHeight"
        >
          {{ item.title }}
        </div>
        <div
          v-else
          class="open w-64 h-48 bg-gray-300 rounded-lg cursor-pointer"
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
                <input type="text" v-model="item.prob"
                    class="w-full cursor-pointer bg-gray-300 text-main text-center" />
                </form></div>
              </div>
          </div>
        </div>
      </div>
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
export default {
  data() {
    return {
      openID: 2,
      items: [
        {
          id: 0,
          title: "Item A",
          prob: 0.3,
        },
        {
          id: 1,
          title: "Item B",
          prob: 0.112,
        },
        {
          id: 2,
          title: "Item C",
          prob: 0.23,
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
    },
    onDrop(evt, dropID) {
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.items.find((item) => item.id == itemID);
      item.id = dropID - 0.49;
      this.items.sort((a, b) => a.id - b.id);
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].id = i;
      }
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