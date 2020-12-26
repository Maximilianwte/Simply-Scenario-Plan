<template>
    <div id="blockQuest" class="flex-col  text-3xl text-bg">
        <div id="header" class="text-main mt-40">Was stört Sie im Moment am meisten?</div>
        <div class="container w-72 mt-12 cursor-pointer">
            <div id="electricity" @click="toggleCategorie('electricity')"
                class="px-4 py-4 w-full text-center bg-main hover:bg-focus rounded-t-lg" :class="[{'bg-focus': activeCategories.electricity == true}]">
                <h2>Stromkosten</h2>
            </div>
            <div id="electricity" @click="toggleCategorie('water')"
                class="px-4 py-4 w-full text-center bg-main hover:bg-focus" :class="[{'bg-focus': activeCategories.water == true}]">
                <h2>Wasserkosten</h2>
            </div>
            <div id="electricity" @click="toggleCategorie('heating')"
                class="px-4 py-4 w-full text-center rounded-b-lg bg-main hover:bg-focus" :class="[{'bg-focus': activeCategories.heating == true}]">
                <h2>Heizkosten</h2>
            </div>
        </div>

    </div>
</template>
<script>
    import store from "../store";

    export default {
        data() {
            return {
                activeCategories: store.state.activeCategories,
            }
        },
        methods: {
            toggleCategorie(id) {
                store.commit("toggleCategorie", id);
            }
        }
    }
</script>