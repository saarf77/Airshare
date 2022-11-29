<template>
  <!-- <div class="container home">
    <ul class="stay-list">
      <li v-for="stay in stays" :key="stay._id">
        <p>
          {{stay.name}}
        </p>
        <p>
          ${{stay.price?.toLocaleString()}}
        </p>
        <button @click="removeStay(stay._id)">x</button>
        <button @click="updateStay(stay)">Update</button>
        <hr />
        <button @click="addStayMsg(stay._id)">Add stay msg</button>
        <button @click="printStayToConsole(stay)">Print msgs to console</button>

      </li>
    </ul>
    <hr /> -->
  <!-- <form @submit.prevent="addStay()">
      <h2>Add stay</h2>
      <input type="text" v-model="stayToAdd.name" />
      <button>Save</button>
    </form> -->
  <!-- </div> -->
  <section class="stay-app container">
    <stay-filter @setFilter="setFilter" />
    <stay-list v-if="stays" :stays="stays" />
  </section>
</template>

<script>
import stayFilter from '../cmps/stay-filter.vue'
import stayList from '../cmps/stay-list.vue'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay.service.local.js'
import { getActionRemoveStay, getActionUpdateStay, getActionAddStayMsg } from '../store/stay.store'
export default {
  components: {
    stayFilter,
    stayList
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
