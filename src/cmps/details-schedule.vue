<script>
import { eventBus } from '../services/event-bus.service.js';
import {svgService} from '../services/svg.service.js';


export default {
              computed: {
                keyboardSvg(){
                     return svgService.getSvgIcon('keyboardIcon');
                }
              },
              components:{
                     svgService,
              },
              methods:{
                     sendDayToOrder(day){
                            eventBus.emit('getDateFromSchedule', day);
                     },
              }
       }
</script>

<template>
       <section class="schedule-display">
              <div class="details-title"> 
                     <div class="schedule-transcription">
                            <span class="night-num">7</span>
                            <span> nights in </span>
                            <span class="general-area-name">puk-landia city</span>
                     </div>
                     <div class="schedule-dates">
                            <span class="first-night-date"> Dec 4, 2022</span>
                            <span> - </span>
                            <span class="last-night-date">Dec 9, 2022</span>
                     </div>
              </div>
              <section class="dates-picker"></section>
              <v-date-picker color="gray" :border="none" :attributes="attrs" trim-weeks is-expanded :locale="locale" mode="date"
              :columns="$screens({ default: 1, lg: 2 })" :rows="1" is-range @dayclick="sendDayToOrder"></v-date-picker>
              <div class="ctrl-panel">
                     <button class="use-keyboard-btn" v-html="keyboardSvg"></button>
                     <button class="clear-btn">Clear dates</button>
              </div>
            
        </section>
</template>