<template>
  <div v-if="isExpend" class="overlay"></div>

  <!-- <Transition name="bounce"> </Transition> -->
  <header class="main-header flex column" :class="{ sticky: isSticky }">
    <div class="nav-wrapper" :class="{ expend: isExpend }">
      <div :class="{ container: headerLocation, 'inner-container': !headerLocation }">
        <nav class="top-nav flex justify-space-between align-center">
          <div v-if="desktop" class="desktop-view">
            <router-link class="logo" to="/">
              <div class="main-logo flex">
                <div><img class="logo-img" src="../assets/icons/airbnb-logo.svg" /></div>
                <h2 @click="showList">airshare</h2>
              </div>
            </router-link>
            <div class="explore-filter">
              <explore-filter :isExpend="isExpend" @expend-form="expendForm" />
            </div>
            <div class="last-section-nav flex align-center">
              <a class="right-header become-host" href="/#/login">Switch to hostig</a>

              <a class="right-header" href="/#/explore"><img class="explore-btn" src="../assets/icons/en.svg" /></a>
              <div class="user-menu-btn">
                <button @click="showMenu = !showMenu" class="nav-btn expend flex">
                  <img class="menu-btn" src="../assets/icons/menu.svg" />
                  <img class="host-image" :src="userImg" />
                </button>
              </div>
              <div class="user-nav" v-if="showMenu" v-click-away="onClickAway">
                <div class="user-nav-in">
                  <a href="#/" @click="logDemo" v-if="!getLogInUser">Messages</a>
                  <!-- v-if todo -->
                  <a href="#/wishList" @click="showMenu = !showMenu" >Wish List</a> 
                  <a href="#/dashboard" @click="showMenu = !showMenu" >Dashboard</a>
                  <!-- <a href="#/wishList" @click="showMenu = !showMenu" class="a1" v-if="getLogInUser">Wish List</a>
                  <a href="#/dashboard" @click="showMenu = !showMenu" v-if="getLogInUser">Dashboard</a> -->
                  <a href="#/login" @click="showMenu = !showMenu" v-if="!getLogInUser">Sign up</a>
                  <a href="#/login" @click="showMenu = !showMenu" v-if="!getLogInUser">Log in</a>
                  <a href="#/" @click="logDemo" v-if="!getLogInUser">Log Demo</a>
                  <a href="#/become-a-host" @click="showMenu = !showMenu" v-if="!getLogInUser">airshare your home</a>
                  <a @click="logout" v-if="getLogInUser">Logout</a>
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
        <div v-if="path === '/explore' || path === '/'" class="header-bottom flex justify-space-between">
          <explore-labels v-if="!isExplore" />
          <h3 v-if="isExplore">Stays : {{ staysLength }}</h3>
          <div v-if="desktop" @click="isShow = !isShow" class="stand-alone-filter">
            <img src="../assets/icons/filter-icon.svg" alt="" />
            <span class="filter-btn">Filters</span>
          </div>
          <Transition duration="200" name="nested">
            <standAlone-filter @closeFilersForm="closeModal" v-if="isShow" v-click-away="onClickAway" />
          </Transition>
        </div>
      </div>
    </div>
  </header>
  <div v-if="isShow" class="overlay"></div>
</template>
<script>
import exploreFilter from './explore-filter.vue';
import exploreLabels from './search-labels.vue';
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
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    eventBus.on('staysLength', data => {
      this.staysLength = data
    });
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  },

  computed: {
    getCheckinDate() {
      return this.checkinDate;
    },
    getCheckoutDate() {
      return this.checkoutDate;
    },
    getGuestsAmount() {
      if (!this.guests) return "Add guests";
      return this.guests;
    },
    headerLocation() {
      let { params, path } = this.$route || {};
      this.isExplore = path !== '/';
      this.path = path;
      let isEmpty = Object.keys(params).length === 0;
      return isEmpty;
    },

    userImg() {
      var user = this.$store.getters.loggedinUser;
      return user ? user.imgUrl : 'https://res.cloudinary.com/sprint4-triman/image/upload/v1669793675/elon_mask_ltbtp6.jpg';
    },
    getLogInUser() {
      var user = this.$store.getters.loggedinUser;
      return user ? true : false;
    },
  },

  methods: {
    expendForm(value) {
      this.isExpend = value;
    },
    closeModal() {
      this.isShow = false;
    },
    logout() {
      this.$store.dispatch({ type: 'logout' });
      // this.$router.push("/")
      this.loggedinUser = null;
      this.showMenu = false;
    },
    async logDemo() {
      const demo = {
        password: 'demo',
        username: 'demo',
      };
      try {
        await this.$store.dispatch({ type: 'login', userCred: demo });
        this.$router.push('/');
        this.showMenu = false;
      } catch (err) {
        console.log(err);
        this.msg = 'Failed to login';
      }
    },
    onClickAway() {
      this.isShow = false;
      this.showMenu = false;
    },
    handleScroll(ev) {
      let pos = window.scrollY;
      if (pos === 0) {
        this.isSticky = false;
        this.isExpend = false;
      }

      if (pos > 0) {
        this.isSticky = true;
        this.isShow = false;

        eventBus.emit('overlay', this.isShow);
      }

      if (this.isExpend) {
        this.isExpend = false;
        eventBus.emit('closeModal', this.isExpend);
      }
    },

    handleResize() {
      const width = window.outerWidth;
      if (width > 750) {
        this.desktop = true;
      }
      if (width < 750) {
        this.desktop = false;
      }
    },

    search() {
      let url = `/explore?location=${this.country}`;
      this.$router.push(url);
    },

    searchCountry(value) {
      this.country = value
    },

    showList() {
      this.$store.dispatch({ type: 'setFilterBy', filterBy: {} })
    }

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
    eventBus,
  },
  setup() { },
};
</script>