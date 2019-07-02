<template>
  <div class='sign-up'>

    <div class="section section-signup">
      <div class="container">
        <div class="row">
          <card class="card-signup" header-classes="text-center" color= "blue" v-on:submit.prevent="submit()">
            <template slot="header">
              <h3 class="card-title title-up">Sign Up</h3>
              <!-- <div class="social-line">
              </div> -->
              </template>
              <template>
              <fg-input
                v-model="newInput.firstName"
                type="text"
                class="no-border"
                placeholder="First Name"
                addon-left-icon="now-ui-icons users_circle-08"
              >
              </fg-input>

              <fg-input
                class="no-border"
                v-model="newInput.lastName"
                type="text"
                placeholder="Last Name"
                addon-left-icon="now-ui-icons text_caps-small"
              >
              </fg-input>

              <fg-input
                class="no-border"
                v-model="newInput.email"
                type="text"
                placeholder="Email"
                addon-left-icon="now-ui-icons ui-1_email-85"
              >
              </fg-input>

              <fg-input
                class="no-border"
                v-model="newInput.phoneNumber"
                
                placeholder="Phone Number"
                addon-left-icon="now-ui-icons ui-1_email-85"
              >
              </fg-input>

              <fg-input
                class="no-border"
                v-model="newInput.password"
                type="password"
                placeholder="Password"
                addon-left-icon="now-ui-icons text_caps-small"
              >
              </fg-input>

              <fg-input
                class="no-border"
                v-model="newInput.passwordConfirmation"
                type="password"
                placeholder="Confirm password"
                addon-left-icon="now-ui-icons text_caps-small"
              >
              </fg-input>
                <br>
              <input type="file" v-on:change="setFile($event)" ref="fileInput2" class="no-border" id="avatar">

              <div class="card-footer text-center">
                <button value='submit' class='btn-md btn-round' v-on:click="submit()">Submit</button>
              </div>
            </template>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  /* p {
    color: white;
  } */

</style>

<script>
import axios from 'axios'
import { Card, FormGroupInput, Button } from '@/components';


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
      user: [],
      focused: false
    };
  },
  created: function() {
   
  },
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
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
          this.$router.push('/login'); 
        })
        .catch(error => {
          this.errors = error.response.data.errors; 
        }); 
    } 
  }
};
</script>