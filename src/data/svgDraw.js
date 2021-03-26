import $ from "jquery";
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
  connectElementsMe(svg, path, startId, endId) {
    var svgContainer = document.getElementById("svgContainer");
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
  connectElements(svg, path, startElem, endElem) {
    var svgContainer = $("#svgContainer");
    console.log(document.getElementById("free0"));
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
  },
  /* connectAll() {
    // connect all the paths you want!
    connectElements($("#svg1"), $("#path1"), $("#teal"), $("#orange"));
    connectElements($("#svg1"), $("#path2"), $("#red"), $("#orange"));
    connectElements($("#svg1"), $("#path3"), $("#teal"), $("#aqua"));
    connectElements($("#svg1"), $("#path4"), $("#red"), $("#aqua"));
    connectElements($("#svg1"), $("#path5"), $("#purple"), $("#teal"));
    connectElements($("#svg1"), $("#path6"), $("#orange"), $("#green"));
  }, */
};

export default svgDraw;

/* $(document).ready(function() {
  // reset svg each time
  $("#svg1").attr("height", "0");
  $("#svg1").attr("width", "0");
  connectAll();
});

$(window).resize(function() {
  // reset svg each time
  $("#svg1").attr("height", "0");
  $("#svg1").attr("width", "0");
  connectAll();
});
 */