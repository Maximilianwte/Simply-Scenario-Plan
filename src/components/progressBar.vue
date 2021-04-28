<template>
    <div class="progressBar border-2 w-72 h-8 rounded">
        <p class="absolute ml-40" style="marginTop: 2px">{{loadState}}%</p>
        <div class="load h-full rounded" :style="getLoadStyle"></div>
    </div>
</template>
<script>
export default {
    props: ['loadState'],
    data() {
        return{
            fullWidth: 320
        }
    },
    computed: {
        getLoadStyle() {
            return "backgroundColor: #ff396a; width: " + this.loadState/100*this.fullWidth + "px"
        }
    }
}
</script>