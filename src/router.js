import { createRouter, createWebHashHistory } from 'vue-router'

import chat from './views/chat.vue'
import stayApp from './views/stay-app.vue'
import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import stayDetails from './views/stay-details.vue'
import userDetails from './views/user-details.vue'
import dashboard from './views/host-dashboard.vue'
import userTrips from './views/user-trips.vue'
import userWishlist from './views/user-wishlist.vue'
import stayPayment from './views/stay-payment.vue'



const routes = [
  {
    path: '/',
    name: 'home',
    component: stayApp
  },
  {
    path: '/review',
    name: 'review',
    component: reviewApp
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat
  },
  {
    path: '/login',
    name: 'loginSignup',
    component: loginSignup
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  }, 
  {
    path: '/stay/:id',
    name: 'stay-details',
    component: stayDetails
  },
  {
    path: '/payment/:id',
    name: 'stay-payment',
    component: stayPayment
  },
  {
    path: '/dashboard/:id?',
    name: 'host-dashboard',
    component: dashboard
  },
  {
    path: '/trip/:id?',
    name: 'user-trips',
    component: userTrips
  },
  { 
    path: '/wishlist',
    name: 'wish-list',
    component: userWishlist
  },

]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

