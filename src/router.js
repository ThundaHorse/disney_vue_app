import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'

import SignUp from './views/credentials/SignUp.vue' 
import Logout from './views/credentials/Logout.vue' 
import Login from './views/credentials/Login.vue'

import EditInfo from './views/users/EditInfo.vue'
import UserInfo from './views/users/UserInfo.vue'

import TripIndex from './views/trips/TripIndex.vue'
import TripShow from './views/trips/TripShow.vue'
import TripEdit from './views/trips/TripEdit.vue'
import TripNew from './views/trips/TripNew.vue'
import TripAdd from './views/trips/TripAdd.vue'

import ParksShow from './views/parks/ParksShow.vue'
import ParksIndex from './views/parks/ParksIndex.vue' 

import AttractionsIndex from './views/attractions/AttractionsIndex.vue'
import AttractionShow from './views/attractions/AttractionShow.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },

    { path: '/trips', name: 'trips-index', component: TripIndex },
    { path: '/trips/new', name: 'trip-new', component: TripNew },
    { path: '/trips/:id', name: 'trip-show', component: TripShow },
    { path: '/trips/edit/:id', name: 'trip-edit', component: TripEdit }, 
    { path: '/trips/add/:id', name: 'trip-add', component: TripAdd },

    { path: '/login', name: 'login', component: Login },
    { path: '/logout', name: 'logout', component: Logout }, 
    { path: '/signup', name: 'sign-up', component: SignUp },

    { path: '/info', name: 'user-info', component: UserInfo },
    { path: '/edit-info', name: 'user-edit', component: EditInfo }, 

    {path: '/parks', name: 'parks-index', component: ParksIndex },
    { path: '/parks/:id', name: 'parks-show', component: ParksShow },

    { path: '/attractions', name: 'attractions-index', component: AttractionsIndex},
    { path: '/attractions/:id', name: 'attraction-show', component: AttractionShow }
  ]
})
