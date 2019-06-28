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
      <form v-on:submit.prevent="submit()">
          <div class="form-row">
            <div class="form-group col-md-6">
              <p style='text-align: left;'>First Name</p>
              <input v-model="newInput.firstName" type="text" class="form-control" id="fistName" placeholder="First Name">
            </div>
            <div class="form-group col-md-6">
              <p style='text-align: left;'>Last Name</p>
              <input v-model="newInput.lastName" type="text" class="form-control" id="lastName" placeholder="Last Name">
            </div>
          </div>
          <div class="form-group">
            <p style='text-align:left;'>Email</p>
            <input v-model="newInput.email" type="email" class="form-control" id="email" placeholder="Email">
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <p style='text-align:left;'>Phone Number</p>
              <input v-model="newInput.phoneNumber" type="text" class="form-control" id="phoneNumber" placeholder="Phone Number">
            </div>

            <!-- <div class="form-group col-md-6"> -->
              <p style='text-align: left;'>Avatar</p>
              <div>
                <label for="avatar">Upload a photo</label>
                <input type="file" v-on:change="setFile($event)" ref="fileInput2" class="form-control-file" id="avatar">
              </div>
            <!-- </div> -->

          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <p style='text-align: left;'>Password</p>
              <input v-model="newInput.password" type="password" class="form-control" id="password" placeholder="Password">
            </div>

            <div class="form-group col-md-6">
              <p style='text-align: left;'>Password Confirmation</p>
              <input v-model="newInput.passwordConfirmation" type="password" class="form-control" id="passwordConfirmation" placeholder="Confirm Password">
            </div>
          </div>
        <input type='submit' class='btn-lg btn-primary' value='Sign Up'>
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
      newInput: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        avatar: '',
        password: '',
        passwordConfirmation: ''
      },
      errors: [],
      user: []
    };
  },
  created: function() {
   
  },
  methods: {
    setFile: function() {
      if (event.target.files.length > 0) {
        this.newInput.avatar = event.target.files[0];
      }
    },
    submit: function() {
      var params = new FormData();
        params.append('avatar', this.newInput.avatar); 
        params.append('first_name', this.newInput.firstName);
        params.append('last_name', this.newInput.lastName);
        params.append('phone_number', this.newInput.phoneNumber);
        params.append('email', this.newInput.email); 
        params.append('password', this.newInput.password);
        params.append('password_confirmation', this.newInput.passwordConfirmation); 

      axios.post('/api/users', params) 
        .then(response => {     
          alert('Signed up successfully!')

          this.user = response.data;   
          // this.$router.push('/trips'); 
        })
        .catch(error => {
          this.errors = error.response.data.errors; 
        }); 
    } 
  }
};
</script>