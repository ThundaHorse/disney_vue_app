<template>
  <div class='trip-add'>
    <h1>Trip {{ trip.id }}</h1>

      <div v-for='ride in attractions'>
        <p>
          Enter Time you would like to attend at: 
          <datetime v-model="startTime" type="time"></datetime>
          <button v-on:click.prevent="createInterest(ride)"> 
            Click to add 
          </button>        
          {{ ride.name }} <b> | </b>
          <span v-if="ride.park === 'Epcot'" style="color: blue">
            <b>{{ ride.park }}</b>
          </span> 
          <span v-if="ride.park === 'Magic Kingdom'" style="color: Red">
            <b>{{ ride.park }}</b>
          </span> 
          <span v-if="ride.park === 'Animal Kingdom'" style="color: Green">
            <b>{{ ride.park }}</b>
          </span> 
          <span v-if="ride.park === 'Hollywood Studios'" style="color: Orange">
            <b>{{ ride.park }}</b>
          </span>
        </p>
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
      attractions: [],
      startTime: ''
    };
  },
  created: function() {
    axios.get('/api/trips/' + this.$route.params.id).then(response => {
      this.trip = response.data;
    })
    axios.get('/api/attractions').then(response => {
      this.attractions = response.data; 
    })
  },
  methods: {
    createInterest(inputRide) {
      inputRide.interested = !inputRide.interested;
        var interestParams = {
          trip_id: this.trip.id,
          attraction_id: inputRide.id,
          start_time: this.startTime
        }

      axios.post('/api/interests', interestParams).then(response => {
        alert(response.data.ride.name + " added successfully!");
      })
    }
  }
};
</script>