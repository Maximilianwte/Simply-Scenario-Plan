<template>
    <div class="progressBar border-2 relative w-full md:w-72 h-10 rounded">
        <div class="load absolute h-full rounded" :style="getLoadStyle"></div>
        <p class="w-full h-full mt-1 text-center relative">{{loadState}}%</p>
    </div>
</template>
<script>
    export default {
        props: ['loadState'],
        computed: {
            getLoadStyle() {
                return "backgroundColor: #e84855; width: " + this.loadState + "%;"
            }
        }
    }
</script>