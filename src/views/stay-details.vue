


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

export default {
    
    data(){
        return{
            
        }
    }, 
    computed: {
        svgFlowerIcon(){
            return svgService.getSvgIcon('flowerPot');
        },
        svgBlackStar(){
            return svgService.getSvgIcon('blackStarIcon');
        }
    }, 
    components: {
        svgService,
        detailsAchievements,
        detailsOptionsList,
        detailsReviewsList,

    }
    
}
</script>

<template>
    <section class="details-page">
        <section class="short-display">
          <div class="name"></div>
          <div class="star-score"></div>
          <div class="reviews-count"></div>
          <div class="label-list"></div>
          <button class="details-btn share"></button>
          <button class="details-btn save"></button>
        </section>
        <section class="photo-display">
            <img class="main-photo" src="" alt="">
            <img class="photo-item" src="" alt="">
            <img class="photo-item" src="" alt="">
            <img class="photo-item" src="" alt="">
            <img class="photo-item" src="" alt="">
        </section>
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