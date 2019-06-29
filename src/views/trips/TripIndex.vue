<template>
<div class="trips-index">
  <div class="container">
    <h1>Your Trips</h1>
      <br>

      <div v-if="trips == ''">
        <h1>You have no trips currently, lets plan a trip!</h1>
          <br>
        <button class='btn-lg btn-primary btn-outline-light' v-on:click.prevent='route()'>Add Trips</button>
      </div>

    <div v-for="trip in trips">
      <router-link v-bind:to="'/trips/' + trip.id">
        <button class='btn-lg btn-primary'>
          View This Trip
        </button>
      </router-link>
        <br>
        <br>
      <h1>From {{ trip.dates.arrival }} to {{ trip.dates.departure }}</h1> 
        <br>
      <h1>Your Parks & Attractions</h1>
        <br>
    <div v-for='int in interests'>
      <div v-if="int.trip_id === trip.id">
      <h4>{{ int.formatted.formatted_start_time }}</h4>
        <p>{{ int.ride.name }} • 
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
        <router-link v-bind:to="'/trips/edit/' + trip.id">
          <button class='btn btn-primary'>
              Edit this Trip
          </button>
        </router-link>
        •
        <button class='btn btn-danger' v-on:click="deleteTrip(trip)">
          Delete Trip
        </button>
      </span>
    </div>

  </div>
</div>
</template>

<style>
  .container {
    text-align: center;
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
    },
    route() {
      this.$router.push('/trips/new')
    }
  }
};
</script>
