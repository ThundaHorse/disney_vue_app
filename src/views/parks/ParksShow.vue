<template>
  <div class='parks-show'>
    <img class='show' v-bind:src="park.image" v-bind:alt="park.name">

    <div class="heading">
      <h1 id="title">{{ park.name }}</h1>
        <p id="title">{{ park.address }}</p>
        <p id="title"><b>Open</b>: {{ park.formatted.opening }} | <b>Close</b>: {{ park.formatted.closing }}</p>
      <br>
    </div>

    <div class="wrapper">
    <h2>Attraction List</h2>
      <li class ='show' v-for="attraction in park.attractions">
        {{ attraction.name }}
      </li>
    </div>
    <br>



  </div>
</template>

<style>
  h1#title, p#title {
    padding-right: 100px;
  }
  .parks-show {
    margin-right: 50px;
  }
  img.show { 
    float: left;
    max-width: 45rem;
    display: inline-block;
  }
  .heading {
    margin-left: 750px; 
  }
  .wrapper {
    width: 50%;
    margin-left: 700px;
  }
  h2, li.show {
    text-align: left;
    padding-left: 60px;
  }

</style>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      park: []
    };
  },
  created: function() {
    axios.get('/api/parks/' + this.$route.params.id).then(response => {
      this.park = response.data;
    })
  },
  methods: {

  }
};
</script>