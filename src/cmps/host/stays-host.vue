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
            this.hostOrder.status = "approved"
            const order = JSON.parse(JSON.stringify(this.hostOrder))
            this.$store.dispatch({ type: "saveOrder", order })
        },
        decline() {
            this.hostOrder.status = "declined"
            const order = JSON.parse(JSON.stringify(this.hostOrder))
            this.$store.dispatch({ type: "saveOrder", order })
        },
    }
}
</script>

