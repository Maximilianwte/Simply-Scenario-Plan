<template>
    <div id="results" class="flex-col">
        <resultComponent :data="data[currentResult]" :id="this.currentResult" />
        <h2 class="text-xl mt-4">{{currentResult+1}}</h2>
        <div id="ux" class="z-20">
            <div id="leftArrow" v-if="currentResult > 0" title="Zurück">
                <svg @click="handleArrow('dec')" class="w-16 left absolute top-0 left-0 mt-72 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213.333 213.333">
                    <path d="M0 53.333L106.667 160 213.333 53.333z" /></svg>
            </div>
            <div id="rightArrow" title="Weiter">
                <svg @click="handleArrow('inc')" class="w-16 right absolute top-0 right-0 mt-72"
                    :class="currentResult >= nResults ? 'svg-noClick' : 'cursor-pointer'"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213.333 213.333">
                    <path d="M0 53.333L106.667 160 213.333 53.333z" /></svg>
            </div>
        </div>
    </div>
</template>
<script>
    import ResultComponent from '../components/resultComponent.vue';

    export default {
        components: {
            ResultComponent
        },
        data() {
            return {
                nResults: 4,
                currentResult: 0,
                data: [{
                        index: this.currentResult + 1,
                        title: "Photovoltaik",
                        label: "Stromkosten",
                        data: ["200", "224.80", "249.20", "1268.40"],
                        image: "PV.png",
                        description: "Eine Photovoltaik Anlage kann einen Teil bis zu ihrem gesamten Strombedarf durch die Sonne erstellen.",
                        investCost: 5300,
                        savingsY: 630
                    },
                    {
                        index: this.currentResult + 1,
                        title: "Pellets Heizung",
                        label: "Heizkosten",
                        data: [92, 112.80, 224.20, 268.40],
                        image: "Pellets.png",
                        description: "Eine Pellets Heizung basiert auf Holz. Mit einer solchen Heizung können Sie bis zu 50% ihrer Heizkosten einsparen.",
                        investCost: 12400,
                        savingsY: 1190
                    }
                ]
            }
        },
        methods: {
            handleArrow(id) {
                if (id == "inc") {
                    this.currentResult++;
                } else {
                    this.currentResult--
                }
                this.$router.push({
                    name: 'results',
                    params: {
                        id: this.currentResult
                    }
                })
                return null;
            }
        }
    }
</script>