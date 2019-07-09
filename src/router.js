import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'

import SignUp from './views/credentials/SignUp.vue' 
import Logout from './views/credentials/Logout.vue' 
import Login from './views/credentials/Login.vue'

import EditInfo from './views/users/EditInfo.vue'
import UserInfo from './views/users/UserInfo.vue'

import TripIndex from './views/trips/TripIndex.vue'
import TripEdit from './views/trips/TripEdit.vue'
import TripNew from './views/trips/TripNew.vue'
import TripAdd from './views/trips/TripAdd.vue'

import ParksShow from './views/parks/ParksShow.vue'
import ParksIndex from './views/parks/ParksIndex.vue' 

import AttractionsIndex from './views/attractions/AttractionsIndex.vue'
import AttractionShow from './views/attractions/AttractionShow.vue'

import LocationHome from './views/locations/LocationHome.vue'

import MainNavbar from './layout/MainNavbar.vue';
import MainFooter from './layout/MainFooter.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  hash: false, 
  base: process.env.BASE_URL,
  routes: [
    { 
      path: '/', 
      name: 'home', 
      components: { default: Home, header: MainNavbar, footer: MainFooter }, 
      props: { 
        header: { colorOnScroll: 400 }
      } 
    },
    { 
      path: '/trips', 
      name: 'trips-index', 
      components: { default: TripIndex, header: MainNavbar, footer: MainFooter }, 
      props: {
        header: { colorOnScroll: 400 }
      } 
    },
    { 
      path: '/trips/new', 
      name: 'trip-new', 
      components: { default: TripNew, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    { 
      path: '/trips/edit/:id', 
      name: 'trip-edit', 
      components: { default: TripEdit, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    }, 
    { 
      path: '/trips/add/:id', 
      name: 'trip-add', 
      components: { default: TripAdd, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },

    { path: '/login', 
      name: 'login', 
      components: { default: Login, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    { path: '/logout', 
      name: 'logout', 
      components: { default: Logout, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'white' }
      }
    }, 
    { path: '/signup', 
      name: 'sign-up', 
      components: { default: SignUp, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },

    { path: '/info', 
      name: 'user-info', 
      components: { default: UserInfo, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    { path: '/edit-info', 
      name: 'user-edit', 
      components: { default: EditInfo, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    }, 

    { path: '/parks', 
      name: 'parks-index', 
      components: { default: ParksIndex, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    { path: '/parks/:id', 
      name: 'parks-show', 
      components: { default: ParksShow, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      } 
    },

    { path: '/attractions', 
      name: 'attractions-index', 
      components: { default: AttractionsIndex, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'white' }
      }
    },
    { path: '/attractions/:id', 
      name: 'attraction-show', 
      components: { default: AttractionShow, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'white' }
      } 
    },
    { path: '/locations', 
      name: 'locations', 
      components: { default: LocationHome, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'white' }
      } 
    }
  ],
  
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
})
