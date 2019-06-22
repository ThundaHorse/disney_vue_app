<template>
  <div class='login'>
    <h1>Log In</h1>
    <br>
    <form v-on:submit.prevent='submit()'>
      <ul>
        <li v-for="error in errors">
          {{ error }}
        </li>
      </ul>
      <p>Email: <input type='text' v-model='email'></p>
      <p>Password: <input type='password' v-model='password'></p>
      <br>
      <button v-on:click="submit()">Log In</button>
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
      email: '', 
      password: '',
      errors: []
    };
  },
  created: function() {
    if (localStorage.getItem('jwt')) {
      alert("You are already logged in! Taking you home!") 
      this.$router.push('/trips')
    }
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email, 
        password: this.password
      };
      axios 
        .post('/api/sessions', params) 
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;  

          localStorage.setItem('jwt', response.data.jwt);
          localStorage.setItem('user_id', response.data.user_id); 

          this.$router.push('/trips');
        })
        .catch(error => {
          this.errors = ['Invalid email or Password']; 
          this.email = '';
          this.password = '';
        });
    }
  }
};
</script>