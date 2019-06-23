<template>
  <div class='trip-show'>
    <h1>Trip {{ trip.id }}</h1>
      <br>
    <h3>Arrival Day: {{ trip.dates.arrival }}</h3>
    <h3>Departure Day: {{ trip.dates.departure }}</h3>
      <br>
    <h3>Parks</h3>
    
      <div v-for='park in trip.places_to_go'>
        <p>{{ park.name }}</p>
      </div>
      <br>
    <h3>Attractions</h3>
      <div v-for='attraction in trip.things_to_see'>
        <p>{{ attraction.name }}</p>        
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