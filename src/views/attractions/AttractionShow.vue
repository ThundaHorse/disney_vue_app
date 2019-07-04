<template>
  <div class='home'>
    <div class="container">
        <br>
      <h1>{{ attraction.name }}</h1>
      <div style='overflow: hidden;'>
        <h3 style='float: left;'>Located in:</h3>
        <h4 style='fload:right;'>{{ attraction.park }}</h4>
      </div>

      <button v-on:click="talkToApi()">
        Talk
      </button>


      <div style='overflow: hidden;'>
        <h3 style='float: left;'>Current Status:</h3>
        <h4 style='fload:right;'>{{ attraction.status }}</h4>
      </div>

      <div style='overflow: hidden;'>
        <h3 style='float: left;'>Anticipated Wait:</h3>
        <h4 style='fload:right;' v-on:change="talkToApi()">{{ attraction.formatted_wait_time }}</h4>
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
import ActionCable from 'actioncable'

export default {
  data: function() {
    return {
      attraction: [],
      ride: [] 
    }
  },
  created: function() {
    axios.get('/api/attractions/' + this.$route.params.id).then(response => {
      this.attraction = response.data;
    })

    var cable = ActionCable.createConsumer('ws://localhost:3000/cable');

    cable.subscriptions.create("AttractionsChannel", {
      connected: () => {
        console.log("Connected");
      }, 
      disconnected: () => {
        console.log("Disconnected");
      }, 
      received: data => {
        // console.log(`Received: ${data}`);
        // attraction.push(data);
        this.ride = data;
      }
    })
  },
  methods: {
     talkToApi: function() {
      axios.get('/api/attractions/' + this.$route.params.id).then(response => {
        this.attraction = response.data; 
        location.reload();
      })
      this.attraction = this.ride; 
    }
  }
};
</script>