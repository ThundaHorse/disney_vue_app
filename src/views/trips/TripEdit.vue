<template>
  <div class='trip-edit'>
    <h1>Edit Trip</h1>
    <div class="container">
      <!-- {{ interest }} -->
      <form v-on:submit.prevent="submit()">
          <label for='arrival'>Arrival Date: </label>
          <input v-model='trip.dates.arrival' type='text' id='arrival' v-bind:placeholder='trip.dates.arrival'>
            <br>
          <label for='departure'>Departure Date: </label>
          <input v-model='trip.dates.departure' type='text' id='departure' v-bind:placeholder='trip.dates.departure'>
            <br>
          <label for='maxWaitTime'>Maximum Willing Wait: </label>
          <input v-model='trip.max_wait_time' type='integer' id='waitTime' v-bind:placeholder='trip.max_wait_time'>
            <br>
            <br>
          <label for='tripAttractions'>Your Attractions</label>
            <br>
      <!-- {{ interests }} -->
    <button v-on:click.prevent="toggle()">Click</button>
      <div v-for='int in interests'>
        <transition 
          enter-active-class="animated fade bounceIn"
          leave-active-class="animated fade bounceOut">  
          <li style="text-align: left; padding-left: 200px;" v-if="show" v-animation>{{ int.ride.name }} | {{ int.id }}<button v-on:click.prevent="remove(int)">Remove Attraction</button></li>
        </transition>
      </div>
      <br>
      <br>
    <button type='submit'>Update</button>
  </form>
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
      interests: [], 
      show: false
    };
  },
  created: function() {
    axios.get('/api/trips/' + this.$route.params.id).then(response => {
      this.trip = response.data; 
    })
    axios.get('/api/interests').then(response => {
      this.interests = response.data;
    })

  },
  methods: {
    toggle: function() {
      this.show = !this.show;
    },
    submit: function() {
      var params = {
        arrival: this.trip.dates.arrival, 
        departure: this.trip.dates.departure, 
        max_wait_time: this.trip.max_wait_time
      }
      axios.patch('/api/trips/' + this.$route.params.id, params).then(response => {
        this.$router.push('/trips/' + this.$route.params.id);
      })
    },
    remove: function(input) {
      axios.delete("/api/interests/" + input.id).then(response => {
          var index = this.interests.indexOf(input);
          this.interests.splice(index, 1);
        });
    }
  }
};
</script>