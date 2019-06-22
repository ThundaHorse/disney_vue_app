<template>
<div class="container">
  <div class="trips-index">
    <h1>Your Trips</h1>
      <br>

    <h2>Attractions</h2>
      <div v-for="trip in trips">
    <h2>From {{ trip.dates.arrival }} to {{ trip.dates.departure }}</h2>
        <p><router-link v-bind:to="'/parks/'+ trip.parks.id"><b>{{ trip.parks.name }}</b></router-link>
         | {{ trip.attraction.name }}</p>
        <br>
      </div>
    {{ trips }}

  </div>
</div>
</template>

<script>
import axios from 'axios' 

export default {
  data() {
    return {
      trips: [],
      tickets: [],
      attractions: []
    }
  },
  created: function() {
    axios.get('/api/trips').then(response => {
      this.trips = response.data; 
    })
  },
  methods: {
    
  }
};
</script>
