<script>
import {svgService} from '../services/svg.service.js';
import {stayService} from '../services/demo-data.service.js';

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
            reviewsUsers: [],
            reviewWidth: 0,
        }
    },
    methods:{
        getReviewTxt(id){
            var currTxt = '';
            if(this.currStayReviews[id]?.content?.length > 0){
                var currLines = [];

                currTxt = this.currStayReviews[id].content;
                const elBoard = this.$refs.reviewsBoardContainer;
                this.reviewWidth = elBoard.offsetWidth/2
                let fontSize = parseFloat(window.getComputedStyle(elBoard, null).getPropertyValue('font-size'));
                let maxLettersPerLine = Math.floor((this.reviewWidth / fontSize * 2))
                let quitWhile = false;
                let idx;

               
                if(currTxt.length > (maxLettersPerLine * 3)){
                    idx = currTxt.indexOf('.', (maxLettersPerLine * 3));
                    currTxt = currTxt.substring(0,idx) + '...';
                }

                while(!quitWhile){
                    
                    if(currTxt.length < maxLettersPerLine){
                        currLines.push(currTxt + '...');
                        quitWhile = true;
                        break;
                    }

                    idx = 0;
                    idx = currTxt.lastIndexOf('.', maxLettersPerLine);

                    if(currTxt.lastIndexOf(',', maxLettersPerLine) > idx){
                        idx = currTxt.lastIndexOf(',', maxLettersPerLine);
                    }

                    if(currTxt.lastIndexOf(' ', maxLettersPerLine) > idx){
                        idx = currTxt.lastIndexOf(' ', maxLettersPerLine);
                    }

                    currLines.push(currTxt.substring(0,idx));
                    currTxt = currTxt.substring(idx, currTxt.length);
                }
            }
            return currLines.join();
            },
            getDateMonthNYear(currDate){
                return new Date(currDate).toLocaleString('default', { month: 'long' }) + ' ' + new Date(currDate).getFullYear();
            },
        },
        
    computed: {
    svgBlackStar(){
            const svgHtml = svgService.getSvgIcon('blackStarIcon') + `<span class="average-reviews">${this.currStayStarRating}</span>·
            <span class="reviewers-count">${this.currStayReviews.length}</span>reviews`
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
        reviewsBoardHtml(){
            let strHtml = '';
            if(this.currStayReviews?.length > 0 && this.reviewsUsers?.length > 0 ){
                for (let i = 0; i < 6; i++) {
                    if(this.currStayReviews[i] && this.reviewsUsers[i]){
                        strHtml += `<div class="review-item"><div class="user-card"><img class="user-image" src="${this.reviewsUsers[i].imgUrl}">
                            <span class="user-name">${this.reviewsUsers[i].name}</span>
                            <span class="post-date">${this.getDateMonthNYear(this.currStayReviews[i].reviewPostDate)}</span></div>
                            <div class="review-content" style="width: ${this.reviewWidth}px">${this.getReviewTxt(i)}</div></div>`;
                    }
                }
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
                    this.usersImgUrls = [];
                    let hostPromise;
                    newVal.list.forEach(review => {
                        hostPromise = stayService.getById(review.user_id, 'users-db')
                        hostPromise.then((res)=>{
                            this.reviewsUsers.push(res[0]);
                        });
                    });

                }

               
            },
            deep: true
        }
    },
    components:{
        svgService,
        stayService,
    }
}
</script>

<template>
       <section class="reviews-display">
            <div class="details-title" v-html="svgBlackStar">
            </div>
            <div class="stay-attributes" v-html="stayAttributesHtml">
            </div>
            <div class="stay-reviews-board" ref="reviewsBoardContainer" v-html="reviewsBoardHtml">
            </div>
        </section>
</template>