<template>
    <div id="blockQuest" class="flex-col  text-3xl text-bg">
        <div class="container w-72 mt-40 cursor-pointer">
            <div id="electricity" @click="toggleCategorie('electricity')"
                class="px-4 py-4 w-full text-center bg-main hover:bg-focus rounded-t-lg">
                <h2>Strom</h2>
            </div>
            <div id="electricity" @click="toggleCategorie('water')"
                class="px-4 py-4 w-full text-center bg-main hover:bg-focus">
                <h2>Wasser</h2>
            </div>
            <div id="electricity" @click="toggleCategorie('heating')"
                class="px-4 py-4 w-full text-center rounded-b-lg bg-main hover:bg-focus">
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