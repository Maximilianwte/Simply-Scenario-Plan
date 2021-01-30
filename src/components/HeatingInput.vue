<template>
    <div id="heatingInput" class="w-full pt-20 md:pt-48 px-4 flex-col justify-around items-center text-2xl text-main">
        <div id="doknowtype" class="flex-col justify-around">
            <p class="w-72 text-center">1. Welchen Heizungstyp verwenden Sie?</p>
            <form class="values w-full mb-12">
                <div class="row1 flex justify-around mt-4"> <input type="radio" value="electricity" name="doknowtype"
                        v-model="doKnowType" @change="handleFulfilled(false)" /><label>Strom</label>
                    <input type="radio" value="oil" name="doknowtype" v-model="doKnowType"
                        @change="handleFulfilled(false)" /><label>Heizöl</label>
                    <input type="radio" value="gas" name="doknowtype" v-model="doKnowType"
                        @change="handleFulfilled(false)" /><label>Erdgas</label></div>
                <div class="row2 flex justify-center mt-1">
                    <input type="radio" value="pellets" name="doknowtype" v-model="doKnowType"
                        @change="handleFulfilled(false)" /><label class="mx-4">Pellets</label>
                    <input type="radio" value="wood" name="doknowtype" v-model="doKnowType"
                        @change="handleFulfilled(false)" /><label class="mx-4">Hackschnitzel</label>
                </div>
                <div class="row3 flex justify-center mt-1">
                    <input type="radio" value="heatpump" name="doknowtype" v-model="doKnowType"
                        @change="handleFulfilled(false)" /><label class="ml-4">Wärmepumpe</label>
                </div>
            </form>
        </div>
        <div v-if="doKnowType != null" id="doKnowAmount" class="flex-col justify-around">
            <p class="w-72 text-center">2. Wissen Sie wie viele kWh Strom ihr Haushalt im letzten Jahr verbraucht hat?
            </p>
            <form class="values w-48 flex justify-around mt-4 mb-12">
                <input type="radio" value="true" name="doKnowAmount" v-model="doKnowAmount"
                    @change="handleFulfilled(false)" /><label>Ja</label>
                <input type="radio" value="false" name="doKnowAmount" v-model="doKnowAmount"
                    @change="handleFulfilled(true)" /><label>Nein</label>
            </form>
        </div>
        <div v-if="doKnowAmount == 'true'" id="amount" class="flex-col px-12 items-center">
            <p>3. Wie viele kWh hat ihr Haushalt im letzten Jahr verbraucht?</p>
            <div class="inputLine flex">
                <input type="text" placeholder="4000" v-model="electricityAmount" @change="handleFulfilled(true)"
                    class="w-64 border-b-2 md:w-76 xl:w-90 pt-2 cursor-pointer text-main px-2" />
                <p class="ml-2 mt-1">kWh</p>
            </div>
        </div>
        <div v-if="doKnowAmount == 'false'" id="doknowcost" class="flex-col justify-around">
            <p class="w-72 text-center">3. Wissen Sie wie hoch ihre Heizkosten im letzten Jahr waren?</p>
            <form class="values w-48 flex justify-around mt-4 mb-12">
                <input type="radio" value="true" name="doknowcost" v-model="doKnowCost" /><label>Ja</label>
                <input type="radio" value="false" name="doknowcost" v-model="doKnowCost"
                    @change="handleFulfilled(false)" /><label>Nein</label>
            </form>
        </div>
        <div v-if="doKnowCost == 'true'" id="money" class="flex-col items-center px-12">
            <p>4. Wie hoch waren ihre Heizkosten im letzten Jahr?</p>
            <div class="inputLine flex">
                <input type="text" placeholder="720" v-model="heatingBill" @change="handleFulfilled(true)"
                    class="w-64 border-b-2 md:w-76 xl:w-90 pt-2 cursor-pointer text-main px-2" />
                <p class="ml-2 mt-1">€</p>
            </div>
        </div>
        <div v-if="doKnowCost == 'false' && doKnowCost == 'false'" id="people" class="flex-col items-center px-12">
            <p>5. Wie viele Personen wohnen in ihrem Haushalt?</p>
            <input type="range" v-model="peopleInHouse" min="1" max="20" @change="handleFulfilled(true)">
            <p>{{peopleInHouse}}</p>
        </div>
    </div>
</template>
<script>
    import calculations from "../data/calculations";
    import store from "../store";
    export default {
        data() {
            return {
                doKnowType: null,
                doKnowCost: null,
                doKnowAmount: null,
                heatingBill: 0,
                heatingAmount: 0,
                peopleInHouse: 4
            }
        },
        methods: {
            handleFulfilled(value) {
                store.commit("handleFulfilled", value)
                if (value == true) {
                    var data = {
                        id: "heating",
                        doKnowType: this.doKnowType,
                        doKnowCost: this.doKnowCost,
                        doKnowAmount: this.doKnowAmount,
                        heatingBill: this.heatingBill,
                        heatingAmount: this.heatingAmount,
                        peopleInHouse: this.peopleInHouse
                    }
                    calculations.calHeating();
                    store.commit("pushData", data)
                }
            }
        }
    }
</script>