<template>
  <div class='trip-edit'>
    <h1>Edit Trip</h1>
    <div class="container">
      <form v-on:submit.prevent="submit()">
          <label for='arrival'>Arrival Date: </label>
          <input v-model='trip.dates.arrival' type='text' id='arrival' v-bind:placeholder='trip.dates.arrival'>
            <br>
            <br>
          <label for='departure'>Departure Date: </label>
          <input v-model='trip.dates.departure' type='text' id='departure' v-bind:placeholder='trip.dates.departure'>
            <br>
            <br>
          <label for='maxWaitTime'>Maximum Willing Wait: </label>
          <input v-model='trip.max_wait_time' type='integer' id='waitTime' v-bind:placeholder='trip.max_wait_time'>
            <br>
            <br>
          <label for='addMoreAttractions'>Add more Attractions</label>
            <br>
           <router-link v-bind:to="'/trips/add/' + trip.id">Attractions</router-link>
            <br>
            <br>
          <h2 style='text-align:center;'>Your Attractions</h2>
            <br>

    <!-- <button v-on:click.prevent="toggle()">Click</button> -->

      <div v-for="int in interests">      
        <!-- <transition 
          enter-active-class="animated rotateInDownLeft" -->
          <!-- <!-- leave-active-class="animated rotateOutUpRight">   --> 
          <!-- <div v-if='show'> -->
            <p v-if='int.trip_id === trip.id'>{{ int.ride.name }} | {{ int.ride.duration }} minutes | <br> <button v-on:click.prevent="remove(int)">Remove Attraction</button></p>
            <img v-if='int.trip_id === trip.id' v-bind:src="int.ride.image" v-bind:alt="int.ride.name" style="display: in-line block;">
          <!-- </div> -->
        <!-- </transition> -->
        </div>
      <br>
      <br>
    <button type='submit'>Update</button> 
  </form>
    </div>
  </div>
</template>

<style>
  img {
    height: 20rem;
    width: 30rem;
    border-radius: 15px;
  }
</style>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      trip: [],
      interests: [], 
      inputArrival: "",
      inputDeparture: "",
      inputWait: "",
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
    remove: function(int) {
      axios.delete("/api/interests/" + int.id).then(response => {
          var index = this.interests.indexOf(int);
          this.interests.splice(index, 1);
        });
    }
  }
};
</script>