<script>
// page structure => 
// stay name
// stay labels  + share || save
// stay photos  {{photos details CMP}}
// stay description + host img || {{order CMP}}
// stay achievement 
// stay cover ad 
// stay inside photos carousel 
// stay "host depiction"
// stay options as icons
// order dates picker
// stay reviews
// map section
// more details 
// {{ stay-details model page for: reviews, description, extended options as icons }}



import {svgService} from '../services/svg.service.js';
import detailsAchievements from '../cmps/details-achievement.vue';
import detailsOptionsList from '../cmps/details-options-list.vue';
import detailsReviewsList from '../cmps/details-reviews-list.vue';
import detailsPhotosDisplay from '../cmps/details-photos-display.vue';

//TODO: get it from the store when we will got a BACKEND;
//import {store} from '../store/store.js';
import { stayService } from '../services/demo-data.service.js';

export default {
    data(){
        return{
            currStay: null,
            
        }
    }, 
    created() {
        ;(async () => {
            try{
                this.currStay = await stayService.getById(this.$route.params.id);
            }catch (err) {
                console.log('details page: can\'t get stay by using this id ', err);
                throw err;
            }
        })();
        
    },
    computed: {
        stayName(){
            return this.currStay? this.currStay.name : '';
        },
        starRate(){
            return svgService.getSvgIcon('blackStarIcon') + this.calcStarRate;
        },
        calcStarRate(){
            let rate = '?';
            let counter = 0;
            if(this.currStay?.reviews?.length > 0 ){
                rate = this.currStay.reviews.map((review) => { 
                    return !isNaN(review.starRate)?  review.starRate : 0;
                });
                counter = rate.length;
                rate = rate.reduce((acc, num) => acc + num)
                rate = rate/counter;
                rate = rate - rate % 0.1;
            }
            return rate + '';
        },
        reviewsCount(){
            return this.currStay?.reviews?.length || 0;
        }, 
        labelsTxt (){
            let str = '';
            if (this.currStay?.labels?.length > 0){
                this.currStay.labels.forEach(label => {
                    str +=  `<a class="label" href='#'> ${label}, </a>`;
                });
                str = str.substr(0, str.length - 1);
            }
            return str;
        }, 
        imageUrls(){
            return (this.currStay?.imgUrls?.length > 0)? this.currStay.imgUrls : [];
        },
        shareBtnTxt(){
            return svgService.getSvgIcon('shareIcon') + '<span> Share </span>';
        },
        saveBtnTxt(){
            return svgService.getSvgIcon('emptyHeart') + '<span> Save </span>';
        }
    }, 
    components: {
        svgService,
        stayService,
        detailsAchievements,
        detailsOptionsList,
        detailsReviewsList,
        detailsPhotosDisplay,
    }
}

</script>

<template>
    <section class="details-page">
        <section class="short-display">
            <div class="name">{{ stayName }}</div>
            <div class="short-container">
                <div class="star-score" v-html="starRate"></div> · 
                <div class="reviews-count">reviews {{reviewsCount}}</div> · 
                <div class="host-level">?</div> · 
                <div class="area-scope-labels" v-html="labelsTxt"></div>
            </div>
          <button class="details-btn share" v-html="shareBtnTxt"></button>
          <button class="details-btn save" v-html="saveBtnTxt"></button>
        </section>
        <details-photos-display :urls="imageUrls"/>
        <section class="details-display">
            <div class="details-container">
                <div class="details-name">
                </div>
                <div class="guests-count">
                </div>
                <div class="bedrooms-count">
                </div>
                <div class="beds-count">
                </div>
                <div class="bath-count">
                </div>
            </div>
            <div class="user-icon"></div>
        </section>
        <details-achievements/>
        <section class="description-display">
            <div class="description-txt"></div>
            <button> See More</button>
        </section>
        <section class="inside-photos-display">
            <div class="details-title">Where you'll sleep</div>
            <div class="inside-carousel-container"></div>
        </section>
        <details-options-list/>
        <section class="Schedule-display">
            <div class="details-title"> 
                <span class="night-number">7</span> nights in <span class="general-area-name">puk-landia city</span>
                <span class="first-night-date"> Dec 4, 2022</span> - <span class="last-night-date">Dec 9, 2022</span>
            </div>
            <div class="dates-picker"></div>
        </section>
        <details-reviews-list/>
    </section>
    <section class="details-page model"> 
    </section>
</template>

