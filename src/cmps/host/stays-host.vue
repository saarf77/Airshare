<template>
    <tr class="row-table border_bottom">
        <!-- <td><img class="stay-image" :src=imageUrl></td> -->
        <!-- <td>{{ hostStay.name }}</td> -->
        <!-- <td>${{ hostStay.price }}</td> -->
        <!-- <td>{{ hostStay.address.street }}</td> -->
        <td>
            <el-button><span class="material-icons-outlined">
                    edit
                </span></el-button>
        </td>

    </tr>

</template>

<script>
export default {
    name: ' stays-host',

    data() {
        return {
            imageUrl: utilService.getImgUrl(this.hostStay.imgUrls[0]),
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

