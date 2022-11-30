import { createRouter, createWebHashHistory } from 'vue-router'

import home from './views/home.vue'
import chat from './views/chat.vue'
// import carApp from './views/car-app.vue'
import stayApp from './views/stay-app.vue'
import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import stayDetails from './views/stay-details.vue'
import userDetails from './views/user-details.vue'




const routes = [
  {
    path: '/',
    name: 'home',
    component: stayApp
  },
  // {
  //   path: '/car',
  //   name: 'car-app',
  //   component: carApp
  // },
  // {
  //   path: '/stay',
  //   name: 'stay-app',
  //   component: stayApp
  // },
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
    path: '/details/:id',
    name: 'stay-details',
    component: stayDetails
  },
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

