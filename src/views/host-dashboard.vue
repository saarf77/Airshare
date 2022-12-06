<template>
  <section class="back-office-main">
      <div class="title-backoffice">
          <h1 class="back-office-title">Orders status</h1>
      </div>
      <div class="back-office">
          <div class="orders-list-main">
              <ul class="orders-list clean-list">
                  <li v-for="order in orders" :key="order._id">
                      <order-host :order="order" />
                  </li>
              </ul>
          </div>
          <div class="back-office-charts" >
              <div class="data-card">
                  <h1 class="chart-area-title">Hosting Summary</h1>
                  <h2 class="subtitle-area border">Guests love what you're doing, keep up the and review your orders stats!</h2>
                  <chart-card v-if="getSumReviews && getAvgRate"  :avgRate="getAvgRate" :sumReviews="getSumReviews" :orders="orders" />
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import orderHost from '../cmps/host/orders-host.vue'
import { DoughnutChart, LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: 'back-office',
  components: {
      DoughnutChart,
      orderHost,
      LineChart,
  },
  data() {
    return {
      orders: null,
      stays: null,
      hostStays: null,
      showStays: false,
      showOrders: true,
      showGraphs: false,
      }
  },
  created() {
      this.$store.dispatch({ type: 'loadOrders' })
      this.$store.dispatch({type: 'loadHostStays'})

  },
  methods: {},
  computed: {
    getLogInUser() {
      return this.$store.getters.loggedinUser;
    },
      orders() {
          return this.$store.getters.getOrders
    },
    getHostStays() {
      return this.$store.getters.getStays
    },
      getSumReviews() {
          return this.$store.getters.getTotalReviews
      },
      getAvgRate() {
          return this.$store.getters.getAvgRate
    }, 
    totalOrders() {
      return this.hostOrders.length;
    },
  },
  unmounted() { },
}

</script>
