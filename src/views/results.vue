<template>
    <div id="results" class="flex-col">
        <bar-chart class="w-96" :chart-data="datacollection" />
        <line-chart class="w-96" :chart-data="datacollection" />
    </div>
</template>
<script>
    import BarChart from "../components/BarChart";
    import LineChart from "../components/LineChart";

    export default {
        components: {
            BarChart,
            LineChart
        },
        data() {
            return {
                datacollection: {
                    labels: ["1000 kWh", "1200 kWh", "1400 kWh", "1600 kWh"],
                    datasets: [{
                        label: "Electricity Cost",
                        backgroundColor: "#2d2d2d",
                        data: [200, 224.80, 249.20, 268.40],
                        fill: false
                    }],
                },
            }
        }
    }
</script>