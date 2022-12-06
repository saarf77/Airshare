<template>
    <tr>
        <td>user</td>
        <!-- <td class="text-center">{{hostOrder.createdAt}} </td>
        <td class="text-center">{{hostOrder.host.imgUrl}}</td> -->
        <td class="text-center">Stay name </td>
        <td class="text-center">Check In </td>
        <td class="text-center">Check Out </td>
        <td class="text-center">Status </td>
        <td class="text-center">Revenue </td>
        <td class="text-center">Guests </td>
        <td class="text-center">Action </td>
    </tr>
</template>
  
<script>

export default {
    prop:['hostOrder'],
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
  