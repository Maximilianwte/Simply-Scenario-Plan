<template>
    <div class="resultComponent pt-12 text-center flex-col text-3xl" :id="data.title">
        <h2>{{data.index + ". " + data.title}}</h2>
        <div class="info flex w-full px-6 md:w-128 mt-4 justify-between">
            <div class="image px-2"><srcFromPropPicture class="w-32 md:w-48" :src="data.image" :alt="data.title" /></div>
            <div class="text text-xl px-2 text-left">{{data.description}}</div>
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
        props: ['data'],
        data() {
            return {
                datacollection: {
                    labels: ["1000 kWh", "1200 kWh", "1400 kWh", "1600 kWh"],
                    datasets: [{
                        label: this.data.label,
                        backgroundColor: "#2d2d2d",
                        data: this.data.data,
                        fill: false
                    }],
                },
            }
        }
    }
</script>