<template>
    <div v-if="isConfirm" class="order-alert-overlay"></div>
    <section class="order-container sticky">
        <div class="order-form-header">
        </div>
        <!-- Date !! -->
        <div class="order-data">
            <v-date-picker color="gray" v-model="trip.dates" is-range :columns="2">
                <template v-slot="{ inputValue, inputEvents }">
                    <div class="flex justify-center items-center">
                        <div class="date-picker">
                            <div class="date-input">
                                <label>CHECK-IN</label>
                                <input :placeholder="checkIn" :value="inputValue.start" v-on="inputEvents.start"
                                    class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300" />
                            </div>

                            <div class="date-input">
                                <label>CHECK-OUT</label>
                                <input :placeholder="checkOut" :value="inputValue.end" v-on="inputEvents.end"
                                    class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300" />
                            </div>
                        </div>
                    </div>
                </template>
            </v-date-picker>
            <!--  -->

            <div @click="isShow = !isShow" class="guest-input">
                <label>GUESTS
                    <div class="expand-order">
                        <span class="material-icons-outlined" :class="{ flip: !isShow }"> expand_less </span>
                    </div>
                </label>
                <input disabled :placeholder="guestsCount" />
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

            <div class="guests-container flex justify-space-between align-center">
                <div class="flex column titles">
                    <h5>Adults</h5>
                    <span>Age 13+</span>
                </div>
                <div class="guests-btns flex align-center justify-space-between">
                    <button @click.stop="updateGuests('adults', -1)">
                        <span> - </span>
                    </button>
                    <span>{{ trip.guests.adults }}</span>
                    <button @click.stop="updateGuests('adults', 1)">
                        <span> + </span>
                    </button>
                </div>

            </div>
            <div class="guests-container flex justify-space-between align-center">
                <div class="flex column titles">
                    <h5>Children</h5>
                    <span>Ages 2-12</span>
                </div>
                <div class="guests-btns flex align-center justify-space-between">
                    <button @click.stop="updateGuests('children', -1)">
                        <span> - </span>
                    </button>
                    <span>{{ trip.guests.children }}</span>
                    <button @click.stop="updateGuests('children', 1)">
                        <span> + </span>
                    </button>
                </div>
            </div>

            <div class="guests-container flex justify-space-between align-center">
                <div class="flex column titles">
                    <h5>Infants</h5>
                    <span>Under 2</span>
                </div>
                <div class="guests-btns flex align-center justify-space-between">
                    <button @click.stop="updateGuests('Infants', -1)">
                        <span> - </span>
                    </button>
                    <span>{{ trip.guests.Infants }}</span>
                    <button @click.stop="updateGuests('Infants', 1)">
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

        <div class="report" v-html="reportListing"></div>
    </section>
    <section>
    </section>
</template>
  
<script>

import { svgService } from '../services/svg.service.js';
import { ElMessage } from 'element-plus';
import { utilService } from '../services/util.service.js';

export default {
    name: ' order-details',
    props: { stay: { type: Object } },
    data() {
        return {
            isConfirm: false,
            totalPriceSum: 0,
            isShow: false,
            trip: {
                guests: {
                    adults: 1,
                    children: 0,
                    Infants: 0
                },
                dates: {},
            },
            fee: 1.10,
            serviceFee: null,
            daysTotal: null,
            totalPriceWithFee: null
        };
    },
    created() {

    },
    components: {
        svgService,
    },
    computed: {
        reportListing() {
            return svgService.getSvgIcon('flagIcon') + ' Report this listing'
        },
        reviewsCount() {
            return this.stay.reviews.length;
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
            const { children, adults, Infants } = this.trip.guests

            const guestsCount = children + adults + Infants;
            if (guestsCount >= 1) return guestsCount + ' guests';
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
        updateGuests(type, number) {
            const { children, adults, Infants } = this.trip.guests
            const guestsCount = children + adults + Infants;
            if (this.trip.guests[type] === 0 && number === -1) return;
            this.trip.guests[type] += number;
        },
        onClickAway(event) {
            this.isShow = false
        }
    },
};
</script>
  