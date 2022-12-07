<template >
  <div class="labels-container"> 

    <carousel :settings="settings" :breakpoints="breakpoints" :adjustable-height="true"  :transition="300" :items-to-show="10" snapAlign="start">
      <slide v-for="(label, idx) in labelsList" ref="labels" :key="label" @click="filter(label.propertyType)">
        <div class="labels">
          <img class="property-type-img" :src="utilService.getImgUrlFilter(label.src)" />
          <span>{{ label.propertyType }}</span>
        </div>
      </slide>
      
      <template #addons>
        <navigation ref="el" />
      </template>
    </carousel>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const el = ref();
  
  onMounted(() => {
    const prev = document.querySelector('.carousel__prev');
    prev.style.visibility = 'hidden';
    const next = document.querySelector('.carousel__next');
    next.addEventListener('click', e => {
      prev.style.visibility = 'visible';
    });
  });
  </script>
  
  <script>
import 'vue3-carousel/dist/carousel.css';
  import { Carousel, Slide, Navigation } from 'vue3-carousel';
  import { utilService } from '../services/util.service.js';
  
  export default {
    name: 'explore-labels',
    data() {
      return {
        labelsList: null,
        filterBy: {
          propertyType: [],
        },
        index: null,
        itemsToShow: 1,
      snapAlign: 'center',
      breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: 'start',
      },
    },
  
      };
      
    },
    methods: {
      filter(value) {
  
        this.filterBy.propertyType = []
        this.filterBy.propertyType.push(value)
        this.$store.dispatch({ type: 'setFilterBy', filterBy: this.filterBy });
      },
    },
  
    created() {
      this.labelsList = this.$store.getters.getLabels;
    },
    computed: {
  
    },
    components: {
      Carousel,
      Slide,
      Navigation,
    },
  };
  </script>
  