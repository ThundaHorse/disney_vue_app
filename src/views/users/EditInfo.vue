<template>
  <div class='edit-info'>
    <h1>Edit Your Info</h1>
      <p id="image"><img v-bind:src="data.avatar" id="profile-pic" v-bind:alt="data.first_name"></p>
       
      <div class="container">
        <form v-on:submit.prevent="update()">

        <div>
          Avatar: <input type="file" v-on:change="setFile($event)" ref="fileInput">
        </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="firstName">First Name</label>
              <input v-model="personalInfo.firstName" type="text" class="form-control" id="fistName" v-bind:placeholder="data.first_name">
            </div>

            <div class="form-group col-md-6">
              <label for="lastName">Last Name</label>
              <input v-model="personalInfo.lastName" type="text" class="form-control" id="lastName" v-bind:placeholder="data.last_name">
            </div>

          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input v-model='personalInfo.email' type="email" class="form-control" id="email" v-bind:placeholder="data.email">
          </div>

          <div class="form-group">
            <label for="phoneNumber">Phone Number</label>
            <input v-model='personalInfo.phoneNumber' type="text" class="form-control" id="phoneNumber" v-bind:placeholder="data.phone_number">
          </div>
          <input class='btn btn-info btn-outline-light' type="submit" value="Submit">
        </form>
      </div>
      
    </div>
</template>

<style>
  img#profile-pic {
    border-radius: 30%;
    display: inline-block;
  }
  p#image {
    text-align: center;
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
        alert("Updated!")
        this.data = response.data
        this.$router.push('/trips')
      }).catch(errors => {
        this.errors = errors
        console.log(this.errors);
      })
    }
  }
};
</script>