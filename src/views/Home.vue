<template>
  <div class="home">
    <p>Placeholder</p>
    <p>{{ trips }}</p>    

    <div v-for='ticket in tickets'>
      <p> {{ ticket }} </p>
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
      parks: [] 
    }
  },
  created: function() {
    axios.get('/api/trips').then(response => {
      this.trips = response.data; 
    });
    axios.get('/api/tickets').then(response => {
      this.tickets = response.data; 
    });
    axios.get('/api/parks').then(response => {
      this.parks = response.data;
    })
  },
  methods: {

  }
};
</script>
