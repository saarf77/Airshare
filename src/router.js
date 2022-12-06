import { createRouter, createWebHashHistory } from 'vue-router'

import chat from './views/chat.vue'
import stayApp from './views/stay-app.vue'
import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import stayDetails from './views/stay-details.vue'
import userDetails from './views/user-details.vue'
import dashboard from './views/host-dashboard.vue'



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
    path: '/dashboard',
    name: 'host-dashboard',
    component: dashboard
  },

]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

