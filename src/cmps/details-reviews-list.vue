<script>
import {svgService} from '../services/svg.service.js';
export default {
    props: ['reviewsList'],
    data(){
        return {
            currStayReviews: [],
            currStayStarRating: 0,
            currStayAttributes: {
                cleanlinessRating: 0,
                communicationRating: 0,
                checkInRating: 0,
                accuracyRating: 0,
                locationRating: 0,
                valueRating: 0,
            },
        }
    }, 
    computed: {
    svgBlackStar(){
            const svgHtml = svgService.getSvgIcon('blackStarIcon') + `<span class="average-reviews">5</span>·<span class="reviewers-count">5</span>reviews`
            return svgHtml;
        },
        stayAttributesHtml(){
            let strHtml = '' 
            if(this.currStayReviews?.length > 0 ){
                let attrStr = '';
                let idx = -1;
                strHtml = '<section class="attr-group">'
                for (const key in this.currStayAttributes) {
                    attrStr = key +'';
                    idx = attrStr.indexOf('Rating');
                    attrStr = attrStr.substring(0, 1).toLocaleUpperCase() + attrStr.substring(1,idx);
                    if(attrStr === 'CheckIn'){attrStr = 'Check-in';}
                   strHtml += `<div class="attribute"><label class="attribute-name">${attrStr}</label><div class="attr-bar"><span class="attr-score-bar"></span>
                    <span class="attr-score-value" style="width: calc(120px * ${this.currStayAttributes[key]}/5)"></span>
                    <span class="attr-score-num">${this.currStayAttributes[key]}</span></div></div>`;
                    if(attrStr === 'Check-in'){strHtml += '</section><section class="attr-group">';}
                }
                strHtml += '</section>';
               
            }
            return strHtml;
        },
    }, 
    watch:{
        reviewsList:{
            handler(newVal) {
                if(newVal?.list.length > 0){
                    this.currStayStarRating = (newVal.list.reduce((acc, review) => acc + parseFloat(review.starRate), 0)/newVal.list.length).toFixed(1) ;
                    this.currStayAttributes.cleanlinessRating = (newVal.list.reduce((acc, review) => acc + review.attributes.cleanliness, 0)/newVal.list.length).toFixed(1);
                    this.currStayAttributes.communicationRating = (newVal.list.reduce((acc, review) => acc + review.attributes.communication, 0)/newVal.list.length).toFixed(1);
                    this.currStayAttributes.checkInRating = (newVal.list.reduce((acc, review) => acc += review.attributes.checkIn, 0)/newVal.list.length).toFixed(1);
                    this.currStayAttributes.accuracyRating = (newVal.list.reduce((acc, review) => acc += review.attributes.accuracy, 0)/newVal.list.length).toFixed(1);
                    this.currStayAttributes.locationRating = (newVal.list.reduce((acc, review) => acc += review.attributes.location, 0)/newVal.list.length).toFixed(1);
                    this.currStayAttributes.valueRating = (newVal.list.reduce((acc, review) => acc += review.attributes.value, 0)/newVal.list.length).toFixed(1);

                    this.currStayReviews = newVal.list;
                }

               
            },
            deep: true
        }
    },
    components:{
        svgService,
    }
}
</script>

<template>
       <section class="reviews-display">
            <div class="details-title" v-html="svgBlackStar">
            </div>
           
            <div class="stay-attributes" v-html="stayAttributesHtml">
            </div>
        </section>
</template>