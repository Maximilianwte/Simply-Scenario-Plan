<template>
    <div>
        <v-rect @click="open" :config="rectConfig"></v-rect>
        <v-text id="title" :config="titleConfig" />
    </div>
</template>
<script>
    export default {
        props: ['x', 'y', 'color', 'dataProps'],
        data() {
            return {
                openX: this.dataProps.open,
                rectConfig: {
                    x: this.x,
                    y: this.y,
                    width: 300,
                    height: 250,
                    fill: this.color,
                    cornerRadius: 12,
                    draggable: true,
                },
                titleConfig: {
                    text: this.dataProps.title,
                    x: this.x + 70,
                    y: this.y + 35,
                    width: 200,
                    fill: "#2d2d2d",
                    fontSize: 25
                },
            }
        },
        mounted() {
            if (this.openX) {
                this.rectConfig.width = 300;
                this.rectConfig.height = 250;
            } else {
                this.rectConfig.width = 250;
                this.rectConfig.height = 100;
            }
            this.titleConfig.x= this.rectConfig.x +70;
        },
        methods: {
            open() {
                console.log("he")
                this.openX = true;
            }
        }
    }
</script>