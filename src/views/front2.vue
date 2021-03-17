<template>
    <div id="front" class="w-full">
        <div draggable @drag="onDrag('rect1')" class="rect absolute text-2xl text-bg w-64 py-12 bg-main rounded-lg cursor-move flex justify-center" style="top: 8rem; left: 4rem" id="rect1">
            <p>this is a rect</p>
        </div>
        <div draggable @drag="onDrag('rect2')" class="rect absolute text-2xl text-bg w-64 py-12 bg-focus rounded-lg cursor-move flex justify-center" style="top: 18rem; left: 4rem" id="rect2">
            <p>this is also a rect</p>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            onDrag(id) {
                // Make the DIV element draggable:
                dragElement(document.getElementById(id));

                function dragElement(elmnt) {
                    var pos1 = 0,
                        pos2 = 0,
                        pos3 = 0,
                        pos4 = 0;
                    if (document.getElementById(elmnt.id)) {
                        // if present, the header is where you move the DIV from:
                        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
                    } else {
                        // otherwise, move the DIV from anywhere inside the DIV:
                        elmnt.onmousedown = dragMouseDown;
                    }

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
                        // set the element's new position:
                        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                    }

                    function closeDragElement() {
                        // stop moving when mouse button is released:
                        document.onmouseup = null;
                        document.onmousemove = null;
                    }
                }
            }
        }
    }
</script>