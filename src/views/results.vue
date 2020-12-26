<template>
    <div id="results" class="flex-col">
        <resultComponent :data="dataForResult1" />
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
                dataForResult1: {
                    title: "Photovoltaik",
                    label: "Stromkosten",
                    data: [200, 224.80, 249.20, 268.40],
                    image: "PV.png",
                    description: "Eine Photovoltaik Anlage kann einen Teil bis zu ihrem gesamten Strombedarf durch die Sonne erstellen."
                }
            }
        }
    }
</script>