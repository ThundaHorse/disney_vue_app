<template>
<div class="trips-index">
  <div class="container">
    <h1>Your Trips</h1>
      <br>
    <div v-for="trip in trips">
      <button>
        <router-link v-bind:to="'/trips/edit/' + trip.id">
          Edit this Trip
        </router-link>
      </button>
      <h2>From {{ trip.dates.arrival }} to {{ trip.dates.departure }}</h2>
      <h1>Your Parks & Attractions</h1>
      <p><router-link v-bind:to="'/parks/'+ trip.parks.id"><b>{{ trip.parks.name }}</b></router-link></p>
      <div v-for="thing in trip.things_to_see"> 
        <li>{{ thing.name }}</li>
      </div>
      <br>
    </div>
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
