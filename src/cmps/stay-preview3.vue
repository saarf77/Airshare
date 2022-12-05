<template>
    <section class="stay-preview">
        <div @click="setLiked" class="like">
            <span ><svg :class="{ liked: isLiked }" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                    focusable="false"
                    style="display: block; fill:rgba(0, 0, 0, 0.5) ; height: 24px; width: 24px; stroke: white; stroke-width: 2; overflow: visible;">
                    <path
                        d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z">
                    </path>
                </svg>
            </span>
        </div>

        <el-carousel  @click="showStayDetails" trigger="click" :autoplay="false">
            <el-carousel-item v-for="img in imgs" :key="img">
                <div class="img-wrapper">
                    <img :src="img" />
                </div>
            </el-carousel-item>
        </el-carousel>
        <!-- <img src='https://res.cloudinary.com/ddt1fjmim/image/upload/v1669798080/001_pxpfis.jpg' -->
        <div class="content">
            <div class="location-info flex justify-space-between">
                <span>{{ stay.loc.city }}, {{ stay.loc.country }}</span>
                <span class="stared">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                        focusable="false" style="display: block; height: 14px; width: 14px; fill: currentcolor;">
                        <path
                            d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                            fill-rule="evenodd"></path>
                    </svg>
                    {{ stay.rate }}
                </span>
            </div>
            <div class="name-rooms">
                <div>{{summarySize}}</div>
                <div>{{ stay.rooms }} rooms, {{ stay.beds }} beds</div>
            </div>
            <div class="price">
                <span class="currency">${{ stay.price }}</span>
                <span>night</span>
            </div>
        </div>
        <!-- <div class="content" style="padding: 14px">
            <span>Stay Name: {{ stay.name }}</span>
            <span> Price: {{ stay.price }}$</span>
            <div class="bottom">
                <time class="time">{{ currentDate }}</time>
                <el-button @click="goToEdit" text class="button edit">edit</el-button>
                <el-button @click="goToDetail" text class="button details">details</el-button>
                <el-button @click="removeStay(stay._id)" text class="button delete">delete</el-button>
            </div>
        </div> -->
    </section>
</template>
    
<script>
// import { ref } from 'vue'
export default {
    name: 'stay-preview3',
    props: {
        stay: Object,

    },
    data() {
        return {
            isLiked: false,
            imgs: [],
            summary:''
        }
    },
    components: {
        // customCard,
    },
    created() {
        this.stay.imgUrls
            .map(img => {
                this.imgs.push(img)
            })
            
    },
    computed:{
        summarySize() {
            // console.log(this.stay.summary)
            if (this.stay.summary.length > 32) {
            let desc = this.stay.summary.slice(0, 32) + '...'
            // console.log(desc)
           return this.summary = desc
        }
           this.summary = this.stay.summary
            return this.summary
        },
    },
    methods: {
        setLiked(){
            this.isLiked = !this.isLiked
        },
        showStayDetails() {
            this.$router.push('/stay/' + this.stay._id);
        },
        imageUrl(name) {
            return new URL(`/src/img/${name}.jpg`, import.meta.url)
        },
        goToDetail() {
            this.$router.push(`/stay/${this.stay._id}`)
        },
        goToEdit() {
            this.$router.push(`/stay/edit/${this.stay._id}`)
        },
        removeStay(stayId) {
            this.$emit('removeStay', stayId)
        },
    },

}
</script>
  
<style>
.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    display: block;
}
</style>