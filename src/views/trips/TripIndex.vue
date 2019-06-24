<template>
<div class="trips-index">
  <div class="container">
    <h1>Your Trips</h1>
      <br>
    <div v-for="trip in trips">
      <h2>From {{ trip.dates.arrival }} to {{ trip.dates.departure }}</h2>
      <h1>Your Parks & Attractions</h1>

    <div v-for="int in interests">
      <div v-for='admission in tickets'>
      <p v-if='admission.id === int.ride.park_id'><b>{{ admission.park }}</b></p>
      </div>
      {{ int.ride.name }} | {{ int.ride.duration }} minutes
    </div>
      <br>
      <button>
        <router-link v-bind:to="'/trips/edit/' + trip.id">
          Edit this Trip
        </router-link>
      </button>
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
      interests: [],
      tickets: [],
      attractions: []
    }
  },
  created: function() {
    axios.get('/api/trips').then(response => {
      this.trips = response.data; 
    })
    axios.get('/api/interests').then(response => {
      this.interests = response.data;
    })
    axios.get('/api/tickets').then(response => {
      this.tickets = response.data;
    })
  },
  methods: {
    toggle() {
      this.show = !this.show;
    }
  }
};
</script>
