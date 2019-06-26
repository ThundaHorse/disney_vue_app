<template>
<div class="trips-index">
  <div class="container">
    <h1>Your Trips</h1>
      <br>
      <div v-if="trips == ''">
        <h1>You have no trips currently, lets plan a trip!</h1>
        <router-link to='/trips/new'>Click here</router-link>
      </div>
    <div v-for="trip in trips">
      <br>
      <h1>From {{ trip.dates.arrival }} to {{ trip.dates.departure }}</h1> 
      <p><router-link v-bind:to="'/trips/' + trip.id">View this trip</router-link></p>
      <h1>Your Parks & Attractions</h1>
    <div v-for='int in interests'>
      <div v-if="int.trip_id === trip.id">
      <h4>{{ int.formatted.formatted_start_time }}</h4>
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
    if (localStorage.getItem('jwt')) {
      axios.get('/api/interests').then(response => {
        this.interests = response.data;
      })
      axios.get('/api/trips').then(response => {
        this.trips = response.data; 
      })
    } else {
      alert("Sign in to view your trips!")
      this.$router.push('/login')
    }
  },
  methods: {
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
