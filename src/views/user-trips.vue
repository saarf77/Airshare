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
            <div v-for="trip in tripOrders" :key="trip._id">
                <tr class="row-table border_bottom">
                    <!-- <td><img class="stay-image" :src=imageUrl></td> -->
                    <td>{{ getStayName(trip) }}</td>
                    <td>{{ pricePerNight(trip) }}</td>
                    <td>{{ getAddress(trip) }}</td>
                </tr>
            </div>
        </tbody>
    </table>
</template>

<script>
export default {
    data() {
        return {
           tripOrders:[],
        }
    },
    
    computed: {
        getAddress(trip){
            return trip.loc.address
        },
        pricePerNight(trip){
            return trip.totalPrice
        },
        getStayName(trip) {
            // console.log(currOrder.stay)
            if (trip.stay.name > 13) {
                let desc = trip.stay.name.slice(0, 13) + '...'
                return desc
            }
            return trip.stay.name
        },
        getUserStays() {
            let orders = this.$store.getters.getOrders
            let userId = this.$route.params.id
            let filteredTrips = orders.filter(order => order.buyer._id === userId)
            this.tripOrders = filteredTrips
        },
        
    },
}
</script>

<style>

</style>