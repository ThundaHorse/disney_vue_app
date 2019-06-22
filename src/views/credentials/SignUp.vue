<template>
  <div class='sign-up'>
    <h1>Sign Up</h1>
    <br>
    <form v-on:submit.prevent='submit()'>
      <ul>
        <li v-for="error in errors">
          {{ error }}
        </li>
      </ul>

      <p>First Name: <input type='firstName' v-model='firstName'></p>
      <p>Last Name: <input type='lastName' v-model='lastName'></p>
      <p>Email: <input type='email' v-model='email'></p>
      <p>Image: <input type='image' v-model='image'></p>
      <p>Phone Number: <input type='phoneNumber' v-model='phoneNumber'></p>
      <br>
      <p>Password: <input type='password' v-model='password'></p>
      <p>Password Confirmation: <input type='password' v-model='passwordConfirmation'></p>
  
      <input type="submit" value="submit">
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
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      image: '',
      password: '',
      passwordConfirmation: '',
      errors: []
    };
  },
  created: function() {

  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.firstName,
        last_name: this.lastName, 
        email: this.email, 
        phone_number: this.phoneNumber, 
        image: this.image, 
        password: this.password, 
        password_confirmation: this.passwordConfirmation
      };

      axios.post('/api/users', params) 
        .then(response => {
          this.$router.push('/login'); 
        })
        .catch(error => {
          this.errors = error.response.data.errors; 
        }); 
    }
  }
};
</script>