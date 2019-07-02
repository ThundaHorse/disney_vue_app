<template>
  <div class='login'>
    <br>
    <div class="container">
      <ul v-for='error in errors'>
        <li>{{ error }}</li>
      </ul>
      <card v-on:submit.prevent='submit()' style='background: none;'>
        <template slot='header'>
          <h3 class='card-title title-up'>
            Log In
          </h3>
        </template>
        <template>
          <fg-input 
            v-model="email"
            type='email'
            class='no-border'
            placeholder='Email'
            >
          </fg-input>

          <fg-input 
            v-model="password"
            type='password'
            class='no-border'
            placeholder='Password'
            >
          </fg-input>

          <div class='card-footer text-center'>
            <button value='submit' class='btn-md btn-round' v-on:click="submit()">Submit</button>
          </div>
        </template>
      </card>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from 'axios'
import { Card, FormGroupInput, Button } from '@/components';

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
      this.$router.push('/info')
    }
  },
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
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

          this.$router.push('/info');
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