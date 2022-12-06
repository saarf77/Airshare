<template>
    <section class="payment-page">
        <div class="payment-title">
            <h1>Request to book</h1>
        </div>
        <section class="good-deal">
            <div class="title">
                <h3>Good price</h3>
            </div>
            <div class="deal-content">
                <p>Your dates are $194 less than the avg. nightly rate over the last 3 months.</p>
            </div>
        </section>

        <section class="trip-display">
            <h2>Your trip</h2>
            <div class="trip-dates">
                <h1>Dates</h1>
                <div class="dates">

                </div>
            </div>

            <div class="trip-guests">
                <h1>Dates</h1>
                <div class="guests">

                </div>
            </div>
            
        </section>
        <div class="btn-container">
                <div v-for="i in 100" class="cell"></div>
                <div class="content">
                  <button type="submit" class="action-btn">
                   <span>Sign up</span> 
                  </button>
                </div>
              </div>
    
    </section>
</template>