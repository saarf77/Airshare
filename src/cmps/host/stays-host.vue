<template>
    <section class="stay-host-page">
          <div>stays host</div>
    </section>

</template>

<script>
export default {
    name: ' stays-host',

  data() {
      return {
        
    }
  },
  created() {

  },
  computed: {
  },
  methods: {
    approve() {
      this.hostOrder.status = "approved";
    },
    decline() {
      this.hostOrder.status = "declined";
    },
  }
}
</script>

<style>

</style>