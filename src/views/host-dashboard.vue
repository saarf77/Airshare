<template>
  <div class="dashboard-container">
    <div class="logIn">
      <h1 class="login-msg">In order to see your hosting summary,
        you must log in first
        <router-link to="/login">
          <span class="under-line">login here</span>
        </router-link>
      </h1>
    </div>
    <div>
      <div class="flex column">

        <h1 class="chart-title">Hosting Summary</h1>
        <div class="top-dashboard-label flex">
          <button> Your Orders</button>
          <button> Your Stays</button>
        </div>
        <table v-if="showOrders" class="content-table">
          <thead>
            <tr class="border_bottom">
              <th class="title-thead">Time </th>
              <th class="title-thead">Guest Name </th>
              <th class="title-thead">Stay name </th>
              <th class="title-thead">Check In/Out </th>
              <th class="title-thead text-center">Status </th>
              <th class="title-thead text-center">Guests </th>
              <th class="title-thead text-center">Action </th>
            </tr>
          </thead>
          <tbody>
            <orders-host />
          </tbody>
        </table>
        <table v-if="showStays" class="content-table">
          <thead>
            <tr>
              <th class="title-thead"></th>
              <th class="title-thead">Stay name</th>
              <th class="title-thead">Price per night</th>
              <th class="title-thead">Address</th>
              <th class="title-thead">Actions</th>
            </tr>
          </thead>
          <tbody>
            <stays-host />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import ordersHost from '../cmps/host/orders-host.vue';
import staysHost from '../cmps/host/stays-host.vue';
export default {
  name: 'host-dashboard',
  components: {
    ordersHost,
    staysHost,
  },
  data() {
    return {
      orders: null,
      stays: null,
      hostStays: null,
      showStays: false,
      showOrders: true,
    };
  },
  created() {
    // this.$store.dispatch({ type: 'loadOrders'});
  },

  computed: {
    getSumReviews() {
      return this.$store.getters.getTotalReviews
    },
    getAvgRate() {
      return this.$store.getters.getAvgRate
    },
    getLogInUser() {
      return this.$store.getters.loggedinUser;
    },
    getHostOrders() {
      return this.$store.getters.getOrders
    },
    getHostStays() {
      return this.$store.getters.getStays
    },
    stayOrder() {
      if (!this.showStay) return 'Show my stays';
      if (this.showStay) return 'Show my orders';
    },
    totalOrders() {
      return this.hostOrders.length;
    },

  },
  methods: {

  },
};
</script>
