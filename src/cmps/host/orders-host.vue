<template>
    <tr>
        <td>user</td>
        <td class="text-center">{{hostOrder.createdAt}}</td>
        <td class="text-center">{{hostOrder.host.imgUrl}}</td>
        <td class="text-center">{{hostOrder.stay.name}}</td>
        <td class="text-center">{{hostOrder.startDate}}</td>
        <td class="text-center">{{hostOrder.endDate}}</td>
        <td class="text-center">{{hostOrder.status}}</td>
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
        console.log(this.hostOrder)
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
  