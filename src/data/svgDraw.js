import $ from "jquery";
import store from "../store";
// adapted from: https://gist.github.com/alojzije/11127839
//helper functions, it turned out chrome doesn't support Math.sgn()
let svgDraw = {
  signum(x) {
    return x < 0 ? -1 : 1;
  },
  absolute(x) {
    return x < 0 ? -x : x;
  },
  drawPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    var stroke = parseFloat(path.attr("stroke-width"));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.attr("height") < endY) svg.attr("height", endY);
    if (svg.attr("width") < startX + stroke) svg.attr("width", startX + stroke);
    if (svg.attr("width") < endX + stroke) svg.attr("width", endX + stroke);

    var deltaX = (endX - startX) * 0.15;
    var deltaY = (endY - startY) * 0.15;
    // for further calculations which ever is the shortest distance
    var delta = deltaY < this.absolute(deltaX) ? deltaY : this.absolute(deltaX);

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    var arc1 = 0;
    var arc2 = 1;
    if (startX > endX) {
      arc1 = 1;
      arc2 = 0;
    }
    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end
    path.attr(
      "d",
      "M" +
        startX +
        " " +
        startY +
        " V" +
        (startY + delta) +
        " A" +
        delta +
        " " +
        delta +
        " 0 0 " +
        arc1 +
        " " +
        (startX + delta * this.signum(deltaX)) +
        " " +
        (startY + 2 * delta) +
        " H" +
        (endX - delta * this.signum(deltaX)) +
        " A" +
        delta +
        " " +
        delta +
        " 0 0 " +
        arc2 +
        " " +
        endX +
        " " +
        (startY + 3 * delta) +
        " V" +
        endY
    );
  },
  drawPathRightLeft(svg, path, startX, startY, endX, endY, startWidth, endWidth) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    var stroke = parseFloat(path.attr("stroke-width"));
    if (svg.attr("height") < endY) svg.attr("height", endY + 20);
    if (svg.attr("width") < startX + stroke) svg.attr("width", startX + stroke);
    if (svg.attr("width") < endX + stroke) svg.attr("width", endX + stroke);
    if ((endY - startY) >= 0 && (endY - startY) < 30) {
      if (startX > endX) {
        path.attr("d",
        "M" + startX + " "+ startY + "L" + endX +" " + endY)
      }
      else { 
        path.attr("d",
        "M" + (startX+startWidth) + " "+ startY + "L" + (endX-endWidth) +" " + endY)
      }
    }
    else if (startX < endX) {
      path.attr("d",
      "M" + (startX+startWidth) + " "+ startY + "T" + ((startX+startWidth) + ((endX-endWidth)-(startX+startWidth))/15) + " " + startY + " " + ((startX+startWidth) + ((endX-endWidth)-(startX+startWidth))/2) + " " + (startY + (endY-startY)/2) + " " + (endX-endWidth) +" " + endY)
    }
    else {
      // the commented one is the standard beautiful one
      /* path.attr("d",
    "M" + endX + " "+ endY + "q" + (startX-endX)/2 +" 0 "+ (startX-endX)/2 +" "+ (startY-endY)/2 +" 0 "+ (startY-endY)/0.75 +" " + startX +" " + startY) */
    path.attr("d",
    "M" + endX + " "+ endY + "T" + (endX + 20) + " " + (endY) + " " + (endX + (startX-endX)/2) + " " + (endY + (startY-endY)/2) +" " + startX +" " + startY)
    }
  },
  connectElements(svg, path, startId, endId) {
    var svgContainer = document.getElementById("front");
    var svg = $("#"+svg);
    var path = $("#"+path);
    var startElem = document.getElementById(startId);
    var endElem = document.getElementById(endId);

    // if first element is lower than the second, swap!
    if (startElem.offsetTop > endElem.offsetTop) {
      var temp = startElem;
      startElem = endElem;
      endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container
    var svgTop = svgContainer.offsetTop;
    var svgLeft = svgContainer.offsetLeft;

    // get (top, left) coordinates for the two elements
    var startCoord = { top: startElem.offsetTop, left: startElem.offsetLeft };
    var endCoord = { top: endElem.offsetTop, left: endElem.offsetLeft };

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startCoord.left + 0.5 * startElem.offsetWidth - svgLeft; // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top + startElem.offsetHeight - svgTop; // y = top offset + height - svg's top offset

    // calculate path's end (x,y) coords
    var endX = endCoord.left + 0.5 * endElem.offsetWidth - svgLeft;
    var endY = endCoord.top - svgTop;

    // call function for drawing the path
    this.drawPath(svg, path, startX, startY, endX, endY);
  },
  connectElementsRightLeft(svg, path, startId, endId, type, containerId) {
    if (type == "output") {
      var svgContainer = document.getElementById("processView_" + containerId);
      var svg = $("#processView_" + 0).children("#"+svg);
    }
    else {
      var svgContainer = document.getElementById("declareScenarioVariables");
      var svg = $("#"+svg);
    }
    var path = $("#"+path);
    var startElem = document.getElementById(startId);
    var endElem = document.getElementById(endId);

    if (startElem == null) {
      console.log("null",startId )
    }
    // if first element is lower than the second, swap!
    if (startElem.offsetTop > endElem.offsetTop) {
      var temp = startElem;
      startElem = endElem;
      endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container
    var svgTop = svgContainer.offsetTop;
    var svgLeft = svgContainer.offsetLeft;

    // get (top, left) coordinates for the two elements
    var startCoord = { top: startElem.offsetTop, left: startElem.offsetLeft };
    var endCoord = { top: endElem.offsetTop, left: endElem.offsetLeft };

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startCoord.left - svgLeft; // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top + 0.5 *  startElem.offsetHeight - svgTop; // y = top offset + height - svg's top offset

    // calculate path's end (x,y) coords
    var endX = endCoord.left + endElem.offsetWidth - svgLeft;
    var endY = endCoord.top + 0.5 * endElem.offsetHeight  - svgTop;
    //console.log("draw ", svg, " ", startCoord, " ", endCoord)
    // call function for drawing the path
    this.drawPathRightLeft(svg, path, startX, startY, endX, endY, startElem.offsetWidth, endElem.offsetWidth);
  },
  /* connectElementsAlt(svg, path, startElem, endElem) {
    var svgContainer = $("#front");
    // if first element is lower than the second, swap!
    if (startElem.offset().top > endElem.offset().top) {
      var temp = startElem;
      startElem = endElem;
      endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container
    var svgTop = svgContainer.offset().top;
    var svgLeft = svgContainer.offset().left;

    // get (top, left) coordinates for the two elements
    var startCoord = startElem.offset();
    var endCoord = endElem.offset();

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startCoord.left + 0.5 * startElem.outerWidth() - svgLeft; // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top + startElem.outerHeight() - svgTop; // y = top offset + height - svg's top offset

    // calculate path's end (x,y) coords
    var endX = endCoord.left + 0.5 * endElem.outerWidth() - svgLeft;
    var endY = endCoord.top - svgTop;

    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);
  }, */
  updateAndConnectAll() {
    const connections = store.state.connectedShapes;
    for (var i = 1; i < connections.length; i++) {
      $("#svg" + i).attr("height", "0");
      $("#svg" + i).attr("width", "0");
    }
    for (var i = 0; i < connections.length; i++) {
      this.connectElementsRightLeft("svg"+(i+1), "path"+(i+1), connections[i][0], connections[i][1]);
    }
    //this.$forceUpdate();
  },
  connectAllInOutputProcess() {
    const connections = store.state.connectedShapesOutput;
    const outcomeVariables = store.state.outcomeVariables;
    for (var i = 0; i < outcomeVariables.length; i++) {
      for (var j = 0; j < connections[outcomeVariables[i].id].length; j++) {
        this.connectElementsRightLeft("svg_"+outcomeVariables[i].id+ "_"+(j+1), "path"+(j+1), connections[outcomeVariables[i].id][j][0], connections[outcomeVariables[i].id][j][1], "output", outcomeVariables[i].id);
      }
    }
    //this.$forceUpdate();
  },
};

export default svgDraw;