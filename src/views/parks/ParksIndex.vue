<template>
  <div class='parks-index'>
    <h1>Walt Disney World Parks</h1>
    <div v-for="park in parks">
      <img class="index" v-bind:src="park.image" v-bind:alt='park.name'>
      <h2><router-link v-bind:to="'/parks/' + park.id">{{ park.name }}</router-link></h2>
      <h3 id="parks">{{ park.address }}</h3>
      <h3>Park Hours: {{ park.formatted.opening }} - {{ park.formatted.closing }}</h3>
      <h3>Attractions</h3>
        <li class='index' v-for="attraction in park.attractions">{{ attraction.name }}</li>
      <br>
      <br>
    </div>
  </div>
</template>

<style>
  img.index {
    border-radius: 5%;
    max-width: 25rem;
    float: right;
  }
  h2 {
    text-align: left;
    padding-left: 50px;
  }
  h3#parks {
    padding-left: 50px;
  }
  h3 {
    text-align: left; 
    padding-left: 100px;
  }
  li.index {
    text-align: left; 
    padding-left: 100px;
  }
</style>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      parks: []
    };
  },
  created: function() {
    axios.get('/api/parks').then(response => {
      this.parks = response.data;
    })
  },
  methods: {

  }
};
</script>