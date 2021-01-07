<template>
    <div id="generalInput" class="w-full pt-20 md:pt-48 px-4 flex-col justify-around items-center text-2xl text-main">
        <div id="doKnowAmount" class="flex-col justify-around">
            <p class="w-72 text-center">1. Haben Sie eine eigene Immobilie?
            </p>
            <form class="values w-48 flex justify-around mt-4 mb-12">
                <input type="radio" value="true" name="haveHouse" v-model="haveHouse" /><label>Ja</label>
                <input type="radio" value="false" name="haveHouse" v-model="haveHouse" /><label>Nein</label>
            </form>
        </div>
        <div v-if="haveHouse != null" id="doKnowAmount" class="flex-col justify-around">
            <p class="w-72 text-center">2. In was für einer Art von Immobilie von Sie?
            </p>
            <form class="values flex-col justify-around mt-4 mb-12">
                <div class="row1 flex justify-around mt-4"> <input type="radio" value="Single" name="typeOfHouse"
                        v-model="typeOfHouse" /><label class="px-2">Einfamilienhaus</label>
                    <input type="radio" value="Appartement" name="typeOfHouse" v-model="typeOfHouse" /><label
                        class="px-2">Wohnung</label>
                    <input type="radio" value="Double" name="typeOfHouse" v-model="typeOfHouse" /><label
                        class="px-2">Doppelhaushälfte</label></div>
                <div class="row2 flex justify-center mt-1">
                    <input type="radio" value="Multi" name="typeOfHouse" v-model="typeOfHouse" /><label
                        class="px-2">Mehrfamilienhaus</label>
                </div>
            </form>
        </div>
        <div v-if="typeOfHouse != null" id="sizeOfHouse" class="flex-col justify-around">
            <p class="w-72 text-center">3. Wie groß ist ihre Wohnfläche?</p>
            <form class="values w-full mb-12">
                <div class="row1 flex justify-around mt-4"> <input type="radio" value="0" name="sizeOfHouse"
                        v-model="sizeOfHouse" @change="handleFulfilled(false)" /><label class="px-2">0-40qm2</label>
                    <input type="radio" value="41" name="sizeOfHouse" v-model="sizeOfHouse"
                        @change="handleFulfilled(false)" /><label class="px-2">41-70qm2</label>
                    <input type="radio" value="71" name="sizeOfHouse" v-model="sizeOfHouse"
                        @change="handleFulfilled(false)" /><label class="px-2">71-110qm2</label></div>
                <div class="row2 flex justify-center mt-1">
                    <input type="radio" value="111" name="sizeOfHouse" v-model="sizeOfHouse"
                        @change="handleFulfilled(false)" /><label class="mx-4">111-150qm2</label>
                    <input type="radio" value="151" name="sizeOfHouse" v-model="sizeOfHouse"
                        @change="handleFulfilled(false)" /><label class="mx-4">> 150qm2</label>
                </div>
            </form>
        </div>
        <div v-if="sizeOfHouse != null" id="nFloors" class="flex-col justify-around">
            <p class="w-72 text-center">4. Auf wie vielen Stockwerken leben Sie?</p>
            <input type="range" @change="handleFulfilled(true)" v-model="nFloors" min="1" max="5">
            <p>{{nFloors}}</p>
        </div>
    </div>
</template>
<script>
    import store from "../store";
    export default {
        data() {
            return {
                haveHouse: null,
                typeOfHouse: null,
                sizeOfHouse: null,
                nFloors: null
            }
        },
        methods: {
            handleFulfilled(value) {
                store.commit("handleFulfilled", value)
                if (value == true) {
                    var data = {
                        id: "general",
                        haveHouse: this.haveHouse,
                        typeOfHouse: this.typeOfHouse,
                        sizeOfHouse: this.sizeOfHouse,
                        nFloors: this.nFloors
                    }
                    store.commit("pushData", data)
                }
            }
        }
    }
</script>