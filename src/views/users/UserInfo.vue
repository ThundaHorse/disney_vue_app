<template>
  <div class='user-info'>
      <br>
    <div class='container'>
      <div v-if="time() === 'AM'">
          <br>
        <h1>Good Morning {{ user.first_name }}!</h1>
      </div>
      <div v-else>
          <br>
        <h1>Good Evening {{ user.first_name }}!</h1>
      </div>
        <br>
          <img v-bind:src="user.avatar" v-bind:alt="user.first_name" class='img-display'>

        
      <div v-if="this.userTrips.length >= 1">
        <h4 v-bind="computedTripLength()">{{numberOfTrips}} Click <router-link to='/trips'>here</router-link> to see your trips!</h4>
      </div>
      <div v-else>
        <h4 v-bind="computedTripLength()">{{numberOfTrips}} Click <router-link to='/trips/new'>here</router-link> to plan a trip!</h4>
      </div>
        <br>

      <h5>Email: {{ user.email }}</h5>
      <h5>Phone number: {{ user.phone_number }}</h5>
    <button class="btn btn-round btn-raised btn-md btn-info" v-on:click="edit()">Edit your info</button>    
    </div>
  </div>
</template>

<style scoped>
  img.img-display {
    box-shadow: 4px 5px 10px rgb(70, 70, 70);
    width: auto;
    overflow: hidden;
    border-radius: 4%;
  }
  
</style>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      user: [],
      userTrips: [],
      numberOfTrips: ''
    };
  },
  created: function() {
    axios.all([
      axios.get('/api/users/' + localStorage.getItem('user_id')),
      axios.get('/api/trips')
    ])
    .then(axios.spread((first_response, second_response) => {
      this.user = first_response.data;
      this.userTrips = second_response.data;
    }))
  },
  methods: {
    edit() {
      this.$router.push('/edit-info')
    },
    time() {
      var time = new Date().toLocaleTimeString('en-US', { hour12: true, 
                                             hour: "numeric", 
                                             minute: "numeric"});
      return time.split(" ")[1];
    },
    computedTripLength () {
      if (this.userTrips.length > 1) {
        this.numberOfTrips = `You have ${this.userTrips.length} upcoming trips!`
      } else if (this.userTrips.length === 1) {
        this.numberOfTrips = "You have 1 upcoming trip!"
      } else if (this.userTrips.length <= 0) {
        this.numberOfTrips = "You currently have no planned trips."
      }
      return this.numberOfTrips
    }
  }
};
</script>