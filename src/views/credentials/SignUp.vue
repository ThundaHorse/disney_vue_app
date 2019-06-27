<template>
  <div class='sign-up'>
      <br>
    <h1>Sign Up</h1>
      <br>
      <ul>
        <li v-for="error in errors">
          {{ error }}
        </li>
      </ul>

    <div class="container">
      <form v-on:submit.prevent="update()">
          <div class="form-row">
            <div class="form-group col-md-6">
              <p style='text-align: left;'>First Name</p>
              <input v-model="firstName" type="text" class="form-control" id="fistName" placeholder="First Name">
            </div>

            <div class="form-group col-md-6">
              <p style='text-align: left;'>Last Name</p>
              <input v-model="lastName" type="text" class="form-control" id="lastName" placeholder="Last Name">
            </div>
          </div>

          <div class="form-group">
            <p style='text-align:left;'>Email</p>
            <input v-model="email" type="email" class="form-control" id="email" placeholder="Email">
          </div>
          <div class="form-group">
            <p style='text-align:left;'>Phone Number</p>
            <input v-model="phoneNumber" type="text" class="form-control" id="phoneNumber" placeholder="Phone Number">
          </div>
          <div class="form-group">
            <p style='text-align: left;'>Image</p>
            <input v-model="image" type="text" class="form-control" id="image" placeholder="Image URL">
          </div>
          <div class="form-row">
              <div class="form-group col-md-6">
                <p style='text-align: left;'>Password</p>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
              </div>

              <div class="form-group col-md-6">
                <p style='text-align: left;'>Password Confirmation</p>
                <input v-model="passwordConfirmation" type="password" class="form-control" id="passwordConfirmation" placeholder="Confirm Password">
              </div>
          </div>
      </form>
      <button v-on:click="submit()" class="btn btn-primary">Sign Up</button>
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
    if (localStorage.getItem('jwt')) {
      alert("You are already signed in!")
      this.$router.push('/trips')
    }
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
          this.$router.push('/trips'); 
        })
        .catch(error => {
          this.errors = error.response.data.errors; 
        }); 
    }
  }
};
</script>