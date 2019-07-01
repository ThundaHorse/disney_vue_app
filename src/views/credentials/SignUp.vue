<template>
  <div class='sign-up'>
      <br>
    <h1>Sign Up</h1>
      <br>
      <ul>
        <li
         v-for="error in errors"
         :key = "error"
         >
          {{ error }}
        </li>
      </ul>
    <div class="container">
      <form v-on:submit.prevent="submit()">
          <div class="form-row">
            <div class="form-group col-md-6">
              <p style='text-align: left;' class="bmd-label-floating">First Name</p>
              <input v-model="newInput.firstName" type="text" class="form-control" id="fistName" placeholder="">
            </div>
            <div class="form-group col-md-6">
              <p style='text-align: left;' class="bmd-label-floating">Last Name</p>
              <input v-model="newInput.lastName" type="text" class="form-control" id="lastName" placeholder="">
            </div>
          </div>
          <div class="form-group">
            <p style='text-align:left;' class="bmd-label-floating">Email</p>
            <input v-model="newInput.email" type="email" class="form-control" id="email" placeholder="">
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <p style='text-align:left;' class="bmd-label-floating">Phone Number</p>
              <input v-model="newInput.phoneNumber" type="text" class="form-control" id="phoneNumber" placeholder="">
            </div>

            <!-- <div class="form-group col-md-6"> -->
              <p style='text-align: left;' class="bmd-label-floating">Avatar</p>
              <div>
                <label for="avatar" class="bmd-label-floating">Upload a photo</label>
                <input type="file" v-on:change="setFile($event)" ref="fileInput2" class="form-control-file" id="avatar">
              </div>
            <!-- </div> -->

          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <p style='text-align: left;' class="bmd-label-floating">Password</p>
              <input v-model="newInput.password" type="password" class="form-control" id="password" placeholder="">
            </div>

            <div class="form-group col-md-6">
              <p style='text-align: left;' class="bmd-label-floating">Password Confirmation</p>
              <input v-model="newInput.passwordConfirmation" type="password" class="form-control" id="passwordConfirmation" placeholder="">
            </div>
          </div>
        <input type='submit' class='btn btn-raised btn-primary' value='Sign Up'>
      </form>
    </div>
  </div>
</template>

<style>
  p {
    color: white;
  }
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
      axios.post('http://localhost:3000/api/users', params) 
        .then(response => {     
          alert('Signed up successfully!')
          this.user = response.data;   
          this.$router.push('/login'); 
        })
        .catch(error => {
          this.errors = error.response.data.errors; 
        }); 
    } 
  }
};
</script>