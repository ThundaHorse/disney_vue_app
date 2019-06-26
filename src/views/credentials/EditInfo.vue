<template>
  <div class='edit-info'>
    <h1>Your Info</h1>
    <div v-for="info in data">
      {{ info }}
      <h3>First Name: <input v-model="personalInfo.firstName" type="text" id="first" v-bind:placeholder="info.first_name"></h3>
      <h3>Last Name: <input v-model="personalInfo.lastName" type="text" id="last" v-bind:placeholder="info.last_name"></h3></div>
      <h3>Email: <input v-model="personalInfo.email" type="email" id="email" v-bind:placeholder="info"></h3>
      <h3>Phone Number: </h3>

  </div>
</template>

<style>
</style>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      data: [],
      personalInfo: {
        firstName: '',
        lastName: '',
        email: ''
      }
    };
  },
  created: function() {
    if (localStorage.getItem('user_id')) {
      axios.get('/api/users/').then(response => {
        this.data = response.data
      });
    }
  },
  methods: {

  }
};
</script>