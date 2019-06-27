<template>
  <div class='login'>
    <h1>Log In</h1>
    <div class="container">
      <form v-on:submit.prevent='submit()'>
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" v-model='email'>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Password" v-model='password'>
        </div>
        <button type="submit" class="btn btn-primary" v-on:click='submit()'>Log In</button>
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