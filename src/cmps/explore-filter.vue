<template>
  <div class="search-wrapper flex">
    <div v-show="!isExpend" data-expend="expend" @click.prevent="expendForm(true)"
      class="filter-preview flex align-center">
      <div class="filter btn header-location">Anywhere</div>
      <div class="filter btn header-time">Any week</div>
      <div class="filter btn header-guests search" value="hellow">Add guests <span><img src="../assets/icons/search-icon.svg" /></span>
      </div>
    </div>
    <div  class="filter-expend flex">
      <div class="navigation">
        <!-- routerlinks -->
        <a href="http://">Stays</a>
        <a href="http://">Experiences</a>
        <a href="http://">Online Experiences</a>
      </div>
      <el-form :model="filterBy">
        <div class="filter-option where" data-field="where"
          :class="{ 'active-btn': isExpend ? isActive : !isActive }">
          <label for="where">Where</label>
          <input id="where" list="where" name="where" v-model="filterBy.where" placeholder="Search destination" />
        </div>
        <!-- <div class="filter-option check">
          <div class="labels-wrap">
            <v-date-picker :columns="2" v-model="filterBy.date" is-range>
            </v-date-picker>
          </div>
        </div> -->
        <div @click.native="activeTab('guest')" class="filter-option guest-dropdown"
          :class="{ 'active-btn': guestActive }">
          <div @click="dropDownMenu($event)" class="add-guest-wrapper">
            <label for="add-guest">Who</label>
            <input disabled type="text" data-field="guest" placeholder="Add guests" />
          </div>
          <div  class="order-container header-filter-search">
            <div class="btn-container on-filter">
              <div class="content filter-content">
                <button class="action-btn">
                  <div class="search"> search </div>
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>


</template>

<script>
// import { eventBus } from '../services/event-bus.service';

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

    };
  },
  methods: {

  },



  components: {
    // exploreMaps,
  },
};
</script>
