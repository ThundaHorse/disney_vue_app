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
      <div v-for='yourAttractions in trip.attractions'>
        <div v-for='attraction in yourAttractions'>
          <p>{{ attraction.name }}</p>
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
      tickets: []
    };
  },
  created: function() {
    axios.get('/api/trips/' + this.$route.params.id ).then(response => {
      this.trip = response.data
    })
    axios.get('/api/tickets')
  },
  methods: {

  }
};
</script>