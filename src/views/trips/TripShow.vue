<template>
  <div class='trip-show'>
    <div class='container'>
      <h1>Trip {{ trip.id }}</h1>
        <br>
      <h4><router-link v-bind:to="'/trips/edit/' + this.$route.params.id">Edit Trip</router-link></h4>
      <h3>Arrival Day: {{ trip.dates.arrival }}</h3>
      <h3>Departure Day: {{ trip.dates.departure }}</h3>
      <!-- <button v-on:click.prevent="toggle()">Show Attractions</button> -->
        <br>
      <h3>Attractions & Parks</h3>
        <div v-for='interest in interests'>
          <div v-if="interest.trip_id === trip.id">
            <!-- <div v-if='show'> -->
                {{ interest.formatted.formatted_start_time }}
              <h3>{{ interest.park.name }}</h3>
              <p><b>{{ interest.ride.name }}</b> | {{ interest.ride.duration }} minutes | 
              <span v-if="interest.ride.status === 'closed'" style="color: Red;">
                <b>{{ interest.ride.status }}</b>
                  <br>
                <img v-bind:src="interest.ride.image">
              </span>
              <span v-if="interest.ride.status === 'operational'" style="color: Green;">
                <b>{{ interest.ride.status }}</b>
                  <br>
                <img v-bind:src="interest.ride.image">
              </span>
              <span v-if="interest.ride.status === 'maintenance'" style="color: Orange;">
                <b>{{ interest.ride.status }}</b>
                  <br>
                <img v-bind:src="interest.ride.image">
              </span>
              </p>
            <!-- </div> --> 
        </div>        
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
  data: function() {
    return {
      trip: [],
      tickets: [],
      interests: [],
      show: false
    };
  },
  created: function() {
    axios.get('/api/trips/' + this.$route.params.id ).then(response => {
      this.trip = response.data;
    })
    axios.get('/api/interests').then(response => {
      this.interests = response.data;
    })
    axios.get('/api/tickets').then(response => {
      this.tickets = response.data;
    })
  },
  methods: {
    toggle: function() {
      this.show = !this.show;
    }
  }
};
</script>