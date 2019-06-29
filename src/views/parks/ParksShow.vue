<template>
  <div class='parks-show'>
    <div class="container">
      <br>
      <img class='show' v-bind:src="park.image" v-bind:alt="park.name">
        <br>
      <h1 id="title">{{ park.name }}</h1>
        <p id="title">{{ park.address }}</p>
    <!-- <div v-for='attr in park.attractions'>
      <div v-for="permalink in park.short"> -->
        <!-- {{ permalink.name }} -->
        <!-- {{ attr.name }} -->
        <!-- <div v-if='attr.name === permalink.name'> -->
          <!-- {{ permalink.permalink }} -->
          <!-- {{ attr.name }} -->
        <!-- </div> -->
      <!-- </div> -->
    <!-- </div> -->
      
      <p>Lattitude: {{ locations.data.results[0].geometry.location.lat }} | Longitude: {{ locations.data.results[0].geometry.location.lng }}</p>
      <p id="title"><b>Open</b>: {{ park.formatted.opening }} | <b>Close</b>: {{ park.formatted.closing }}</p>
        <h1>Attraction List</h1>
      <p class='show' v-for="attraction in park.attractions"> 
        <!-- {{ attraction }} -->
        {{ attraction.name }} • Estimated wait: {{ attraction.anticipated_wait_time }}
      </p>
      <br>
    </div>

  </div>
</template>

<style>
  img.show { 
    max-width: 55rem;
  }
</style>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      park: [],
      locations: []
    };
  },
  created: function() {
    axios.get('/api/parks/' + this.$route.params.id).then(response => {
      this.park = response.data;
    })
    axios.get('/api/locations/' + this.$route.params.id).then(response => {
      this.locations = response.data;
    })
  },
  methods: {

  }
};
</script>