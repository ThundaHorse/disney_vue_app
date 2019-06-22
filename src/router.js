import Vue from 'vue'
import Router from 'vue-router'

import SignUp from './views/SignUp.vue' 
import Logout from './views/Logout.vue' 

import TripIndex from './views/TripIndex.vue'
import TripShow from './views/TripShow.vue'

import ParksShow from './views/ParksShow.vue'
import ParksIndex from './views/ParksIndex.vue' 

import Login from './views/Login.vue'

Vue.use(Router)



export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/trips', name: 'trips-index', component: TripIndex },
    { path: '/trips/edit/:id', name: 'trip-show', component: TripShow },

    { path: '/login', name: 'login', component: Login },
    { path: '/logout', name: 'logout', component: Logout }, 
    { path: '/signup', name: 'sign-up', component: SignUp },

    {path: '/parks', name: 'parks-index', component: ParksIndex },
    { path: '/parks/:id', name: 'parks-show', component: ParksShow }
  ]
})
