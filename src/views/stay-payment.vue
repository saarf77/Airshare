<template>
    <section class="payment-page">
        <div class="left-side">

            <div class="payment-title">
                <h1>Request to book</h1>
            </div>
            <section class="good-deal">
                <div class="title">
                    <h3>Good price</h3>
                </div>
                <div class="deal-content">
                    <p>Your dates are $194 less than the avg. nightly rate over the last 3 months.</p>
                </div>
            </section>

            <section class="trip-display">
                <h2>Your trip</h2>
                <div class="trip-dates">
                    <h1>Dates</h1>
                    <div class="dates">
                        {{ setDatesStart }} -
                        {{ setDatesEnd }}
                    </div>
                </div>

                <div class="trip-guests">
                    <h1>Guests</h1>
                    <div class="guests">
                        {{ guests }} guests
                    </div>
                </div>

            </section>
            <div class="btn-container">
                <div v-for="i in 100" class="cell"></div>
                <div class="content">
                    <button type="submit" class="action-btn">
                        <span>Confirm order</span>
                    </button>
                </div>
            </div>
        </div>

        <section class="price-details">
            <div class="top-section">

                <div class="details-img">
                    <img :src="order.stay.img[0]">
                </div>
                <div class="second">
                    <div class="host-img">
                        <!-- <img :src="order.host.imgUrl"> -->
                        <img :src="setHostImg">
                    </div>

                    <div class="stay-name">{{ order.stay.name }}
                    </div>
                </div>
            </div>
            <div class="middle-section">
                <div class="text">Your booking is protected by
                    <img src="https://res.cloudinary.com/dj88xudav/image/upload/v1670001241/share-cover_drqj1d.png"
                        alt="share-cover" class="share-cover-img" />
                </div>
            </div>
            <div class="bottom-section">
                <div class="bottom-title">
                    <h1>Price details</h1>
                </div>
                <div class="price">
                    <span>price for {{ totalNights }} nights </span>
                    <span>${{ order.priceObj.basePrice }} </span>
                </div>
                <div class="price">
                    <span>Cleaning fee </span>
                    <span>${{ order.priceObj.CleaningFee }} </span>
                </div>
                <div class="price">
                    <span>Service fee </span>
                    <span>${{ order.priceObj.serviceFee }} </span>
                </div>
                <div class="price">
                    <span>Taxes </span>
                    <span>${{ order.priceObj.taxes }} </span>
                </div>
                <div class="price total">
                    <span>Total price </span>
                    <span>${{ order.totalPrice }} </span>
                </div>

            </div>

        </section>

    </section>
</template>
<script>
export default {
    data() {
        return {
            currStay: null,
            host: null,
            order: null,
            guests: 0
        }
    },
    created() {
        let currOrder = this.$store.dispatch({ type: "getOrderById", orderId: this.$route.params.id });
        currOrder.then(res => this.setOrder(res))
        // this.oreder = currOrder
    },
    computed: {
        stayName() {
            return (this.currStay) ? this.currStay.name : this.stayName;
        },
        setHostImg() {
            return 'https://res.cloudinary.com/sprint4-triman/image/upload/v1669793675/elon_mask_ltbtp6.jpg'
        },
        totalNights() {
            let time = this.order.startDate - this.order.endDate
            let days = (time * - 1) / (1000 * 60 * 60 * 24)

            const { adults, children, infants, pets } = this.order.guests
            let guests = adults + children + infants + pets
            this.guests = guests
            return days
        },
        setDatesStart() {
            let dateStart = new Date(this.order.startDate)
            let date = dateStart.toLocaleDateString()
            return date
        },
        setDatesEnd() {
            let dateEnd = new Date(this.order.endDate)
            let date = dateEnd.toLocaleDateString()
            return date
        },
    },
    methods: {
        setOrder(currOrder) {
            this.order = currOrder
            console.log(this.order);

        },



    }

}

</script>