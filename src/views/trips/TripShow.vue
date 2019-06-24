<template>
  <div class='trip-show'>
    <h1>Trip {{ trip.id }}</h1>
      <br>
    <h3>Arrival Day: {{ trip.dates.arrival }}</h3>
    <h3>Departure Day: {{ trip.dates.departure }}</h3>
      <br>
    <h3>Attractions & Parks</h3>
      <div v-for='interest in interests'>
        <div v-for='park in interest.park'>
          <h3 style='padding-left: 150px;'>{{ park.name }}</h3>
          <p style='text-align: left; padding-left: 200px;'><b>{{ interest.ride.name }}</b> | {{ interest.ride.duration }} minutes | 
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