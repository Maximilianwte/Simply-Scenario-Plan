<template>
  <div id="declareOutcomeVariables" class="w-full flex-col text-3xl">
    <div id="header" class="absolute top-0 left-0 mt-24 ml-12 w-80">
      <h2
        tooltip-content="Outcome variables can be things like revenue amount, employee happiness etc.. everything you want to track."
        tooltip-position="down"
      >
        What Outcome Variables do you want to track?
      </h2>
    </div>
    <div
      class="drop-zone flex-col w-72 h-screen text-2xl"
      @dragover.prevent
      @dragenter.prevent
    >
      <div
        class="dropZoneTop w-72 py-16 cursor-pointer"
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
          class="dropZoneTop w-72 py-10 -mt-6 absolute cursor-pointer"
          @drop="onDrop($event, item.displayId)"
        />
        <div
          @click.right.prevent
          :id="componentId + '#' + item.id"
          class="item w-72 text-center cursor-pointer front rounded-lg bg-gray-300 py-8 mt-3"
          :style="{ backgroundColor: getColor(item.id) }"
          tooltip-content="Rename your outcome variable. What variable do you want to track?"
          tooltip-position="right"
        >
          <div class="item_title">
            <form>
              <input
                type="text"
                @change="sendCacheToStore"
                @focus="cacheValue(item.id, item.title)"
                v-model="item.title"
                class="w-full cursor-pointer backgroundHidden text-main text-center"
                ondblclick="this.setSelectionRange(0, this.value.length)"
              />
            </form>
          </div>
        </div>
      </div>
      <div
        class="dropZoneBottom w-64 py-16 cursor-pointer"
        @drop="onDrop($event, getItems.length)"
      />
      <button
        @click="addItem"
        id="addVariable"
        class="px-6 py-3 absolute bottom-0 mb-8 rounded-full bg-main text-bg hover:bg-focus text-2xl"
        tooltip-content="Add another outcome variable?"
        tooltip-position="up-abs"
      >
        +
      </button>
    </div>
    <button
      id="nextUIStep"
      class="absolute right-0 px-3 py-3 rounded-full text-2xl"
      tooltip-content="Finished adding outcome variables? Go to add scenario variables."
      tooltip-position="left-abs"
      @click="moveUI('inc')"
    >
      <svg
        class="w-10"
        viewBox="-74 0 362 362.667"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M213.668 181.332c0 4.27-1.281 8.535-3.629 11.734l-106.664 160c-3.84 5.762-10.242 9.602-17.707 9.602h-64c-11.734 0-21.336-9.602-21.336-21.336 0-4.266 1.281-8.531 3.629-11.73l98.773-148.27L3.961 33.066C1.613 29.867.332 25.602.332 21.332.332 9.602 9.934 0 21.668 0h64c7.465 0 13.867 3.84 17.707 9.602l106.664 160c2.348 3.199 3.629 7.464 3.629 11.73zm0 0"
        />
      </svg>
    </button>
  </div>
</template>
<script>
import store from "../store";
export default {
  data() {
    return {
      componentId: "declareOutcomeVariables",
      colors: ["#FFBCB5", "#85E0FF", "#91DBBC", "#F2E5AA", "#F59D7D"],
      cachedId: null,
      cachedTitle: null,
    };
  },
  computed: {
    getItems() {
      return store.state.outcomeVariables;
    },
  },
  methods: {
    // ---- Variable Operations ----

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
    cacheValue(id, title) {
      this.cachedId = id;
      this.cachedTitle = title;
    },
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
      this.getItems.sort((a, b) => a.displayId - b.displayId);
      for (var i = 0; i < this.getItems.length; i++) {
        this.getItems[i].displayId = i;
      }
    },
    // ---- Store & Return cache methods ----

    moveUI(val) {
      store.commit("moveUI", val);
    },
    sendCacheToStore() {
      var items = JSON.parse(JSON.stringify(this.getItems));
      if (this.cachedId != null) {
        items[this.cachedId].title = this.cachedTitle;
        this.cachedId = null;
        this.cachedTitle = null;
      }
      store.commit("addReturnValue", {
        id: this.componentId,
        value: items,
      });
    },
    addItem() {
      if (store.state.outcomeVariables.length < 5) {
        this.sendCacheToStore();
        store.commit("addOutcomeVariable", {
          id: this.getItems.length,
          displayId: this.getItems.length,
          title: "New Variable",
          top: 6 + 10 * this.getItems.length,
          left: 4,
          cachePos: {
            top: null,
            left: null,
          },
        });
      }
    },
  },
};
</script>