<template>
  <div class='user-info'>
      <br>
    <div class='container'>
      <h1>Your Info</h1>
        <br>

        <div class="photo-container">
          <img v-bind:src="user.avatar" v-bind:alt="user.first_name" class='img-circle'>
        </div>

      <div v-if="time() === 'AM'">
          <br>
        <h1>Good Morning {{ user.first_name }}!</h1>
      </div>
      <div v-else>
          <br>
        <h1>Good Evening {{ user.first_name }}!</h1>
      </div>
        <br>
      <h4>Email: {{ user.email }}</h4>
      <h4>Phone number: {{ user.phone_number }}</h4>
        <br>
    <button class="btn btn-raised btn-lg btn-info btn-outline-light" v-on:click="edit()">Edit</button>    
    </div>
  </div>
</template>

<style>
  img.img-raised {
    box-shadow: 4px 5px 10px rgb(70, 70, 70);
    width: 60%;
    overflow: hidden;
  }
</style>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      user: [],
      user_trips: []
    };
  },
  created: function() {
    axios.get('/api/users/' + localStorage.getItem('user_id')).then(response => {
      this.user = response.data;
    });
    axios.get('/api/trips').then(response => {
      this.user_trips = response.data;
    })
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
    }
  }
};
</script>