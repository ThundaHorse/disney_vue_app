<template>
  <div class='trip-new'>
    <h1>New Trip</h1>

    <form v-on:submit.prevent="submit()">
      <h3>Arrival Day: <input v-model="arrival" type='text' id='arrival'></h3>
      <h3>Departure Day: <input v-model='departure' type='text' id='departure'></h3>



    </form>
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