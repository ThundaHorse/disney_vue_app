<template>
  <div class='trip-show'>
    <h1>Trip {{ trip.id }}</h1>
      <br>
    <h3>Arrival Day: {{ trip.dates.arrival }}</h3>
    <h3>Departure Day: {{ trip.dates.departure }}</h3>
      <br>
    <h3>Parks</h3>
      
      <div v-for='yourParks in trip.parks'>
        <div v-for='park in yourParks'>
          <p>{{ park.name }}</p>
        </div>
      </div>
      <br>
    <h3>Attractions</h3>
      <div v-for='interest in interests'>
        <div v-for='park in interest.park'>
          {{ park.name }}
        <p><b>{{ interest.ride.name }}</b> | {{ interest.ride.duration }} minutes | 
        <span v-if="interest.ride.status === 'closed'" style="color: Red;">
          <b>{{ interest.ride.status }}</b>
        </span>
        <span v-if="interest.ride.status === 'operational'" style="color: Green;">
          <b>{{ interest.ride.status }}</b>
        </span>
        <span v-if="interest.ride.status === 'maintenance'" style="color: Orange;">
          <b>{{ interest.ride.status }}</b>
        </span>
        </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      trip: [],
      tickets: [],
      interests: []
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

  }
};
</script>