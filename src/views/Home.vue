<template>
  <div class='home'>
    <br>
    <div class="container">
      <h1>Disney Trip Planning App</h1>
        <br>
      <h2>
        Go to: 
        <br>
        <br>
        <router-link v-bind:to="'/trips'"><button class="btn btn-info btn-raised">Trips</button></router-link> • 
        <router-link v-bind:to="'/parks'"><button class="btn btn-info btn-raised">Parks</button></router-link> • 
        <router-link v-bind:to="'/attractions'"><button class="btn btn-info btn-raised">Attractions</button></router-link> • 
        <router-link v-bind:to="'/info'"><button class="btn btn-info btn-raised">Profile</button></router-link>
      </h2>
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

    };
  },
  created: function() {

  },
  methods: {

  }
};
</script>