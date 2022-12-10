<template>
    <table class="content-table">
        <thead>
            <tr>
                <th class="title-thead"></th>
                <th class="title-thead">Stay name</th>
                <th class="title-thead">Total price payed</th>
                <th class="title-thead">Address</th>
                <th class="title-thead">Actions</th>
            </tr>
        </thead>

        <tbody>
            <div v-for="trip in getOrders" :key="trip._id">
                <tr class="row-table border_bottom">
                    <!-- <td><img class="stay-image" :src=imageUrl></td> -->
                    <!-- <td>{{ trip.loc.address }}</td>
                    <td>{{ trip.totalPrice }}</td>
                    <td>{{ getAddress(trip) }}</td> -->
                    <td></td>
                    <td></td>
                    <pre>{{trip}}</pre>
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

        getStayName(trip) {
            // console.log(currOrder.stay)
            if (trip.stay.name > 13) {
                let desc = trip.stay.name.slice(0, 13) + '...'
                return desc
            }
            return trip.stay.name
        },

    },
    methods: {
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