<template>
    <table class="content-table main-layout">
        <!-- <thead>
            <tr>
                <th class="title-thead text-center"></th>
                <th class="title-thead text-center">Stay name</th>
                <th class="title-thead text-center">Total price payed</th>
                <th class="title-thead text-center">Address</th>
                <th class="title-thead text-center">Actions</th>
            </tr>
        </thead> -->

        <el-table :data="tableData" style="width: 100%"  class="border-bottom">
    <!-- <el-table-column fixed prop="Guest" label="Guest" width="140" /> -->
    <el-table-column prop="Stay name" label="Stay name" width="735" />
    <el-table-column prop="Price" label="Price" width="335" />
    <el-table-column prop="Status" label="Status" width="355" />
    <!-- <el-table-column prop="Guests" label="Guests" width="120" /> -->
    <!-- <el-table-column prop="Booking" label="Booking" width="120" /> -->
    <!-- <el-table-column prop="Action" label="Action" width="120" /> -->
    <el-table-column prop="Check In/ Out" label="Check In/ Out" width="190" />
    <!-- <el-table-column fixed="right" label="Operations" width="130">
      <template #default>
        <el-button link type="primary" size="small" @click=""
          >Detail</el-button>
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column> -->
  </el-table>


        <tbody>
            <div v-for="trip in getOrders" :key="trip._id">
                <tr class="row-table border-bottom">
                    <!-- <td><img class="stay-image" :src=imageUrl></td> -->
                    <td>{{ getStayName(trip) }}</td>
                    <td>{{ trip.totalPrice }}</td>
                    <td>{{ trip.status }}</td> 
                    <td>{{ getStartDate(trip)}} - {{getEndDate(trip)}}</td>
                    <!-- <td>{{getEndDate(trip)}}</td> -->
                    <!-- <pre>{{trip}}</pre> -->
                </tr>
            </div>
        </tbody>
    </table>
</template>

<script>
    import {socketService} from '../services/socket.service.js'
export default {
    data() {
        return {
            tripOrders: [],
        }
    },
    created() {
        socketService.on('update trips' , this.loadTrips)
        this.$store.dispatch({ type: 'loadOrders', buyerId: this.$route.params.id });
    },

    computed: {
        getOrders(){
            return this.$store.getters.getOrders
        },

        // getStayName(trip) {
        //     // console.log(currOrder.stay)
        //     if (trip.stay.name > 13) {
        //         let desc = trip.stay.name.slice(0, 13) + '...'
        //         return desc
        //     }
        //     return trip.stay.name
        // },

    },
    methods: {
        getStartDate(trip) {
            // let currOrder = this.getHostOrders.filter(order => order === orders)
            let startDate = trip.startDate
            let checkin = new Date(startDate).toLocaleDateString()
            return checkin
        },
        getEndDate(trip) {
            // let currOrder = this.getHostOrders.filter(order => order === orders)
            let endDate = trip.endDate
            let checkout = new Date(endDate).toLocaleDateString()
            return checkout
        },
        loadTrips(orderId){
            console.log("🚀 ~ file: user-trips.vue:59 ~ loadTrips ~ orderId", orderId)
           let order = this.getOrders.find(order => order._id === orderId)
           if(order){
               this.$store.dispatch({ type: 'loadOrders', buyerId: this.$route.params.id });
            }
        },
        getStayName(trip) {
            // console.log(currOrder.stay)
            if (trip.stay.name > 13) {
                let desc = trip.stay.name.slice(0, 13) + '...'
                return desc
            }
            return trip.stay.name
        },
    }
}
</script>

<style>

</style>