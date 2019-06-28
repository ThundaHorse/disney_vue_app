<template>
  <div class='home'>
    <div class="container">
        <br>
      <h1>{{ attraction.name }}</h1>
      <div style='overflow: hidden;'>
        <h3 style='float: left;'>Located in:</h3>
        <h4 style='fload:right;'>{{ attraction.park }}</h4>
      </div>

      <div style='overflow: hidden;'>
        <h3 style='float: left;'>Current Status:</h3>
        <h4 style='fload:right;'>{{ attraction.status }}</h4>
      </div>

      <div style='overflow: hidden;'>
        <h3 style='float: left;'>Anticipated Wait:</h3>
        <h4 style='fload:right;'>{{ attraction.formatted_wait_time }}</h4>
      </div>
        <br>
      <img class='showPage' v-bind:src="attraction.image" v-bind:alt="attraction.name">
    </div>
  </div>
</template>

<style>
  img.showPage {
    height: 100%;
    width: 100%;
  }
</style>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      attraction: []
    };
  },
  created: function() {
    axios.get('/api/attractions/' + this.$route.params.id).then(response => {
      this.attraction = response.data;
      console.log(this.attraction.name);
    });

    // axios.get('')
  },
  methods: {

  }
};
</script>