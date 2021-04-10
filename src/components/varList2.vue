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
        v-for="item in getItems"
        :key="item.displayId"
        :id="componentId + '#' + item.id"
        @click.right.prevent
        @click.right="setOpen(item.id)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          v-if="item.id != openID"
          class="item w-64 text-center cursor-pointer front rounded-lg"
          :class="getHeight"
          :style="{ backgroundColor: getColor(item.id) }"
          @drag="startDrag(componentId + '#' + item.id)"
          draggable
        >
          {{ item.title }}
        </div>
        <div
          v-else
          class="open item w-64 h-48 relative rounded-lg cursor-pointer text-xl"
          :style="{ backgroundColor: getColor(item.id) }"
        >
        <div class="floatingMenu absolute text-sm right-0 top-0 mr-2 mt-2">
          <button id="deleteVar" @click="deleteItem(item.id)" class="px-3 py-1 rounded-full bg-main text-bg hover:bg-focus">x</button>
        </div>
          <div class="inner mt-3">
            <div id="top" class="flex-col w-full py-1 px-2 justify-around">
              <div id="title" class="">
                <form>
                  <label class="text-sm">Variable Name:</label>
                  <input
                    type="text"
                    v-model="item.title"
                    @change="sendCacheToStore"
                    @focus="cacheValues(item)"
                    class="w-full cursor-pointer text-main pb-1 border-b-2 border-alternative"
                    ondblclick="this.setSelectionRange(0, this.value.length)"
                  />
                </form>
              </div>
            </div>
            <div id="below" class="flex-col w-full py-1 px-2 justify-around">
              <div class="w-full" id="probability">
                <form>
                  <label class="mr-2">Probability:</label>
                  <input
                    type="number"
                    v-model="item.prob"
                    @change="sendCacheToStore"
                    @focus="cacheValues(item)"
                    min="0"
                    max="100"
                    step="any"
                    class="cursor-pointer text-main w-16"
                    ondblclick="this.setSelectionRange(0, this.value.length)"
                  />
                  <label class="ml-1">%</label>
                </form>
              </div>
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
import store from "../store";
import svgDraw from "../data/svgDraw";
export default {
  props: ["id", "idList"],
  data() {
    return {
      componentId: this.id,
      openID: null,
      colors: ["#FFBCB5", "#85E0FF", "#91DBBC", "#F2E5AA", "#F59D7D"],
      cachedValue : {},
    };
  },
  computed: {
    getHeight() {
      return this.getItems.length > 4 ? "py-4 mt-1" : "py-8 mt-3";
    },
    getItems() {
      return store.state.scenarioVariables[this.idList];
    },
    getAllLists() {
      return store.state.scenarioVariables;
    },
  },
  methods: {
    // ---- Drag methods ----
    startDrag(id) {
      const vm = this;
      const elmnt = document.getElementById(id);
      document.onmousemove = elementDrag;
      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        var posX = e.pageX;
        var posY = e.pageY;
        /* console.log("mouseX: " + posX)
        console.log("mouseY: " + posY) */
        document.onmouseup = null;
        document.onmousemove = null;

        // --- If dropped on another list check if you need connection ---

      if (vm.getAllLists.length > 1) {
        for (var iterLists in vm.getAllLists) {
          if (iterLists != vm.idList) {
            for (var iterItems in vm.getAllLists[iterLists]) {
              var elmnt = document.getElementById(
                "scenarioVariables_" + (parseInt(iterLists)+1) + "#" + iterItems
              );
              /* console.log("scenarioVariables_" + (parseInt(iterLists)+1) + "#" + iterItems)
              console.log("elX: " + elmnt.offsetLeft)
              console.log("elY: " + elmnt.offsetTop) */
              if (
                posX > elmnt.offsetLeft &&
                posX < elmnt.offsetLeft + elmnt.offsetWidth &&
                posY > elmnt.offsetTop &&
                posY < elmnt.offsetTop + elmnt.offsetHeight
              ) {
                store.commit("addConnection", [id, elmnt.id]);
              }
            }
          }
        }
      }
      }
    },
    onDrop(evt, dropID) {
      const listID = evt.dataTransfer.getData("listID");
      const item = this.getItems.find((item) => item.id == listID);
      // --- Sort own list if dragged ---

      item.displayId = dropID - 0.49;
      this.getItems.sort((a, b) => a.displayId - b.displayId);
      for (var i = 0; i < this.getItems.length; i++) {
        this.getItems[i].displayId = i;
      }
    },
    onDropToList(evt, list) {
      // this is a variation of the onDrop function that changes the list of the item.
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.getItems.find((item) => item.id == itemID);
      item.list = list;
    },
    // ---- Variable Operations ----

    sendCacheToStore() {
      var items = [...this.getItems];
      if (this.cachedValue != {}) {
        console.log(this.cachedValue);
        items[this.cachedValue.id] = this.cachedValue;
        this.cachedValue = {};
        console.log(items);
      }
      store.commit("addReturnValue", {
        id: "scenarioVariables",
        idList: this.idList,
        value: items,
      });
    },
    addItem() {
      this.sendCacheToStore();
      store.commit("addScenarioVariable", {
        listID: this.idList,
        value: {
          id: this.getItems[this.getItems.length-1].id + 1,
          title: "New Scenario",
          prob: 0,
        },
      });
      svgDraw.updateAndConnectAll();
    },
    deleteItem(id) {
      this.sendCacheToStore();
      store.commit("deleteScenarioVariable", {
        listID: this.idList,
        id: id,
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
    cacheValues(item) {
      Object.assign(this.cachedValue, item);
    }
  },
};
</script>