<template>
    <div v-for="hostOrder in getHostOrders" :key="hostOrder._id">
        <tr class="border-bottom">
            <!-- <td>user</td> -->
            <td class="text-center buyer"><img src="img"> <span>Yusi</span></td>
            <td class="text-center" :class="color">{{ hostOrder.status }}</td>
            <td class="text-center">{{getGuestsAmount(hostOrder)}} </td>
            <!-- <td class="text-center">{{ getEndDate(hostOrder) }}</td> -->
            <td class="text-center">{{ getBookingDate(hostOrder)}}</td>
            <td class="text-center">{{summarySize(hostOrder)}}</td>
            <td class="text-center">${{hostOrder.totalPrice.toFixed(2)}}</td>
            <td class="text-center">Action </td>
            <td class="text-center">{{ getStartDate(hostOrder)}}-{{getEndDate(hostOrder)}}</td>
        </tr>
    </div>
</template>
  
<script>

export default {
    // prop:['hostOrder'],
    data() {
        return {
            img: '',
            currOrder: null,
            guests:0,
        };
    },
    created() {
        this.$store.dispatch({ type: 'loadOrders', hostId: '622f3402e36c59e6164fac46' });
    },
    computed: {
        getHostOrders() {
            return this.$store.getters.getOrders
        },
        color(){
            
        }
        

    },
    methods: {
        summarySize(orders) {
            let currOrder = this.getHostOrders.filter(order => order === orders)
            // console.log(currOrder.stay)
            if (currOrder[0].stay.name.length > 13) {
            let desc = currOrder[0].stay.name.slice(0, 13) + '...'
           return desc
        }
            return currOrder[0].stay.name
        },
        getStartDate(orders) {
            let currOrder = this.getHostOrders.filter(order => order === orders)
            let startDate = currOrder[0].startDate
            let checkin = new Date(startDate).toLocaleDateString()
            return checkin
        },
        getEndDate(orders) {
            let currOrder = this.getHostOrders.filter(order => order === orders)
            let endDate = currOrder[0].endDate
            let checkout = new Date(endDate).toLocaleDateString()
            return checkout
        },
        getBookingDate(orders) {
            let currOrder = this.getHostOrders.filter(order => order === orders)
            let bookingDate = currOrder[0].createdAt
            let booking = new Date(bookingDate).toLocaleDateString()
            return booking
        },
        getGuestsAmount(orders){
            let currOrder = this.getHostOrders.filter(order => order === orders)
            const {adults,children,pets,infants} = currOrder[0].guests
            console.log(adults)
            let amount = adults + children + pets + infants
            return amount

        },
        getUserImg(orders) {
            console.log(orders)

            let currOrder = this.getHostOrders.filter(order => order === orders)
            currOrder.then(res => this.img = res.buyer.imgUrl)
            return this.img
        },
        approve() {
            const order = JSON.parse(JSON.stringify(this.hostOrder))
            this.$store.dispatch({ type: "saveOrder", order, status: 'approved' })
        },
        decline() {
            const order = JSON.parse(JSON.stringify(this.hostOrder))
            this.$store.dispatch({ type: "saveOrder", order, status: 'declined' })
        },
    }
};
</script>
  