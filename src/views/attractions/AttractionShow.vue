<template>
  <div class='home'>
    <div class="container">
        <br>
        {{ attraction.lat }} | {{ attraction.lng }}
      <h1>{{ attraction.name }}</h1>

    <div class="container">
      <div style='overflow: hidden;'>
        <h3 style='float: left;'>Located in:</h3>
        <h3 style='float:right;'>{{ attraction.park }}</h3>
      </div>

      <div style='overflow: hidden;'>
        <h3 style='float: left;'>Current Status:</h3>
        <h3 style='float: right;'>{{ attraction.status }}</h3>
      </div>

      <div style='overflow: hidden;'>
        <h3 style='float: left;'>Anticipated Wait:</h3>
        <h3 style='float:right;' v-on:change="talkToApi()">{{ attraction.formatted_wait_time }}</h3>
      </div>

      <img class='showPage' style='border-radius: 5%;' v-bind:src="attraction.image" v-bind:alt="attraction.name">
{{ lats }} | {{ longs }}
      
    </div>
        <br>
    </div>
  </div>  
</template>

<style>
  img.showPage {
    height: 100%;
    width: 100%;
    float: right;
  }
</style>

<script>
import axios from 'axios'
import ActionCable from 'actioncable'
import Location from '../locations/Location.vue'

export default {
  computed: {
    lats: function() {
      return this.attraction.lat
    },
    longs: function() {
      return this.attraction.lng
    },
    rideName: function() {
      return this.attraction.name
    },
    waitTime: function() {
      return this.attraction.formatted_wait_time
    }
  },
  components: {
    [Location.latitude]:Location,
    [Location.longitude]:Location, 
    [Location.rideName]:Location,
    [Location.wait]:Location,
    [Location.name]:Location
  },
  data: function() {
    return {
      attraction: [],
      ride: [],
      mapName: this.name
    }
  },
  created: function() {
    axios.get('/api/attractions/' + this.$route.params.id).then(response => {
      this.attraction = response.data;
      this.mapName = response.data.name + ' map';
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