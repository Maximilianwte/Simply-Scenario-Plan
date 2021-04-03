<template>
  <div :id="componentId" class="w-80 flex-col text-2xl">
    <div v-for="item in items" :key="item.id">
      <div
        v-if="item.id != openID"
        @click.right="setOpen(item.id)"
        draggable
        @click.right.prevent
        @dragover.prevent
        @dragenter.prevent
        @drag="onDrag(componentId + item.id)"
        @mouseenter="onDrag(componentId + item.id)"
        class="rect absolute text-2xl text-bg w-64 py-12 rounded-lg cursor-pointer flex justify-center"
        :style="{
          backgroundColor: getColor(item.id),
          top: item.top + 'rem',
          left: item.left + 'rem',
        }"
        :id="componentId + item.id"
      >
        {{ item.title }}
      </div>
      <div
        v-else
        class="cardOpen absolute w-64 h-48 rounded-lg cursor-pointer"
        draggable
        @click.right="setOpen(null)"
        @click.right.prevent
        @dragover.prevent
        @dragenter.prevent
        @drag="onDrag(componentId + item.id)"
        @mouseenter="onDrag(componentId + item.id)"
        :style="{
          backgroundColor: getColor(item.id),
          top: item.top + 'rem',
          left: item.left + 'rem',
        }"
        :id="componentId + item.id"
      >
        <div class="inner flex">
          <div id="left" class="flex-col w-1/2 h-48 justify-around">
            <div id="title" class="">
              <form>
                <input
                  type="text"
                  v-model="item.title"
                  @change="sendToStore"
                  class="w-full cursor-pointer text-main text-center"
                />
              </form>
            </div>
          </div>
          <div id="right" class="h-48 ml-4 w-1/2 flex-col"></div>
        </div>
      </div>
    </div>
    <button
      @click="addItem"
      @click.right.prevent
      class="absolute bottom-0 mb-8 px-6 py-3 rounded-full bg-main text-bg hover:bg-focus"
    >
      +
    </button>
  </div>
</template>
<script>
import store from "../store";
import svgDraw from "../data/svgDraw";
export default {
  props: ['id'],
  data() {
    return {
      componentId: this.id,
      openID: null,
      colors: ["#FFBCB5", "#85E0FF", "#91DBBC", "#F2E5AA", "#F59D7D"],
      items: store.state.outcomeVariables,
    };
  },
  methods: {
    onDrag(id) {
      const vm = this;
      const elmnt = document.getElementById(id);
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      this.items[id.slice(this.componentId.length)].cachePos = {
        top: elmnt.style.top,
        left: elmnt.style.left
      }
      document.getElementById(elmnt.id).onmousedown = dragMouseDown;

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      }
      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        /* vm.moveElementsAroundAway(id); */
        vm.items[id.slice(vm.componentId.length)].top = elmnt.style.top;
        vm.items[id.slice(vm.componentId.length)].left = elmnt.style.left;
        vm.sendToStore();
        vm.checkOverlayed(id);
        svgDraw.updateAndConnectAll();
      }
    },
    moveElementsAroundAway(id) {
      /* const elmnt = document.getElementById(id);
      const dim = {
        top: parseInt(elmnt.offsetTop),
        left: parseInt(elmnt.offsetLeft),
      };
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id != id) {
          var elmnt2 = document.getElementById(this.items[i].id);
          const dim2 = {
            top: parseInt(elmnt2.offsetTop),
            left: parseInt(elmnt2.offsetLeft),
          };
          if (dim.top - dim2.top >= -100) {
            console.log(dim.top - dim2.top);
            if (dim2.top < dim.top) {
              elmnt2.style.top = dim2.top - 100 + "px";
            } else {
              elmnt2.style.top = dim2.top + 100 + "px";
            }
          }
        }
      } */
    },
    checkOverlayed(id) {
      const elmnt = document.getElementById(id);
      const otherElmnts = document.getElementsByClassName("item");
      for (var i = 0; i < otherElmnts.length; i++) {
        var otherElmntCenter = {
          x: otherElmnts[i].offsetTop + otherElmnts[i].offsetHeight / 2,
          y: otherElmnts[i].offsetLeft + otherElmnts[i].offsetWidth / 2,
        };
        if (id != otherElmnts[i].id) {
          if (
            otherElmntCenter.x > elmnt.offsetTop &&
            otherElmntCenter.x < elmnt.offsetTop + elmnt.offsetHeight &&
            otherElmntCenter.y > elmnt.offsetLeft &&
            otherElmntCenter.y < elmnt.offsetLeft + elmnt.offsetWidth
          ) {
            store.commit("addConnection", [elmnt.id, otherElmnts[i].id]);
            elmnt.style.left = this.items[id.slice(this.componentId.length)].cachePos.left;
            elmnt.style.top = this.items[id.slice(this.componentId.length)].cachePos.top;
          }
        }
      }
    },
    getColor(id) {
      const nCol = this.colors.length;
      const colValue =
        id > nCol - 1 ? Math.round(Math.random() * (nCol - 1)) : id;
      return this.colors[colValue];
    },
    addItem() {
      store.commit("addReturnValue", {
        id: this.componentId,
        value: this.items
      })
      store.commit("addOutcomeVariable", {
        id: this.items.length,
        title: "New item",
        prob: 0,
        top: 6 + 10 * this.items.length,
        left: 4,
        cachePos: {
            top: null,
            left: null
          }
      })
    },
    sendToStore() {
      store.commit("addReturnValue", {
        id: this.componentId,
        value: this.items
      })
    },
    setOpen(id) {
      if (this.openID == id) {
        this.openID = null;
      } else {
        this.openID = id;
      }
      return null;
    },
  }
};
</script>