<template>
    <div>
        <v-rect @click="openUp" @dragmove="handleRectDrag" :config="rectConfig"></v-rect>
        <v-text id="title" @click="openUp" :config="titleConfig" />
    </div>
</template>
<script>
    export default {
        props: ['x', 'y', 'color', 'dataProps', 'stage'],
        data() {
            return {
                open: this.dataProps.open,
                rectConfig: {
                    x: this.x,
                    y: this.y,
                    width: 250,
                    height: 100,
                    fill: this.color,
                    cornerRadius: 12,
                    draggable: false,
                },
                titleConfig: {
                    text: this.dataProps.title,
                    x: this.x + 70,
                    y: this.y + 28,
                    width: 200,
                    fill: "#2d2d2d",
                    fontSize: 25
                },
            }
        },
        methods: {
            openUp() {
                this.open = !this.open;
            },
            handleRectDrag() {
                // the problem is, the rectConfig does not change on move
                // the draggable function somehow does that in the backend
                // do I have a way around it?
                this.titleConfig.x = this.rectConfig.x;
                this.titleConfig.y = this.rectConfig.y;
            }
        },
        watch: {
            open: function () {
                if (this.open) {
                    this.rectConfig.width = 300;
                    this.rectConfig.height = 250;
                } else {
                    this.rectConfig.width = 250;
                    this.rectConfig.height = 100;
                }
            }
        }
    }
</script>