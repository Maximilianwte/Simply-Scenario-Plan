import {
  Line,
  mixins
} from 'vue-chartjs'
const {
  reactiveProp
} = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  data() {
    return {
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return '$' + value.toFixed(decimals);
                    }
                }
            }]
        }
    }
    }
  },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}