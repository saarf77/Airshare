<template>
  <section class="back-office-main ">
      <div class="title-backoffice">
          <h1 class="back-office-title">Orders status</h1>
      </div>
      <div class="back-office">
          <div class="orders-list-main">
              <ul class="orders-list clean-list">
                  <li v-for="order in orders" :key="order._id">
                      <order-preview :order="order" />
                  </li>
              </ul>
          </div>
          <div class="back-office-charts" >
              <div class="">
                  <h1 class="chart-area-title">Hosting Summary</h1>
                  <h2 class="bold">Great Work:)</h2>
                  <h2 class="subtitle-area">Guests love what you're doing, keep up and review your orders stats!</h2>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import { DoughnutChart, LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: 'back-office',
  components: {
      DoughnutChart,
      LineChart,
  },
  data() {
      return {
      }
  },
  created() {
      // this.$store.dispatch({ type: 'loadOrders' })
      // this.$store.dispatch({type: 'loadHostStays'})
  },

  methods: {},
  computed: {
      orders() {
          return this.$store.getters.getOrders
      },
      getSumReviews() {
          return this.$store.getters.getTotalReviews
      },
      getAvgRate() {
          return this.$store.getters.getAvgRate
      }, 
  },
  unmounted() { },
}
</script>

