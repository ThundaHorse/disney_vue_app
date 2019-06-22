<template>
  <div class='trip-show'>
    <h1>Trip {{ trip.id }}</h1>
      <br>
    <p>Arrival Day: {{ trip.dates.arrival }}</p>
    <p>Departure Day: {{ trip.dates.departure }}</p>
      <br>
    <h1>Your Parks</h1>
      
    

  </div>
</template>

<style>
</style>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      trip: []
    };
  },
  created: function() {
    axios.get('/api/trips/' + this.$route.params.id ).then(response => {
      this.trip = response.data
    })
  },
  methods: {

  }
};
</script>