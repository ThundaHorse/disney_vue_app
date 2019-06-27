<template>
  <div class='edit-info'>
    <h1>Edit Your Info</h1>
      <p id="image"><img v-bind:src="data.image" id="profile-pic" v-bind:alt="data.first_name"></p>

      <div class="container">
        <form v-on:submit.prevent="update()">
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
            <input type="email" class="form-control" id="email" v-bind:placeholder="data.email">
          </div>

          <div class="form-group">
            <label for="phoneNumber">Phone Number</label>
            <input type="text" class="form-control" id="phoneNumber" v-bind:holder="data.phone_number">
          </div>

          <div class="form-group">
            <label for="image">Image</label>
            <input type="text" class="form-control" id="image" v-bind:holder="data.image">
          </div>

          <button type="submit" class="btn btn-primary">Update info</button>
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
        image: ''
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
    update() {
      var params = {
        first_name: this.personalInfo.firstName || this.data.first_name,
        last_name: this.personalInfo.lastName || this.data.last_name,
        email: this.personalInfo.email || this.data.email,
        phone_number: this.personalInfo.phoneNumber || this.data.phone_number,
        image: this.personalInfo.image || this.data.image
      }
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