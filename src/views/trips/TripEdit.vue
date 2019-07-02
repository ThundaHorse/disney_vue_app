<template>
  <div class='trip-edit'>
    <h1>Edit Trip</h1>
    <div class="container">
      <form v-on:submit.prevent="submit()">
          <!-- <label for='arrival'>Arrival Date: </label> -->
          <div class="block">
            <span class="demonstration">Arrival and Departure</span>
            <el-date-picker
              v-model="dates"
              type="daterange"
              clearable=true
              value-format="yyyy-MM-dd"
              range-separator="To"
              v-bind:start-placeholder="trip.arrival_day"
              v-bind:end-placeholder="trip.departure_day">
            </el-date-picker>
          </div>

            <br>

          <label for='maxWaitTime'>Maximum Willing Wait: </label>
          <input v-model='trip.max_wait_time' type='integer' id='waitTime' v-bind:placeholder='trip.max_wait_time'>
            <br>
            <br>
          <label for='addMoreAttractions'>Add more Attractions</label>
            <br>
           <router-link v-bind:to="'/trips/add/' + trip.id"><button class='btn btn-raised btn-lg btn-outline-dark btn-info'>Attractions</button></router-link>
            <br>
            <br>
          <h2 style='text-align:center;'>Your Attractions</h2>
            <br>
        <div v-for="int in interests">      
          <p v-if='int.trip_id === trip.id'>{{ int.ride.name }} <b> | </b> {{ int.ride.anticipated_wait_time }} min wait 
            <br> 
            <button class='btn btn-raised btn-outline-light btn-sm btn-danger' v-on:click.prevent="remove(int)">
              Remove Attraction
            </button>
        </p>
          <img v-if='int.trip_id === trip.id' v-bind:src="int.ride.image" v-bind:alt="int.ride.name" style="display: in-line block;">
        </div>
      <br>
      <br>
    <button class='btn btn-info' type='submit'>Update</button> 
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
import DatePicker from 'element-ui'

export default {
  data: function() {
    return {
      trip: [],
      interests: [], 
      inputWait: "",
      show: false,
      dates: []  
    }
  },
  created: function() {
    if (localStorage.getItem('jwt')) {
      axios.get('/api/trips/' + this.$route.params.id).then(response => {
        this.trip = response.data; 
      })
      axios.get('/api/interests').then(response => {
        this.interests = response.data;
      })
    } else {
      this.$router.push('/login')
    }
  },
  components: {
    DatePicker
  },
  methods: {
    toggle: function() {
      this.show = !this.show;
    },
    submit: function() {
      var params = {
        arrival_day: this.dates[0], 
        departure_day: this.dates[1], 
        max_wait_time: this.trip.max_wait_time
      }
      axios.patch('/api/trips/' + this.$route.params.id, params).then(response => {
        this.$router.push('/trips/' + this.$route.params.id);
      })
      console.log(params);
      console.log('---');
      console.log(this.dates);
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