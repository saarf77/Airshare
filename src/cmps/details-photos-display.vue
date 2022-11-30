<script>

export default {
       props: ['urls'],
       data(){
              return {
                     imageUrls: [],
              }
       },
       computed:{
              generatePhotosHtml(){
                     let html = `<img class="main-photo" src="" alt=""><img class="photo-num-1" src="" alt="">
                     <img class="photo-num-2" src="" alt=""><img class="photo-num-3" src="" alt="">
                     <img class="photo-num-4" src="" alt="">`;

                     if (this.urls?.length >= 5){
                            html = '';
                            html += `<img class="main-photo" src="" alt="">`;
                            this.urls.forEach((url, idx) => {
                                   if(idx !== 0){
                                          html += `<img class="photo-num-${idx}" src="${url}" alt="image ${idx + 1}">`;
                                   }
                            });

                     }
              return html;
              },
       },
}
</script>

<template>
       <section class="photo-display" v-html="generatePhotosHtml"></section>
</template>