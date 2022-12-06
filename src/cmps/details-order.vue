<template>
<div v-if="isConfirm" class="order-alert-overlay"></div>

<section class="order-confirmation-modal" :class="{ showConfirm: isConfirm }">
    <div class="confirmation-details">
      <div class="confirm-title-container">
        <p class="confirm-title">Last step</p>
        <h1 class="confirm-text">Dear Guest,</h1>
        <h1 class="confirm-text">please confirm your trip details. </h1>
      </div>
      <div class="reservation-details-container">
        <div class="trip-details-container flex column">
          <h1 class="reservation-details-title">Reservation details</h1>
          <span class="mini-trip-title">Trip dates:</span>
          <span class="mini-trip-title">Guests:</span>

          <div class="price-details-container flex column">
            <h1 class="mini-trip-title">Price Details</h1>
            <div class="price-per-night flex justify-space-between">
            </div>

            <div class="service flex justify-space-between">
              <h1 class="mini-trip-detail">Service fee</h1>
            </div>
            <div class="total-price flex justify-space-between">
              <h1 class="mini-trip-detail">Total</h1>
            </div>
          </div>
        </div>

        <div class="order-stay-details flex column">
          <img class="order-stay-image" :src="imgOrder">
        </div>

      </div>
      <div class="modal-btns-container">
        <div class="cell"></div>
        <div class="cell"></div>
        <div @click.prevent="sendOrder" class="btn-container">
          <div v-for="i in 100" class="cell"></div>
          <div class="content">
            <button class="action-btn">
              <span>Confirm</span>
            </button>
          </div>
        </div>

        <div @click="isConfirm = false" class="sign-up-continue go-back">
          <el-button size="large">Back</el-button>
        </div>
      </div>
      </div>
  </section>

  <section class="order-container sticky" :class="{extended: this.hasCalcPrice}">
      <div class="order-form-header">
      </div>
        <div class="order-data">
        <v-date-picker color="gray" is-range :columns="2" @dayclick="onDatePicked">
          <template v-slot="{ inputValue, inputEvents }">
            <div class="flex justify-center items-center">
              <div class="date-picker">
                <div class="date-input">
                  <label>CHECK-IN</label>
                  <input :placeholder="checkIn" :value="inputValue.start" v-on="inputEvents.start"
                    class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"/>
                </div>
  
                <div class="date-input" >
                  <label>CHECK-OUT</label>
                  <input :placeholder="checkOut" :value="inputValue.end" v-on="inputEvents.end"
                    class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"/>
                </div>
            </div>
        </div>
    </template>
</v-date-picker>
<div @click="isShow = !isShow" class="guest-input">
    <label>GUESTS
        <div class="expand-order">
          <span v-if="isShow" class="material-icons-outlined" :class="{ flip: !isShow }"> expand_less </span>
          <span v-if="!isShow" class="material-icons-outlined" :class="{ flip: !isShow }"> expand_more </span>
        </div>
    </label>
    <input disabled :placeholder="gu" />
</div>
</div>
<div class="cell"></div>
<div class="cell"></div>

<div @click="openConfirm" class="btn-container">
    <div v-for="i in 100" class="cell"></div>
    <div class="content">
        <button class="action-btn">
            <span>Reserve</span>
        </button>
        
    </div>
</div>

<div class="flex column guest-add" v-if="isShow" v-click-away="onClickAway">
            <div class="row-card flex">
        <div class="lft-crd">
        <span class="title-sm"> Adults</span>
        <span class="txt-sm">Ages 13+</span>
      </div>
      <div class="rit-crd guests-btns">
        <button @click.stop="updateGuests('adults', -1)">
                <span> - </span>
            </button>
            <span  class="guests-count">{{ trip.guests.adults }}</span>
            <button @click.stop="updateGuests('adults', 1)">
                <span> + </span>
            </button>
        </div>
        </div>
    <div class="row-card flex">
        <div class="lft-crd">
            <span class="title-sm"> Children</span>
            <span class="txt-sm">Ages 2–12</span>
        </div>
        <div class="rit-crd guests-btns">
              <button @click.stop="updateGuests('children', -1)">
                <span> - </span>
            </button>
            <span  class="guests-count">{{ trip.guests.children }}</span>
            <button @click.stop="updateGuests('children', 1)">
              <span> + </span>
            </button>
        </div>
        </div>
        <div class="row-card flex">
            <div class="lft-crd">
                <span class="title-sm"> Infants</span>
                <span class="txt-sm">Under 2</span>
            </div>
            <div class="rit-crd guests-btns">
                <button @click.stop="updateGuests('Infants', -1)">
                    <span> - </span>
                </button>
                <span class="guests-count">{{ trip.guests.Infants }}</span>
                <button @click.stop="updateGuests('Infants', 1)">
                    <span> + </span>
                </button>
            </div>
        </div>
        <div class="row-card flex">
            <div class="lft-crd">
                <span class="title-sm"> Pets</span>
                <span class="txt-sm animal">Bringing a service animal?</span>
            </div>
            <div class="rit-crd guests-btns">
                <button @click.stop="updateGuests('pets', -1)">
                    <span> - </span>
                </button>
                <span class="guests-count">{{ trip.guests.Infants }}</span>
                <button @click.stop="updateGuests('pets', 1)">
                    <span> + </span>
                </button>
            </div>
        </div>
        <div class="flex under-line close-btn">
          <button @click="isShow = !isShow">
            Close
        </button>
  
    </div>
</div>
<!-- <div class="report" v-html="reportListing"></div> -->
            <div class="price-section">
              <div class="calming-alert">You won't be charged yet</div>
              <div><span>Base price:</span><span>{{this.priceObj.basePrice}}$</span></div>
              <div><span>Cleaning fee:</span><span> {{this.priceObj.CleaningFee}}$</span></div>
              <div><span>Service fee:</span><span> {{this.priceObj.serviceFee}}$</span></div>
              <div><span>Taxes: </span><span> {{this.priceObj.taxes}}$</span></div>
              <div><span>Total price:</span><span>{{totalPrice}}$</span></div>
            </div>
</section>
<section >
</section>
</template>
  
  <script>

import { svgService } from '../services/svg.service.js';
  import { ElMessage } from 'element-plus';
  import { utilService } from '../services/util.service.js';
  
  export default {
    name: ' order-details',
    props: ['orderStay'],
    data() {
      return {
        
        currDates: {
          startDay: 0,
          endDay: 0,
          daysNum: 0,
          isFirst: true,
        },
        hasCalcPrice: false,
        priceObj: {
          basePrice: 0,
          CleaningFee: 572 + utilService.getRandomIntInclusive(-70,70),
          serviceFee: 0,
          taxes: 0,
          priceSum: 0
        },
        isConfirm: false,
        isShow: false,
        trip: {
            guests: {
            adults: 1,
            children: 0,
            Infants: 0,
           
          },
          dates: {},
        },
      };
    },
    components:{
        svgService,
        utilService,
    },
    computed: {
      totalPrice(){
        let sum = this.priceObj.basePrice + this.priceObj.CleaningFee + this.priceObj.taxes
        return sum;
      },
        reportListing(){
        return svgService.getSvgIcon('flagIcon') +' Report this listing'
       },
      reviewsCount() {
        return this.orderStay.reviews.length;
      },
      dateCheck() {
        return Object.keys(this.trip.dates).length;
      },
      formatCheck() {
        return new Date(this.trip.dates.start).toLocaleDateString()
      },
  
      guestCount() {
        const { children, adults, Infants } = this.trip.guests
        return children + adults + Infants;
      },
  
      formatCheckOut() {
        return new Date(this.trip.dates.end).toLocaleDateString()
      },
  
      guestsCount() {
        const { children, adults, Infants , pets } = this.trip.guests
  
        const guestsCount = children + adults + Infants + pets;
        if (guestsCount >= 1) this.guestNum =  guestsCount + ' guests';
        else return 'Add guests';
      },
      checkIn() {
        if (!this.trip.dates[0]) return "Add date"
        else return this.trip.dates[0]
      },
      checkOut() {
        if (!this.trip.dates[1]) return "Add date"
        else return this.trip.dates[1]
        },
    },
    methods: {
      calcPayments(){
          if(this.hasCalcPrice){
            this.priceObj.basePrice = this.currDates.daysNum * 150;
            this.priceObj.serviceFee = parseFloat(((this.priceObj.basePrice + this.priceObj.CleaningFee) * 1/7.05).toFixed(2));
            this.priceObj.taxes = parseFloat(((this.priceObj.basePrice + this.priceObj.CleaningFee + this.priceObj.serviceFee) * 0.07).toFixed(2));
          }
        },
      updateGuests(type, number) {
        const { children, adults, Infants } = this.trip.guests
     
        const guestsCount = children + adults + Infants;
        if (this.trip.guests[type] === 0 && number === -1) return;
        if (this.orderStay.capacity === guestsCount && number == 1) return ElMessage.error('You over the guests capacity');
      
        this.trip.guests[type] += number;
        console.log(this.trip.guests[type]);

      },
      openConfirm() {
        const loggedinUser = this.$store.getters.loggedinUser;
        if (!loggedinUser) return ElMessage.error("log in first");
  
        if (this.dateCheck === 0) return ElMessage.error('Fill check in and check out date ')
        const { adults, children, Infants } = this.trip.guests
        if (children === 0 && adults === 0) return ElMessage.error('Add guests! ')
        this.isConfirm = true
      },
      onClickAway(event) {
        this.isShow = false
        },
        sendOrder() {
        const time = JSON.parse(JSON.stringify(this.trip.dates));
        const { start, end } = time;
        const loggedinUser = this.$store.getters.loggedinUser;
        const { adults, children, Infants,pets } = this.trip.guests

      let order = {
        hostId: this.orderStay.host._id,
        stay_Id: this.orderStay._id,
        createdAt: Date.now(),
        price: totalPrice,
        startDate: start,
        endDate: end,
        status: 'pending'
      }

      this.$store.dispatch({ type: "saveOrder", order, status: 'pending' });
      ElMessage.success('Order send!')
      setTimeout(() => this.$router.push('/'), 1000);
    },
    onDatePicked(day){
      if(this.currDates.isFirst){
        this.currDates.startDay =  new Date(day.id).getTime();
        this.currDates.isFirst = false;
      } else{
        this.currDates.endDay = new Date(day.id).getTime();
        this.currDates.isFirst = true;
        this.hasCalcPrice = true;
        this.currDates.daysNum = Math.ceil((this.currDates.endDay - this.currDates.startDay)/86400000);
        this.calcPayments();
      }
    }
  },
};
  </script>
  