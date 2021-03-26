<template>
  <div id="front" class="w-full flex-col">
   <varList />
  <varDraggableCanvas />
  </div>
</template>

<script>
import varList from "../components/varList";
import varDraggableCanvas from "../components/varDraggableCanvas";
import store from "../store";
export default {
  components: {varList, varDraggableCanvas},
  methods: {
    buildLine(id1, id2) {
      var div1 = document.getElementById(id1);
      var div2 = document.getElementById(id2);
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
        var length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        // center
        var cx = (x1 + x2) / 2 - length / 2;
        var cy = (y1 + y2) / 2 - thickness / 2;
        var angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
        var htmlLine =
          "<div class='line' style='padding:0px; margin:0px; height:" +
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
    updateLines() {
      const connections = store.state.connectedShapes;
      for (var i = 0; i < connections.length; i++) {
        this.buildLine(connections[i][0], connections[i][1]);
      }
    }
  },
  mounted() {
   /*  dragDIV1 = new PlainDraggable(document.getElementById("div1")) */
   /* this.updateLines(); */
}
}
</script>