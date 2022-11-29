


<script>
// page structure => 
// stay name
// stay labels  + share || save
// stay photos  {{photos details CMP}}
// stay description + host img || {{order CMP}}
// stay achievement 
// stay cover ad 
// stay "host depiction"
// stay options as icons
// order dates picker
// stay reviews
// map section
// more details 

// {{ stay-details model page for: reviews, description, extended options as icons }}

export default {

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
    </section>
    <section class="details-page model">
          
    </section>
</template>