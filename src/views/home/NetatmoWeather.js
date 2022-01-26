/* eslint-disable */

import { CChartLine } from '@coreui/vue-chartjs'

const auth_token          = process.env.VUE_NETATMO_TOKEN_AUTH;
const weather_station_mac = process.env.VUE_NETATMO_STATION_MAC;



export default {
  created: function () {
    //this.initHueLightsMap();
    this.interval = setInterval(() => {
      //his.updateLightsMap();
    }, 180000);
  },
  beforeUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  },
  data() {
    return {
      netatmoInsideTemperature: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgba(220, 220, 220, 0.2)',
            borderColor: 'rgba(220, 220, 220, 1)',
            pointBackgroundColor: 'rgba(220, 220, 220, 1)',
            pointBorderColor: '#fff',
            data: [40, 20, 12, 39, 10, 40, 39]
          },
          {
            label: 'My Second dataset',
            backgroundColor: 'rgba(151, 187, 205, 0.2)',
            borderColor: 'rgba(151, 187, 205, 1)',
            pointBackgroundColor: 'rgba(151, 187, 205, 1)',
            pointBorderColor: '#fff',
            data: [50, 12, 28, 29, 7, 25, 12]
          }
        ]
      },
      interval: null,
    }
  },
  components: { CChartLine },
  methods: {},
  computed: {},
}
