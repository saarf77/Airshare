<script>
import {svgService} from '../services/svg.service.js';
export default {
              props: ['achievelist'], 
              computed: {
                achievementHtml(){
                    let str = '<div class="empty-achievement"></div>';
                    if(this.achievelist?.length > 0){
                        str = '';
                        this.achievelist.forEach(achievement => {
                            str += `<div class="stay-achievement">${svgService.getSvgIcon(achievement.iconName)}</div>`;
                        });
                    }
                    return str;
                }
              },
              components:{
                     svgService,
              }
       }
</script>

<template>
       <section class="achievement-display" v-html="achievementHtml">
        </section>
</template>