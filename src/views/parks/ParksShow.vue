<template>
  <div class='parks-show'>
    <div class="container">
      <br>
      <img class='show' v-bind:src="park.image" v-bind:alt="park.name">
        <br>
      <h1 id="title">{{ park.name }}</h1>
        <p id="title">{{ park.address }}</p>
        <p id="title"><b>Open</b>: {{ park.formatted.opening }} | <b>Close</b>: {{ park.formatted.closing }}</p>
      <h1>Attraction List</h1>

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
      <p class ='show' v-for="attraction in park.attractions"> 
        {{ attraction.name }} 
      </p>
      <br>
    </div>

  </div>
</template>

<style>
  img.show { 
    max-width: 45rem;
  }
</style>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      park: []
    };
  },
  created: function() {
    axios.get('/api/parks/' + this.$route.params.id).then(response => {
      this.park = response.data;
    })
  },
  methods: {

  }
};
</script>