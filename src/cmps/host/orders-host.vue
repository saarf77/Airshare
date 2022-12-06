<template>
  
</template>
  
<script>

export default {
    data() {
    return {

    };
  },
  created() {

  },
    methods: {
        approve() {
            const order = JSON.parse(JSON.stringify(this.hostOrder))
            this.$store.dispatch({ type: "saveOrder", order, status: 'approved' })
        },
        decline() {
            const order = JSON.parse(JSON.stringify(this.hostOrder))
            this.$store.dispatch({ type: "saveOrder", order, status: 'declined' })
        },
    }
};
</script>
  