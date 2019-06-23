import Vue from 'vue'
import Router from 'vue-router'

import SignUp from './views/credentials/SignUp.vue' 
import Logout from './views/credentials/Logout.vue' 
import Login from './views/credentials/Login.vue'

import TripIndex from './views/trips/TripIndex.vue'
import TripShow from './views/trips/TripShow.vue'
import TripEdit from './views/trips/TripEdit.vue'

import ParksShow from './views/parks/ParksShow.vue'
import ParksIndex from './views/parks/ParksIndex.vue' 


Vue.use(Router)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/trips', name: 'trips-index', component: TripIndex },
    { path: '/trips/:id', name: 'trip-show', component: TripShow },
    { path: '/trips/edit/:id', name: 'trip-edit', component: TripEdit }, 

    { path: '/login', name: 'login', component: Login },
    { path: '/logout', name: 'logout', component: Logout }, 
    { path: '/signup', name: 'sign-up', component: SignUp },

    {path: '/parks', name: 'parks-index', component: ParksIndex },
    { path: '/parks/:id', name: 'parks-show', component: ParksShow }
  ]
})
