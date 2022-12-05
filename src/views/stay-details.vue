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

//TODO: get it from the store when we will got a BACKEND;
//import {store} from '../store/store.js';
import {stayService } from '../services/stay.service.local.js';
import {svgService} from '../services/svg.service.js';
import detailsAchievements from '../cmps/details-achievement.vue';
import detailsOptionsList from '../cmps/details-options-list.vue';
import detailsReviewsList from '../cmps/details-reviews-list.vue';
import detailsPhotosDisplay from '../cmps/details-photos-display.vue';
import detailsDescription from '../cmps/details-description.vue';
import detailsSchedule from '../cmps/details-schedule.vue';
import detailsOrder from '../cmps/details-order.vue';

export default {
    data(){
        return{
            currStay: null,
            host: null,
            
        }
    }, 
    created() {
        ;(async () => {
            try{
                this.currStay = await stayService.getById(this.$route.params.id, 'stays-db');
            }catch (err) {
                console.log('details page: can\'t get stay by using this id ', err);
                throw err;
            }
        })();

        ;(async () => {
            try{
                this.host = await stayService.getById(this.$route.params.id, 'stays-owner');
            }catch (err) {
                console.log('details page: can\'t get user by using this id ', err);
                throw err;
            }
        })();
        
    },
    computed: {
        stayName(){
            return (this.currStay) ? this.currStay.name : this.stayName;
        },
        staySummary(){
            if(this.currStay === null || this.currStay?.summary?.length < 1) return;
            
            let { summary } = this.currStay;
            
            if(summary.length > 60){
                let idx = 100;
                
                while(summary.length > 60){
                    idx = summary.lastIndexOf(',');
                    if(idx === -1){
                        idx = summary.lastIndexOf(' ');
    
                        if(idx === -1) summary = '';
                        summary = summary.substring(0,idx)
                    }
                    summary = summary.substring(0,idx)
                }
            }
            return summary;
        },
        starRate(){
            return svgService.getSvgIcon('blackStarIcon') + `<span>${this.calcStarRate}</span>`;
        },
        superHostMedal(){
            return svgService.getSvgIcon('medalIcon');
        },
        stayGuests(){
            return (this.currStay?.capacity > 0) ? this.currStay.capacity : '0';
        },
        stayBedrooms(){
            return (this.currStay?.bedrooms > 0) ? this.currStay.bedrooms : '0';
        },
        stayBeds(){
            return (this.currStay?.beds > 0) ? this.currStay.beds : '0';
        },
        stayBaths(){
            return (this.currStay?.bathrooms > 0) ? this.currStay.bathrooms : '0';
        },
        stayAmenities(){
            (this.currStay?.amenities.length > 0) ? console.log(this.currStay.amenities) : console.log(this.currStay.amenities);
            return (this.currStay?.amenities.length > 0) ? this.currStay.amenities : [];
        },
        calcStarRate(){
            let rate = '0';
            let counter = 0;
            if(this.currStay?.reviews?.length > 0 ){
                rate = this.currStay.reviews.map((review) => { 
                    return !isNaN(review.starRate)?  review.starRate : 0;
                });
                counter = rate.length;
                rate = rate.reduce((acc, num) => acc + num)
                rate = rate/counter;
                rate = rate.toFixed(2);
            }
            return rate + '';
        },
        reviewsCount(){
            return this.currStay?.reviews?.length || 0;
        }, 
        // labelsTxt (){
        //     let str = '';
        //     if (this.currStay?.labels?.length > 0){
        //         this.currStay.labels.forEach(label => {
        //             str +=  `<a class="label" href='#'> ${label}, </a>`;
        //         });
        //         str = str.substring(0, str.length - 1);
        //     }
        //     return str;
        // }, 
        imagesUrls(){
            return (this.currStay?.imgUrls?.length > 0)? this.currStay.imgUrls : [];
        },
        hostImg(){
            return (this.host?.imgUrl)? this.host?.imgUrl : '#';
        },
        hostedBy(){
            return (this.currStay?.host?.fullname)? this.currStay?.host?.fullname : '';
        },
        stayAchievements(){
            return (this.currStay?.achievements?.length > 0)? this.currStay.achievements : [];
        },
        stayDescription(){
            if(this.currStay?.summary?.length > 0){
                let { summary } = this.currStay;
                return summary;
            }
            return '';
        },
        shareBtnTxt(){
            return svgService.getSvgIcon('shareIcon') + '<span> Share </span>';
        },
        saveBtnTxt(){
            return svgService.getSvgIcon('emptyHeart') + '<span> Save </span>';
        },
        reviewsObject(){
            let reviews = null;
            if(this.reviewsCount){
                reviews =  {list: this.currStay.reviews, starRate: this.calcStarRate};
            };
            return reviews; 
        },
        locAddress(){
            return (this.currStay?.loc?.address?.length > 0)? this.currStay?.loc?.address : ' ';
        }
    }, 
    components: {
        svgService,
        stayService,
        detailsAchievements,
        detailsOptionsList,
        detailsReviewsList,
        detailsPhotosDisplay,
        detailsDescription,
        detailsSchedule,
        detailsOrder
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
                <div class="host-medal"></div>
                <div class="host-level">Superhost</div> · 
                <div class="area-scope-labels" >{{locAddress}}</div>
                <!-- <div class="area-scope-labels" v-html="labelsTxt"></div> -->
            </div>
          <button class="details-btn share" v-html="shareBtnTxt"></button>
          <button class="details-btn save" v-html="saveBtnTxt"></button>
        </section>
        <details-photos-display :urls="imagesUrls"/>
        <main class="sticky-and-more-details">
            <details-order :orderStay="this.currStay"/>
            <section class="details-display">
                <div class="details-summary">The house is hosted by {{ hostedBy }}</div>
                <div class="details-container">
                    <div class="guests-count">{{ stayGuests }} guests · </div>
                    <div class="bedrooms-count">{{ stayBedrooms }} bedrooms · </div>
                    <div class="beds-count">{{ stayBeds }} beds · </div>
                    <div class="bath-count">{{ stayBaths }} baths</div>
                </div>
                <div class="user-icon">
                    <img :src="hostImg" alt="">
                </div>
            </section>
            <details-achievements :achievelist="stayAchievements"/>
            <section class="share-cover">
                <img src="https://res.cloudinary.com/dj88xudav/image/upload/v1670001241/share-cover_drqj1d.png" alt="share-cover" class="share-cover-img"/>
                <div class="share-cover-txt">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
                <button class="share-cover-btn">learn more</button>
            </section>
            <details-description :descriptionTxt="stayDescription"/>
            <!-- <section class="inside-photos-display">
                <div class="details-title">Where you'll sleep</div>
                <div class="inside-carousel-container"></div>
            </section> -->
            <details-options-list :amenitiesList="stayAmenities"/>
            <details-schedule/>
        </main>
        <div class="sticky-scroll-end"></div>
        <details-reviews-list :reviewsList="reviewsObject"/>
    </section>
    <section class="details-page model"> 
    </section>
</template>

