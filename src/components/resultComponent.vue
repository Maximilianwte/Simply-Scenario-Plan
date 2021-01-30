<template>
    <div class="resultComponent pt-12 text-center flex-col text-3xl" :id="data.title">
        <h2>{{id + 1 + ". " + data.title}}</h2>
        <div class="info flex w-full px-6 md:w-128 mt-4 justify-between">
            <div class="image px-2">
                <srcFromPropPicture class="w-32 md:w-48" :src="data.image" :alt="data.title" />
            </div>
            <div class="text text-xl px-2 text-left">{{data.description}}</div>
        </div>
        <div class="roiData w-full mt-8 px-20 md:w-128 text-xl text-left">
            <h6>Geschätzte Investitionskosten: {{data.investCost}}€</h6>
            <h6>Geschätzte Ersparnis / Jahr: {{data.savingsY}}€</h6>
            <h6>Ersparnis nach 10 Jahren: {{(data.savingsY * 10) - data.investCost}}€</h6>
        </div>
        <!-- <bar-chart class="w-96" :chart-data="datacollection" /> -->
        <line-chart class="w-3/4 md:w-96 mt-8" :chart-data="datacollection" />
    </div>
</template>
<script>
    import BarChart from "../components/BarChart";
    import LineChart from "../components/LineChart";
    import srcFromPropPicture from "./srcFromPropPicture";

    export default {
        components: {
            BarChart,
            LineChart,
            srcFromPropPicture
        },
        props: ['data', 'id'],
        data() {
            return {
                datacollection: null,
            }
        },
        mounted() {
            this.fillData();
        },
        watch: {
            id: function () {
                this.fillData()
            }
        },
        methods: {
            fillData() {
                let curYear = new Date().getFullYear();
                var labels = [curYear];
                for (var i = 0; i < 10; i++) labels.push(curYear + i);
                this.datacollection = {
                    labels: labels,
                    datasets: [{
                        label: this.data.label,
                        backgroundColor: "#2d2d2d",
                        data: this.data.data,
                        fill: false
                    }],
                };
            }
        }
    }
</script>