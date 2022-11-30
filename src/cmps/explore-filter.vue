<template>
  <div class="search-wrapper flex">
    <div v-show="!isExpend" data-expend="expend" @click.prevent="expendForm(true)"
      class="filter-preview flex align-center">
      <div class="filter btn header-location">Anywhere</div>
      <div class="filter btn header-time">Any week</div>
      <div class="filter btn header-guests search" value="hellow">Add guests <span><img
            src="../assets/icons/search-icon.svg" /></span>
      </div>
    </div>
    <div v-show="isExpend" class="filter-expend flex">
      <div class="navigation">
        <a href="http://">Stays</a>
        <a href="http://">Experiences</a>
        <a href="http://">Online Experiences</a>
      </div>
      <el-form :model="filterBy">
        <div @click="activeTab('where')" class="filter-option where" data-field="where"
          :class="{ 'active-btn': isExpend ? isActive : !isActive }">
          <label for="where">Where</label>

          <input id="where" list="where" name="where" v-model="filterBy.where" placeholder="Search destination" />

        </div>
        <div class="filter-option check">
          <div class="labels-wrap">
            <v-date-picker :columns="2" v-model="filterBy.date" is-range>
              <template v-slot="{ inputValue, inputEvents }">
                <div class="flex justify-center items-center">
                  <div @click.native="activeTab('checkin')" class="checkin" data-field="checkin"
                    :class="{ 'hover-btn': isExpend ? isHover : !isHover, 'active-btn': startActive }">
                    <label for="checkin">Check in</label>
                    <input name="checkin" :value="inputValue.start" v-on="inputEvents.start" placeholder="Add dates"
                      class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300" />
                  </div>
                  <!-- add choose dates and im flexible to the date picker -->
                  <div :class="{ 'active-btn': endActive }" class="checkout" @click.native="activeTab('checkout')">
                    <label for="checkout">Check out</label>
                    <input name="checkout" :value="inputValue.end" v-on="inputEvents.end" placeholder="Add dates"
                      class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300" />
                  </div>
                  <!-- todo: -->
                  <span>exact dates</span>
                  <span>1 day</span>
                  <span>2 days</span>
                  <span>3 days</span>
                  <span>7 days</span>

                </div>
              </template>
            </v-date-picker>
          </div>
        </div>
        
        <div @click.native="activeTab('guest')" class="filter-option guest-dropdown"
          :class="{ 'active-btn': guestActive }">
          <div @click="dropDownMenu($event)" class="add-guest-wrapper">
            <label for="add-guest">Who</label>
            <input disabled type="text" data-field="guest" placeholder="Add guests" />
          </div>

          <div @click="formSubmit" class="order-container header-filter-search">
            <div class="btn-container on-filter">
              <div v-for="i in 100" class="cell"></div>
              <div class="content filter-content">
                <button class="action-btn">
                  <!-- <div class="material-icons search"> search </div> -->
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>

  <div v-if="showModal" v-click-away="onClickAway" class="guests-modal dropdown-card order-container">
    <div class="row-card flex">
      <div class="lft-crd">
        <span class="title-sm"> Adults</span>
        <span class="txt-sm">Ages 13 or above</span>
      </div>
      <div class="rit-crd guests-btns">
        <button @click.stop="updateGuests('adults', -1)">
          <span> - </span>
        </button>
        <span>{{ filterBy.guests.adults }}</span>
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
        <span>{{ filterBy.guests.children }}</span>
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
        <button @click.stop="updateGuests('infants', -1)">
          <span> - </span>
        </button>
        <span>{{ filterBy.guests.infants }}</span>
        <button @click.stop="updateGuests('infants', 1)">
          <span> + </span>
        </button>
      </div>
    </div>
    <div class="row-card flex">
      <div class="lft-crd">
        <span class="title-sm"> Pets</span>
        <span class="txt-sm service-animal">Bringing a service animal?</span>
      </div>
      <div class="rit-crd guests-btns">
        <button @click.stop="updateGuests('pets', -1)">
          <span> - </span>
        </button>
        <span>{{ filterBy.guests.pets }}</span>
        <button @click.stop="updateGuests('pets', 1)">
          <span>+</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../services/event-bus.service';

export default {
  emits: ['expendForm'],
  name: 'explore-filter',
  props: {
    isExpend: Boolean,
  },
  data() {
    return {
      filterBy: {
        where: '',
        date: [],
        guests: {
          adults: 0,
          children: 0,
          infants: 0,
          pets: 0,
        },
      },
      showModal: false,
      isShow: false,
      isActive: true,
      isHover: true,
      currentActive: false,
      guestActive: false,
      startActive: false,
      endActive: false,
      expend: this.isExpend,
      firstClick: null,
    };
  },
  methods: {
    activeTab(value, ev) {

      if (value === 'where') {
        this.isActive = true;
        this.startActive = false;
        this.endActive = false;
        this.guestActive = false;
      }
      if (value === 'guest') {
        this.isActive = false;
        this.guestActive = true;
        this.startActive = false;
        this.endActive = false;
      }

      if (value === 'checkin') {
        this.isActive = false;
        this.guestActive = false;
        this.startActive = true;
        this.endActive = false;
        this.isHover = false;
      }
      if (value === 'checkout') {
        this.isActive = false;
        this.guestActive = false;
        this.startActive = false;
        this.endActive = true;
      }
    },
 
  },

  created() {
    eventBus.on('closeModal', data => {
      this.showModal = data;
      this.isActive = true;
      this.guestActive = false;
      this.startActive = false;
      this.endActive = false;
      this.isHover = true;
    });
  },

  components: {
  },
};
</script>
