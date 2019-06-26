<template>
  <div class='edit-info'>
    <h1>Your Info</h1>
      <img v-bind:src="data.image" id="profile-pic" v-bind:alt="data.first_name">

      <form v-on:submit.prevent="update()">
        <h3 id="editPage">First Name: <input v-model='personalInfo.firstName' type='text' id='firstName' v-bind:placeholder="data.first_name"></h3>

        <h3 id="editPage">Last Name: <input v-model='personalInfo.lastName' type='text' id='lastName' v-bind:placeholder="data.last_name"></h3>

        <h3 id="editPage">Email: <input v-model='personalInfo.email' type='text' id='email' v-bind:placeholder="data.email"></h3>

        <h3 id="editPage">Phone Number: <input v-model='personalInfo.phone_number' type='text' id='phoneNumber' v-bind:placeholder="data.phone_number"></h3>

        <h3 id="editPage">Image: <input v-model='personalInfo.image' type='text' id='image' v-bind:placeholder="data.image"></h3>
        
        <button type="submit">Update Info</button>
      </form>
    </div>
</template>

<style>
  img#profile-pic {
    border-radius: 50%;
  }
  input {
    border-radius: 10px;
  }
  h3#editPage {
    text-align: center;
    padding-right: 100px;
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