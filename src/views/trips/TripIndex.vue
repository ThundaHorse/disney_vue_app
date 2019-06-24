<template>
<div class="trips-index">
  <div class="container">
    <h1>Your Trips</h1>
    <router-link v-bind:to="'/trips/new'">New Trip</router-link>
      <br>

    <div v-for="trip in trips">
      <h2>From {{ trip.dates.arrival }} to {{ trip.dates.departure }}</h2> 
      {{ trip.id }}
      <h2>Your Parks & Attractions</h2>
    <button v-on:click.prevent="toggle()">Show All Attractions</button>
    
    <div v-for='int in interests'>
      {{ int.id }} | {{ int.trip_id }}
      <div v-for="park in int.park">
        <transition 
            enter-active-class="animated fadeInDownBig"
            leave-active-class="animated fadeOutDownBig">   
          <p v-if="show">{{ int.ride.name }}  | {{ park.name }}</p>
        </transition>
      </div>
    </div> 

      <br>
      <span>
        <button>
          <router-link v-bind:to="'/trips/edit/' + trip.id">
            Edit this Trip
          </router-link>
        </button>
        |
        <button v-on:click="deleteTrip(trip)">
          Delete Trip
        </button>
      </span>
    </div>

  </div>
</div>
</template>

<style>
  h2 {
    padding-left: 150px;
  }
</style>

<script>
import axios from 'axios' 

export default {
  data() {
    return {
      show: false,
      trips: [],
      interests: [],
      tickets: [],
      attractions: []
    }
  },
  created: function() {
    axios.get('/api/interests').then(response => {
      this.interests = response.data;
    })
    axios.get('/api/trips').then(response => {
      this.trips = response.data; 
    })
    axios.get('/api/tickets').then(response => {
      this.tickets = response.data;
    })
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    deleteTrip: function(trip) {
      axios.delete('/api/trips/' + trip.id).then(response => {
        this.$router.push('/trips')
        var index = this.trips.indexOf(trip);
        this.trips.splice(index, 1);
      })
    }
  }
};
</script>
