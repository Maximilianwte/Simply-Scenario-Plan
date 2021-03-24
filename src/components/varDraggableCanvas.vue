<template>
  <div class="w-80 flex-col text-2xl">
    <div v-for="item in items" :key="item.id" class="cards">
      <div
        v-if="item.id != openID"
        @click.right="setOpen(item.id)"
        draggable
        @click.right.prevent
        @dragover.prevent
        @dragenter.prevent
        @dragend="moveAway(item.id)"
        @drag="onDrag(item.id)"
        class="rect absolute text-2xl text-bg w-64 py-12 rounded-lg cursor-pointer flex justify-center"
        :style="{
          backgroundColor: getColor(item.id),
          top: item.top + 'px',
        }"
        style="left: 4rem"
        :id="item.id"
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
        @drag="onDrag(item.id)"
        :style="{
          backgroundColor: getColor(item.id),
          top: item.top + 'px',
        }"
        style="left: 4rem"
        :id="item.id"
      >
        <div class="inner mt-3 flex">
          <div id="left" class="flex-col w-1/2 h-48 justify-around">
            <div id="title" class="">
              <form>
                <input
                  type="text"
                  v-model="item.title"
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
export default {
  data() {
    return {
      openID: null,
      colors: ["#FFBCB5", "#85E0FF", "#91DBBC", "#F2E5AA", "#F59D7D"],
      items: [
        {
          id: 0,
          title: "Item A",
          top: 100,
        },
        {
          id: 1,
          title: "Item B",
          top: 250,
        },
      ],
    };
  },
  methods: {
    onDrag(id) {
      const vm = this;
      const elmnt = document.getElementById(id);
      console.log("triggered");
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

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
        vm.moveAway(id);
      }
    },
    moveAway(id) {
      const elmnt = document.getElementById(id);
      const dim = {
        top: parseInt(elmnt.style.top),
        left: parseInt(elmnt.style.left),
      };
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id != id) {
          var elmnt2 = document.getElementById(this.items[i].id);
          const dim2 = {
            top: parseInt(elmnt2.style.top),
            left: parseInt(elmnt2.style.left),
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
      }
    },
    buildLine() {
      console.log("line built");
      var div1 = document.getElementById("0");
      var div2 = document.getElementById("1");
      connect(div1, div2, "#2d2d2d", 3);

      function connect(div1, div2, color, thickness) {
        var off1 = getOffset(div1);
        var off2 = getOffset(div2);
        // bottom right
        var x1 = off1.left + off1.width;
        var y1 = off1.top + off1.height;
        // top right
        var x2 = off2.left;
        var y2 = off2.top;
        // distance
        var length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        // center
        var cx = (x1 + x2) / 2 - length / 2;
        var cy = (y1 + y2) / 2 - thickness / 2;
        // angle
        var angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
        // make hr
        var htmlLine =
          "<div style='padding:0px; margin:0px; height:" +
          thickness +
          "px; background-color:" +
          color +
          "; line-height:1px; position:absolute; left:" +
          cx +
          "px; top:" +
          cy +
          "px; width:" +
          length +
          "px; -moz-transform:rotate(" +
          angle +
          "deg); -webkit-transform:rotate(" +
          angle +
          "deg); -o-transform:rotate(" +
          angle +
          "deg); -ms-transform:rotate(" +
          angle +
          "deg); transform:rotate(" +
          angle +
          "deg);' />";
        //
        document.body.innerHTML += htmlLine;
      }

      function getOffset(el) {
        var rect = el.getBoundingClientRect();
        return {
          left: rect.left + window.pageXOffset,
          top: rect.top + window.pageYOffset,
          width: rect.width || el.offsetWidth,
          height: rect.height || el.offsetHeight,
        };
      }
    },
    getColor(id) {
      const nCol = this.colors.length;
      const colValue =
        id > nCol - 1 ? Math.round(Math.random() * (nCol - 1)) : id;
      return this.colors[colValue];
    },
    addItem() {
      this.items.push({
        id: this.items.length,
        title: "New item",
        prob: 0,
        top: 100 + 150 * this.items.length,
      });
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