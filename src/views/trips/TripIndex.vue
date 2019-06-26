<template>
<div class="trips-index">
  <div class="container">
    <h1>Your Trips</h1>
      <br>
    <div v-for="trip in trips">
      <br>
      <h2>From {{ trip.dates.arrival }} to {{ trip.dates.departure }}</h2> 
      <p><router-link v-bind:to="'/trips/' + trip.id">{{ trip.id }}</router-link></p>
      <h2>Your Parks & Attractions</h2>

    <!-- <button v-on:click.prevent="toggle()">Show All Attractions</button> -->
    <div v-for='int in interests'>
      <h4>{{ int.formatted.formatted_start_time }}</h4>
      <div v-if="int.trip_id === trip.id">
      <!-- <transition  -->
        <!-- enter-active-class="animated fadeInDownBig" -->
        <!-- leave-active-class="animated fadeOutDownBig">   -->
      <!-- <p v-if="show">{{ int.ride.name }} | {{ int.park.name }}</p> -->
      <p>{{ int.ride.name }} | 
        <span v-if="int.park.name === 'Epcot'" style="color: blue">                
          <b>{{ int.park.name }}</b>
        </span>
        <span v-if="int.park.name === 'Magic Kingdom'" style="color: red">
          <b>{{ int.park.name }}</b>
        </span>
        <span v-if="int.park.name === 'Hollywood Studios'" style="color: orange">
          <b>{{ int.park.name }}</b>
        </span>
        <span v-if="int.park.name === 'Animal Kingdom'" style="color: green">
          <b>{{ int.park.name }}</b>
        </span>
      </p>
      <!-- </transition> -->
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
