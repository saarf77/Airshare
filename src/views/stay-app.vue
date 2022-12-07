<template>
  <section class="stay-app main-layout container">
    <!-- <filter-modal @setFilter="setFilter"/> -->
    <!-- <stay-filter @setFilter="setFilter" /> -->
    <stay-list v-if="stays" :stays="stays" />
  </section>
</template>

<script>
// import filterModal from '../cmps/filter-modal.vue'
// import stayFilter from '../cmps/stay-filter.vue'
import stayList from '../cmps/stay-list.vue'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay.service.js'
import { getActionRemoveStay, getActionUpdateStay, getActionAddStayMsg } from '../store/stay.store'
export default {
  components: {
    // stayFilter,
    stayList,
    // filterModal
  },
  data() {
    return {
      stayToAdd: null
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    stays() {
      return this.$store.getters.stays
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadStays' })
  },
  methods: {
    async setFilter(filterBy) {
      try {
        console.log('From toy-app', filterBy)
        await this.$store.dispatch({ type: 'setFilter', filterBy })
        showSuccessMsg('Stay removed')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove stay')
      }
    },
    async addStay() {
      try {
        await this.$store.dispatch({ type: 'addStay', stay: this.stayToAdd })
        showSuccessMsg('Stay added')
        this.stayToAdd = stayService.getEmptyStay()
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add stay')
      }
    },
    async removeStay(stayId) {
      try {
        await this.$store.dispatch(getActionRemoveStay(stayId))
        showSuccessMsg('Stay removed')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove stay')
      }
    },
    async updateStay(stay) {
      try {
        stay = { ...stay }
        stay.price = +prompt('New price?', stay.price)
        await this.$store.dispatch(getActionUpdateStay(stay))
        showSuccessMsg('Stay updated')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update stay')
      }
    },
    async addStayMsg(stayId) {
      try {
        await this.$store.dispatch(getActionAddStayMsg(stayId))
        showSuccessMsg('Stay msg added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add stay msg')
      }
    },
    printStayToConsole(stay) {
      console.log('Stay msgs:', stay.msgs)
    }
  }


}
</script>
