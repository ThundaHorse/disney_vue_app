<template>
  <div class='user-info'>
      <br>
    <div class='container'>
      <h1>Your Info</h1>
        <br>
        <img v-bind:src="user.avatar" v-bind:alt="user.first_name" class='rounded-pill border-0'>
      <h4>Yo: {{ user.first_name }} {{ user.last_name }}</h4>
      <h4>Email: {{ user.email }}</h4>
      <h4>Phone number: {{ user.phone_number }}</h4>
        <br>
    <button class="btn btn-raised btn-lg btn-info btn-outline-light" v-on:click="edit()">Edit</button>    
    </div>
  </div>
</template>

<style>
  img.rounded-pill {
    box-shadow: 4px 5px 10px rgb(70, 70, 70);
    float: left;
    display: absolute;
    border-radius: 50%;
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
    }
  }
};
</script>