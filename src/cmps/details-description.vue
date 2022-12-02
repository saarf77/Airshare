<script>
import {detailsTextService} from '../services/stay-details-text.service.js';
export default {
              props: ['descriptionName'], 
              computed: {
                descriptionHtml(){
                        let currText = ''
                        if(this.descriptionName?.length > 0){
                                currText += detailsTextService.getStayDescription(this.descriptionName);
                                console.log(currText);
                        }
                    return '<div>' + currText + '</div><button> See More</button>'
                }
              },
              components:{
                        detailsTextService,
              }
       }
</script>

<template>
       <section class="description-display" v-html="descriptionHtml">
        
        </section>
</template>