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
        class="text-dark"
      >
        <div
          v-if="item.id != openID"
          class="item w-64 text-center cursor-pointer front rounded"
          :class="getHeight"
          :style="{ backgroundColor: getColorMode(item.color) }"
          @dragend="startDrag(componentId + '#' + item.id, item.id)"
          draggable
        >
          {{ item.title }}
        </div>
        <div
          v-else
          class="open item w-64 h-48 relative rounded cursor-pointer text-xl"
          :style="{ backgroundColor: getColorMode(item.color) }"
        >
          <div class="floatingMenu absolute text-sm right-0 top-0 mr-2 mt-2">
            <button
              id="setImpact"
              @click="openSetImpactMenu(item.id)"
              class="w-6 h-6 mx-1 rounded-full bg-main text-bg hover:bg-focus"
            >
              r
            </button>
            <button
              id="deleteVar"
              @click="deleteItem(item.id)"
              class="w-6 h-6 mx-1 rounded-full bg-main text-bg hover:bg-focus"
            >
              X
            </button>
          </div>
          <div class="inner mt-3">
            <div id="top" class="flex-col w-full py-1 px-2 justify-around">
              <div id="title" class="">
                <form>
                  <label class="text-sm">Variable Name:</label>
                  <input
                    type="text"
                    v-model="item.title"
                    @change="changeVar(item.id, 'title')"
                    @focus="cacheValues(item.id, 'title')"
                    class="w-full cursor-pointer text-dark pb-1 border-b-2 border-alternative"
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
                    @change="changeVar(item.id, 'prob')"
                    @focus="cacheValues(item.id, 'prob')"
                    min="0"
                    max="100"
                    step="any"
                    class="cursor-pointer text-dark w-16"
                    ondblclick="this.setSelectionRange(0, this.value.length)"
                  />
                  <label class="ml-1">%</label>
                </form>
              </div>
            </div>
          </div>
          <div
            v-if="item.impact[0] == 0 || IDsetImpact == item.id"
            id="changeVarFloating"
            class="absolute flex"
          >
            <div id="arrow" class="flex-col">
              <svg
                class="w-10"
                style="transform: rotateZ(270deg)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 404.308 404.309"
              >
                <path d="M0 101.08h404.308L202.151 303.229 0 101.08z" />
              </svg>
            </div>
            <div
              id="outcomeVarMenu"
              class="bg-gray-100 px-2 py-4 rounded text-base"
            >
              <div id="headerRow" class="flex ml-10 text-sm">
                <p class="text-dark w-16 ml-4 text-right">Amount</p>
                <p class="text-dark w-10 ml-2 text-right">Unit</p>
              </div>
              <div
                v-for="outcomevar in getOutcomeVars"
                :key="outcomevar.displayId"
                :title="outcomevar.title"
                class="variableItem py-1 px-3 rounded-full mt-1 flex"
              >
                <div
                  class="w-10 h-10 rounded-full flex-col"
                  :style="{ backgroundColor: getColorMode(outcomevar.color) }"
                >
                  <h6>{{ outcomevar.title[0] }}</h6>
                </div>
                <input
                  type="number"
                  v-model="item.impact[outcomevar.id]"
                  @focus="cacheValues(item.id, 'impact', outcomevar.id)"
                  @change="changeVar(item.id, 'impact', outcomevar.id)"
                  step="any"
                  class="cursor-pointer text-dark w-16 ml-2 border-2 border-gray-200 text-right"
                  ondblclick="this.setSelectionRange(0, this.value.length)"
                />
                <form>
                  <select
                    v-model="item.unit[outcomevar.id]"
                    name="unit"
                    class="cursor-pointer text-dark w-12 h-10 ml-2 border-2 border-gray-200 text-right"
                    @focus="cacheValues(item.id, 'unit', outcomevar.id)"
                    @change="changeVar(item.id, 'unit', outcomevar.id)"
                  >
                    <option value=""></option>
                    <option value="k">k</option>
                    <option value="m">m</option>
                    <option value="b">b</option>
                    <option value="%">%</option>
                  </select>
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
      IDsetImpact: null,
      cachedValue: null,
    };
  },
  watch: {
    getConnections: function () {
      svgDraw.updateAndConnectAll();
    },
  },
  computed: {
    getConnections() {
      return store.state.connectedShapes;
    },
    getHeight() {
      return this.getItems.length > 4 ? "py-4 mt-1" : "py-8 mt-3";
    },
    getItems() {
      return store.state.scenarioVariables[this.idList];
    },
    getAllLists() {
      return store.state.scenarioVariables;
    },
    getOutcomeVars() {
      return store.state.outcomeVariables;
    },
  },
  methods: {
    // ---- Drag methods ----

    /* getMousePos(event) {
      const doc = document.querySelector("body");
      var rect = doc.getBoundingClientRect();
      var x = event.screenX - rect.left;
      var y = event.screenY - rect.top;
      return {x: x, y: y}
    }, */
    startDrag(divId) {
      const vm = this;
      document.onmousemove = elementDrag;
      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        var posX = e.pageX;
        var posY = e.pageY;
        document.onmouseup = null;
        document.onmousemove = null;

        // --- Check if dragged around in own list ---
        /* console.log("Var is:", divId)
        for (var iterItems in vm.getAllLists[vm.idList]) {
                var elmnt = document.getElementById(
                  "scenarioVariables_" +
                    (vm.idList + 1) +
                    "#" +
                    iterItems
                );
                var elmntID = elmnt.id.substring(elmnt.id.indexOf("#") + 1);
                console.log("mouse:", posY)
                console.log("el oT", elmnt.offsetTop)
                console.log("el oH", (elmnt.offsetHeight*0.25))
                console.log("el cm", (elmnt.offsetTop - (elmnt.offsetHeight*0.25)))
                if (
                  posY > (elmnt.offsetTop + (elmnt.offsetHeight/2)) && posY < (elmnt.offsetTop + (elmnt.offsetHeight*1.25))
                ) {
                  vm.getItems[id].displayId = vm.getItems[elmntID].displayId + .49;
                  console.log("below " + vm.getItems[elmntID].title)
                  break;
                }
                else if (posY < (elmnt.offsetTop + (elmnt.offsetHeight/2)) && posY > (elmnt.offsetTop - (elmnt.offsetHeight*0.25))) {
                  vm.getItems[id].displayId = vm.getItems[elmntID].displayId - .49;
                  console.log("above " + vm.getItems[elmntID].title)
                  break;
                }
              }

        vm.getItems.sort((a, b) => a.displayId - b.displayId);
        for (var i = 0; i < vm.getItems.length; i++) {
          vm.getItems[i].displayId = i;
        } */

        // --- If dropped on another list check if you need connection ---

        if (vm.getAllLists.length > 1) {
          for (var iterLists in vm.getAllLists) {
            if (iterLists != vm.idList) {
              for (var iterItems in vm.getAllLists[iterLists]) {
                var elmnt = document.getElementById(
                  "scenarioVariables_" +
                    (parseInt(iterLists) + 1) +
                    "#" +
                    iterItems
                );
                if (
                  posX > elmnt.offsetLeft &&
                  posX < elmnt.offsetLeft + elmnt.offsetWidth &&
                  posY > elmnt.offsetTop &&
                  posY < elmnt.offsetTop + elmnt.offsetHeight
                ) {
                  var found = false;
                  // If connections already exists, delete the connection
                  store.state.connectedShapes.forEach((connectionList, index) => {
                    if (connectionList.includes(divId) && connectionList.includes(elmnt.id)) {
                      store.commit("deleteConnection", index)
                      found = true;
                    }
                  })
                  // If the connection couldn't be found, add it
                  found == false ? store.commit("addConnection", [divId, elmnt.id]) : null;
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

    addItem() {
      var item = {
        id: this.getItems[this.getItems.length - 1].id + 1,
        title: "New Scenario",
        prob: 0,
        color: this.getColor(),
        impact: [0],
        unit: [""]
      };
      store.commit("addScenarioVariable", {
        listID: this.idList,
        value: item,
      });
      store.commit("addReturnValue2", {
        type: "addScenarioVariable",
        path: this.idList,
        valAfter: item,
      });
    },
    deleteItem(id) {
      store.commit("addReturnValue2", {
        type: "deleteScenarioVariable",
        path: this.idList,
        valBefore: this.getItems[id],
      });
      store.commit("deleteScenarioVariable", {
        listID: this.idList,
        id: id,
      });
    },
    changeVar(id, type, outcomevarId) {
      if (type == "impact" || type == "unit") {
        var valAfter = this.getItems[id][type][outcomevarId];
      } else {
        valAfter = this.getItems[id][type];
      }
      store.commit("addReturnValue2", {
        type: "changeScenarioVariable",
        path: [this.idList, id, type, outcomevarId],
        valBefore: this.cachedValue,
        valAfter: valAfter,
      });
      this.cachedValue = null;
    },
    setOpen(id) {
      if (this.openID == id) {
        this.openID = null;
      } else {
        this.openID = id;
      }
      return null;
    },
    openSetImpactMenu(id) {
      if (this.IDsetImpact == id) {
        this.IDsetImpact = null;
      } else {
        this.IDsetImpact = id;
      }
      return null;
    },
    cacheValues(id, type, outcomevarId) {
      if (type == "impact" || type == "unit") {
        this.cachedValue = this.getItems[id][type][outcomevarId];
      } else {
        this.cachedValue = this.getItems[id][type];
      }
    },
    getColor() {
      const colors = ["#FFBCB5", "#85E0FF", "#91DBBC", "#F2E5AA", "#F59D7D"];
      const nCol = colors.length;
      const colValue = Math.round(Math.random() * (nCol - 1));
      return colors[colValue];
    },
    getColorMode(color) {
      return store.state.ui.colorful ? color : "#e2e8f0";
    },
  },
};
</script>