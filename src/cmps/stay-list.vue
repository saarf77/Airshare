<template>
    <section class="stay-list-container">
      <button @click="toAddStay()">Add Stay</button>
      <ul class="stay-list clean-list stay-list-layout">
        <stay-preview v-for="stay in stays" :key="stay._id" :stay="stay" />
      </ul>
    </section>
  </template>
  
  <script>
  import stayPreview from "./stay-preview.vue"
  
  export default {
    props: {
      stays: Array,
    },
    components: {
      stayPreview,
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
  