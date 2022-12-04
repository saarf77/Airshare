<script>
import {svgService} from '../services/svg.service.js';
export default {
    data(){
        return {
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
            <div class="stay-attributes">
                <div class="attribute">
                    <div class="attribute-name">Cleanliness</div>
                    <div class="attribute-bar"><span class="attribute-score-bar"></span></div>
                </div>
            </div>
            <div class="stay-attributes">
                <div class="attribute">
                    <div class="attribute-name">Communication</div>
                    <div class="attribute-bar"><span class="attribute-score-bar"></span></div>
                </div>
            </div>
            <div class="stay-attributes">
                <div class="attribute">
                    <div class="attribute-name">Check-in</div>
                    <div class="attribute-bar"><span class="attribute-score-bar"></span></div>
                </div>
            </div>
            <div class="stay-attributes">
                <div class="attribute">
                    <div class="attribute-name">Accuracy</div>
                    <div class="attribute-bar"><span class="attribute-score-bar"></span></div>
                </div>
            </div>
            <div class="stay-attributes">
                <div class="attribute">
                    <div class="attribute-name">Location</div>
                    <div class="attribute-bar"><span class="attribute-score-bar"></span></div>
                </div>
            </div>
            <div class="stay-attributes">
                <div class="attribute">
                    <div class="attribute-name">Value</div>
                    <div class="attribute-bar"><span class="attribute-score-bar"></span></div>
                </div>
            </div>
        </section>
</template>