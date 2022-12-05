<script>
import { svgService } from '../services/svg.service.js';

export default {
    data(){
        return {
        }
    }, 
    computed: {
       reportListing(){
        return svgService.getSvgIcon('flagIcon') +' Report this listing'
       }
    },
    watch:{
    },
    components:{
        svgService,
    }
}
</script>

<template>
       <section class="order-display">
                <div class="order-container"></div>
                <div class="report" v-html="reportListing"></div>
        </section>
</template>