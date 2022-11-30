<script>
import { svgService } from '../services/svg.service.js';

export default {
    data(){
        return {

        }
    }, 
    computed: {
       svgAirConditioner(){
              const svgHtml = svgService.getSvgIcon('airConditioner') + `<div class="icon-txt"> AC - split type ductless system </div>`;
              console.log(svgHtml);
            return  svgHtml ;
        }
    },
    components:{
        svgService,
    }
}
</script>

<template>
       <section class="options-icons-display">
            <div class="details-title">What this place offers</div>
            <div class="icons-container" v-html="svgAirConditioner"></div>
            <div class="icons-container" v-html="svgAirConditioner"></div>
            <div class="icons-container" v-html="svgAirConditioner"></div>
            <div class="icons-container" v-html="svgAirConditioner"></div>
            <div class="icons-container" v-html="svgAirConditioner"></div>
            <div class="icons-container" v-html="svgAirConditioner"></div>
            <div class="icons-container" v-html="svgAirConditioner"></div>
        </section>
</template>