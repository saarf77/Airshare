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
      <div class="modal-btns-container" >
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
        <div class="expand-order" @click="disableOrderBtn" v-html="orderArrow" >
        </div>
    </label>
    <input disabled :value="guestTxt"/>
</div>
</div>
<div class="cell"></div>
<div class="cell"></div>

<div @click="orderConfirm" class="btn-container" ref="elOrderBtn">
    <div v-for="i in 100" class="cell"></div>
    <div class="content">
        <button class="action-btn" v-html="btnStatus">
        </button>
        
    </div>
</div>

<div class="flex column guest-add" v-if="isShow" v-click-away="onClickAway">
            <div class="row-card flex">
        <div class="lft-crd">
        <span class="title-sm"> Adults</span>
        <span class="txt-sm">Ages 13+</span>
      </div>
      <div class="rit-crd adults-btns">
        <button @click.stop="updateGuests('adults', -1)">
                <span> - </span>
            </button>
            <span  class="guests-count">{{ this.guestsObj.adults }}</span>
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
        <div class="rit-crd children-btns">
              <button @click.stop="updateGuests('children', -1)">
                <span> - </span>
            </button>
            <span  class="guests-count">{{guestsObj.children }}</span>
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
            <div class="rit-crd infants-btns">
                <button @click.stop="updateGuests('infants', -1)">
                    <span> - </span>
                </button>
                <span class="guests-count">{{ this.guestsObj.infants }}</span>
                <button @click.stop="updateGuests('infants', 1)">
                    <span> + </span>
                </button>
            </div>
        </div>
        <div class="row-card flex">
            <div class="lft-crd">
                <span class="title-sm"> Pets</span>
                <span class="txt-sm animal">Bringing a service animal?</span>
            </div>
            <div class="rit-crd pets-btns">
                <button @click.stop="updateGuests('pets', -1)">
                    <span> - </span>
                </button>
                <span class="guests-count">{{ this.guestsObj.pets }}</span>
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
  <div class="error-report" v-html="errorReport"></div>
  <div class="price-section">
    <div class="calming-alert">You won't be charged yet</div>
    <div><span>Base price:</span><span>{{this.priceObj.basePrice}}$</span></div>
    <div><span>Cleaning fee:</span><span> {{this.priceObj.CleaningFee}}$</span></div>
    <div><span>Service fee:</span><span> {{this.priceObj.serviceFee}}$</span></div>
    <div><span>Taxes: </span><span> {{this.priceObj.taxes}}$</span></div>
    <div><span>Total price:</span><span>{{totalPrice}}$</span></div>
  </div>
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
        guestsObj: {
            adults: 1,
            children: 0,
            infants: 0,
            pets: 0,
        },
        guestTxt: '1 guest',
        error: ''
      };
    },
    components:{
        svgService,
        utilService,
    },
    computed: {
      btnStatus(){
        return (this.currDates.startDay + this.currDates.endDay !== 0 )? '<span>Reserve</span>' : '<span>Check availability</span>';
            },
      orderArrow(){
        return (this.isShow)? svgService.getSvgIcon('upArrow') : svgService.getSvgIcon('downArrow');
      },
      totalPrice(){
        let sum = this.priceObj.basePrice + this.priceObj.CleaningFee + this.priceObj.taxes
        return sum;
      },
        errorReport(){
        return `<span class="current-errors">${this.error} </span>`
       },
      guestsCount() {
        return 'Add guests';
      },
      checkIn() {
        if (this.currDates.startDay === 0) return "Add date";
        return new Date(this.currDates.startDay).toLocaleDateString()
      },
      checkOut() {
        if (this.currDates.endDay === 0) return "Add date";
        return new Date(this.currDates.endDay).toLocaleDateString()
        },
    },
    methods: {
      calcPayments(){
          if(this.hasCalcPrice){
            let pricePerDay = (this.guestsObj.adults + this.guestsObj.children) * 150;
            this.priceObj.basePrice = this.currDates.daysNum * pricePerDay;
            this.priceObj.serviceFee = parseFloat(((this.priceObj.basePrice + this.priceObj.CleaningFee) * 1/7.05).toFixed(2));
            this.priceObj.taxes = parseFloat(((this.priceObj.basePrice + this.priceObj.CleaningFee + this.priceObj.serviceFee) * 0.07).toFixed(2));
          }
        },
      updateGuests(type, number) {
          switch (type) {
            case 'adults':
            if(number > 0 && this.guestsObj.adults < 8){
              this.guestsObj.adults += number;
            } else if(number < 0 && this.guestsObj.adults > 1){
              this.guestsObj.adults += number;
            }
              break;
            case 'children':
              if(number > 0 && this.guestsObj.children < 8){
                this.guestsObj.children += number;
              } else if(number < 0 && this.guestsObj.children > 0){
                this.guestsObj.children += number;
              }
              break;
            case 'infants':
              if(number > 0 && this.guestsObj.infants < 5){
                this.guestsObj.infants += number;
              } else if(number < 0 && this.guestsObj.infants > 0){
                this.guestsObj.infants += number;
              }
              break;
            case 'pets':
                if(number > 0 && this.guestsObj.pets < 5){
                  this.guestsObj.pets += number;
                } else if(number < 0 && this.guestsObj.pets > 0){
                  this.guestsObj.pets += number;
                }
              break;
            default:
              break;
          }
          (this.guestsObj.adults + this.guestsObj.children === 1)? this.guestTxt = `1 guest `: this.guestTxt = `${this.guestsObj.adults + this.guestsObj.children} guests `;
          if(this.guestsObj.infants > 0) this.guestTxt +=`, ${this.guestsObj.infants} infants `;
          if(this.guestsObj.pets > 0) this.guestTxt +=`, ${this.guestsObj.pets} pets `;
          this.calcPayments();
          console.log('this.priceObj.basePrice', this.priceObj.basePrice);
          
      },
      onClickAway(event) {
        this.isShow = false;
      },
      sendOrder() {
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

        if(this.currDates.endDay + this.currDates.startDay !== 0) this.error = '';
      },
      openConfirm(){
        if(this.currDates.endDay + this.currDates.startDay === 0) this.error = 'please select dates';
        console.log(this.error);
      }
  },
  watch: {
      isShow(newValue, oldValue){
            if(!newValue){
              this.$refs.elOrderBtn.classList.value = 'btn-container'
            } else {
              this.$refs.elOrderBtn.classList += ' hidden'
            }
        }
    }
};
  </script>
  