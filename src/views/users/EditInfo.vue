<template>
  <div class='edit-info'>
    <h1>Edit Your Info</h1>
      <div class="container">
        <div class='image'>
          <img v-bind:src="data.avatar" v-bind:alt="data.first_name" class='rounded-pill border-0'>
        </div>

        <div v-if='updated' class="alert alert-success alert-dismissible fade show" role="alert" style="opacity: 0.6">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          <p style='color:black;'>Updated! Click <a href='/trips' class="alert-link">here</a> to go to your trips!</p>
        </div>

        <form v-on:submit.prevent="update()">
          <div>
            <label for="avatarUpload"></label>
            <input class='form-control-file' id='avatarUpload' type="file" v-on:change="setFile($event)" ref="fileInput">
          </div>
            <br>
          <div class="form-row">
            <div class="form-group col-md-6">
              <p style='text-align: left; color: black;'>First Name</p>
              <label for="firstName" class="bmd-label-placeholder"></label>
              <input v-model="personalInfo.firstName" type="text" class="form-control" id="fistName" v-bind:placeholder="data.first_name">
            </div>

            <div class="form-group col-md-6">
              <p style='text-align: left; color: black;'>Last Name</p>
              <label for="lastName" class="bmd-label-placeholder"></label>
              <input v-model="personalInfo.lastName" type="text" class="form-control" id="lastName" v-bind:placeholder="data.last_name">
            </div>
          </div>

        <div class="form-row">
          <div class="form-group col-md-8">
            <label for="email"></label>
            <p style='text-align: left; color: black;'>Email</p>
            <input v-model='personalInfo.email' type="email" class="form-control" id="email" v-bind:placeholder="data.email">
          </div>

          <div class="form-group col-md-4">
            <label for="avatarUpload"></label>
            <input class='form-control-file' id='avatarUpload' type="file" v-on:change="setFile($event)" ref="fileInput">
          </div>
        </div>

          <div class="form-group">
            <label for="phoneNumber"></label>
            <p style='text-align: left; color: black;'>Phone Number</p>
            <input v-model='personalInfo.phoneNumber' type="text" class="form-control" id="phoneNumber" v-bind:placeholder="data.phone_number">
          </div>
          <button class="btn btn-raised btn-primary" type='submit' value="Submit">Submit</button>
        </form>
      </div>
    </div>
</template>

<style>
  .image {
    text-align: center;
    padding-left: 300px;
    opacity: 0.8;
  }
  h1 {
    text-align: center;
  }
</style>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      data: [],
      errors: [],
      updated: false,
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '', 
        avatar: ''
      }
    };
  },
  created: function() {
    if (localStorage.getItem('jwt')) {
      axios.get('/api/users/' + localStorage.getItem('user_id')).then(response => {
        this.data = response.data
      });
    } else {
      alert("Sign in to edit your information!")
      this.$router.push('/login')
    }
  },
  methods: {
    setFile: function() {
      if (event.target.files.length > 0) {
        this.personalInfo.avatar = event.target.files[0]; 
      }
    },
    update() {
      var params = new FormData();
        params.append('avatar', this.personalInfo.avatar || this.data.avatar);
        params.append('first_name', this.personalInfo.firstName || this.data.first_name);
        params.append('last_name', this.personalInfo.lastName || this.data.last_name);
        params.append('email', this.personalInfo.email || this.data.email);
        params.append('phone_number', this.personalInfo.phoneNumber || this.data.phone_number);

      axios.patch('/api/users/' + this.data.id, params).then(response => {
        // alert("Updated!")
        this.data = response.data
        // this.$router.push('/info')
      }).catch(errors => {
        this.errors = errors
        console.log(this.errors);
      })
      this.updated = true; 
        // this.$forceUpdate();
    }
  }
};
</script>