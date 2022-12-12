<template>
    <section class="payment-page">
        <div class="left-side">

            <div class="payment-title">
                <h1>Thank you for booking</h1>
            </div>
            <section class="good-deal">
                <div class="title">
                    <h3>Good price</h3>
                     <svg class="diamond" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: rgb(227, 28, 95); stroke: currentcolor;"><g stroke="none"><path d="m32.62 6 9.526 11.114-18.146 23.921-18.147-23.921 9.526-11.114z" fill-opacity=".2"></path><path d="m34.4599349 2 12.8243129 14.9616983-23.2842478 30.6928721-23.28424779-30.6928721 12.82431289-14.9616983zm-17.9171827 16h-12.52799999l18.25899999 24.069zm27.441 0h-12.528l-5.73 24.069zm-14.583 0h-10.802l5.4012478 22.684zm-15.92-12.86-9.30799999 10.86h11.89399999zm19.253-1.141h-17.468l2.857 12.001h11.754zm1.784 1.141-2.586 10.86h11.894z"></path></g></svg>
                </div>
                <div class="deal-content">
                    <p>Your dates are <span>${{getDiscount}}</span> less than the avg. nightly rate over the last 3 months.</p>
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
            <div @click="backToPage" class="btn-container">
                <div v-for="i in 100" class="cell"></div>
                <div class="content">
                    <button type="submit" class="action-btn">
                        <span>Look for more homes</span>
                    </button>
                </div>
            </div>
        </div>

        <section class="price-details">
            <div class="top-section">

                <div class="details-img">
                    <img :src="setImg">
                </div>
                <div class="second">
                    <div class="host-img">
                        <!-- <img :src="setHostImg"> -->
                    </div>

                    <div class="stay-name">{{ setName }}
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
                    <span>${{ basePrice }} </span>
                </div>
                <div class="price">
                    <span>Cleaning fee </span>
                    <span>${{ cleaningPrice }} </span>
                </div>
                <div class="price">
                    <span>Service fee </span>
                    <span>${{ servicesPrice }} </span>
                </div>
                <div class="price">
                    <span>Taxes </span>
                    <span>${{ taxesPrice }} </span>
                </div>
                <div class="price total">
                    <span>Total price </span>
                    <span>${{ totalPrice }} </span>
                </div>

            </div>

        </section>

    </section>
</template>
<script>
    import {utilService} from '../services/util.service.js'
    import { ElMessage } from 'element-plus';
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
        this.$store.dispatch({ type: "getOrderById", orderId: this.$route.params.id });
        // currOrder.then(res => this.setOrder(res))
        // this.oreder = currOrder
    },
    computed: {
        basePrice(){
           return (this.setOrder?.priceObj?.basePrice)?this.setOrder.priceObj.basePrice.toLocaleString():''
        },
        servicesPrice(){
           return (this.setOrder?.priceObj?.serviceFee)?this.setOrder.priceObj.serviceFee.toLocaleString():''
        },
        cleaningPrice(){
           return (this.setOrder?.priceObj?.CleaningFee)?this.setOrder.priceObj.CleaningFee.toLocaleString():''
        },
        taxesPrice(){
           return (this.setOrder?.priceObj?.taxes)?this.setOrder.priceObj.taxes.toLocaleString():''
        },
        totalPrice(){
            return (this.setOrder?.totalPrice)? this.setOrder.totalPrice.toLocaleString():''
        },
        setName(){
         return (this.setOrder?.stay?.name)?this.setOrder.stay.name:''
        },
        setOrder(){
            return this.$store.getters.getCurrOrder
        },
        getDiscount(){
            return utilService.getRandomIntInclusive(100 , 250)
        },
        stayName() {
            return (this.currStay) ? this.currStay.name : this.stayName;
        },
        setHostImg() {
            return 'https://res.cloudinary.com/sprint4-triman/image/upload/v1669793675/elon_mask_ltbtp6.jpg'
        },
        totalNights() {
            let timeStart = (this.setOrder?.startDate)?this.setOrder.startDate:''
            let timeEnd = (this.setOrder?.endDate)?this.setOrder.endDate:''
            let time = timeStart - timeEnd
            let days = (time * - 1) / (1000 * 60 * 60 * 24)

            const { adults, children, infants, pets } = (this.setOrder?.guests)?this.setOrder?.guests:''
            let guests = adults + children + infants + pets
            this.guests = guests
            return days
        },
        setDatesStart() {
            let dateStart = new Date((this.setOrder?.startDate)?this.setOrder.startDate:'')
            let date = dateStart.toLocaleDateString()
            return date
        },
        setDatesEnd() {
            let dateEnd = new Date((this.setOrder?.endDate)?this.setOrder.endDate:'')
            let date = dateEnd.toLocaleDateString()
            return date
        },
        setImg(){
            return (this.setOrder?.stay?.img[0])?this.setOrder.stay.img[0]:''
        },
        
    },
    methods: {
        backToPage(){
            this.$router.push('/')
            ElMessage.success('Order sent!')
        },
        
        // setOrder(currOrder) {
        //     this.order = currOrder
        //     console.log(this.order);

        // },



    }

}

</script>