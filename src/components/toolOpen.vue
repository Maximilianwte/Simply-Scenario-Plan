<template>
    <div class="toolOpen">
        <div class="header flex text-xl">
            <svg @click="setOpen" class="w-6 cursor-pointer" :style="getRotation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.5 13"><path d="M0 0h20.5l-10 13L0 0z"/></svg>
            <h4 class="ml-4">Instructions</h4>
        </div>
        <div v-if="open" class="data text-lg mt-6 ml-2">
            <ul>
                <li class="mt-2" v-for="(item, index) in data" :key="index">
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: ["data"],
    data() {
        return {
            open: true
        }
    },
    computed: {
        getRotation() {
            return this.open ? "" : "transform: rotate(-90deg)";
        }
    },
    methods: {
        setOpen() {
            this.open = !this.open;
        }
    }
}
</script>