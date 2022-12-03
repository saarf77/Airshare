<template>
    <section class="stay-list-container">
      <!-- <button @click="toAddStay()">Add Stay</button> -->
      <ul class="stay-list clean-list stay-list-layout">
        <stay-preview3 v-for="stay in stays" :key="stay._id" :stay="stay" />
      </ul>
    </section>
  </template>
  
  <script>
  import stayPreview3 from "./stay-preview3.vue"
  
  export default {
    props: {
      stays: Array,
    },
    components: {
      stayPreview3,
    },
    methods: {
      toAddStay() {
        this.$router.push("/stay/edit")
      },
    },
  }
  </script>
  <style>
  .stay-list-container a {
    margin-bottom: 10px;
    display: inline-block;
  }
  </style>
  