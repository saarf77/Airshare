<template>
  <div class="overlay"></div>
  <header class="main-header flex column" :class="{ sticky: isSticky }">
    <div class="nav-wrapper" :class="{ expend: isExpend }">
      <div :class="{ container: headerLocation, 'inner-container': !headerLocation }">
        <nav class="top-nav flex justify-space-between align-center">
          <div class="desktop-view">
            <router-link class="logo" to="/">
              <div class="main-logo flex">
                <div><img class="logo-img" src="../assets/icons/airbnb-logo.svg" /></div>
                <h1 @click="showList">airshare</h1>
              </div>
            </router-link>
            <div class="explore-filter">
              <explore-filter :isExpend="isExpend" @expend-form="expendForm" />
            </div>
            <div class="last-section-nav flex align-center">
              <a class="right-header become-host" href="/#/login">Become a host</a>

              <a class="right-header" href="/#/explore"><img class="explore-btn" src="../assets/icons/en.svg" /></a>
              <div class="user-menu-btn">
                <button @click="showMenu = !showMenu" class="nav-btn expend flex">
                  <img class="menu-btn" src="../assets/icons/menu.svg" />
                  <img class="host-image" :src="userImg" />
                </button>
              </div>
              <div class="user-nav" v-if="showMenu" v-click-away="onClickAway">
                <div class="user-nav-in">
                  user nav
                </div>
              </div>
            </div>
          </div>
          <div v-if="!desktop" class="mobile-view">
            <div class="mobile-nav">
              <div class="search-icon">
                <span><img src="../assets/icons/search-icon.svg" @click="search" /></span>
              </div>
              <div class="mobile-content">
                <input class="mobile-sech-title" type="text" placeholder="Where to?" input="searchCountry"
                  v-model="country">

              </div>
              <div class="adjustment-bar">
                <span @click="isShow = !isShow"><img src="../assets/icons/adjustment-icon.svg" /></span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div v-if="headerLocation" :class="{ 'hide-expend': isExpend }"
      class="header-labels flex justify-space-between align-center">
      <div class="container">
      </div>
    </div>
  </header>
  <div v-if="isShow" class="overlay"></div>
</template>


<script>
import exploreFilter from './explore-filter.vue';
import exploreLabels from './explore-labels.vue';
// import standAloneFilter from './standAlone-filter.vue';
import { eventBus } from '../services/event-bus.service.js';

export default {
  data() {
    return {
      isShow: false,
      location: false,
      isSticky: false,
      isExpend: false,
      showMenu: false,
      isExplore: false,
      desktop: window.innerWidth > 750 ? true : false,
      path: null,
      country: '',
      staysLength: null
    }
  },
  created() {

  },

  destroyed() {

  },

  computed: {
    headerLocation() {
      let { params, path } = this.$route || {};
      this.isExplore = path !== '/';
      this.path = path;
      let isEmpty = Object.keys(params).length === 0;
      return isEmpty;
    },

    userImg() {
      var user = this.$store.getters.loggedinUser;
      return user ? user.imgUrl : 'https://res.cloudinary.com/nisan/image/upload/v1658872030/air2b/unprofile_ji7zus.png';
    },

  },

  methods: {

  },

  watch: {
    isShow: function () {
      if (this.isShow) {
        document.documentElement.style.overflow = 'hidden';
        return;
      }
      document.documentElement.style.overflow = 'auto';
    },
  },

  components: {
    exploreFilter,
    exploreLabels,
    // standAloneFilter,
    eventBus,
  },
  setup() { },
};
</script>