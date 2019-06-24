<template>
  <div class='trip-new'>
    <h1>New Trip</h1>
  
    <form v-on:submit.prevent="submit()">
      <h3>Arrival Day: <input v-model="arrival" type='text' id='arrival'></h3>
      <h3>Departure Day: <input v-model='departure' type='text' id='departure'></h3>
      <h3>Parks: 
        <button v-on:click.prevent="toggleParks()">Show Parks</button>
      </h3>
        <div v-for='park in park_list'>
          <transition 
            enter-active-class="animated fadeInDownBig"
            leave-active-class="animated fadeOutDownBig">  
              <p style='text-align: left; padding-left: 130px;' v-if='show2' v-animation><b>{{ park.name }}</b> | {{ park.formatted.opening }} - {{ park.formatted.closing }} | <b>{{ park.address }}</b></p>
          </transition>
        </div>
      <h3>Attractions:
        <button v-on:click.prevent="toggle()">Show All Attractions</button>
      </h3>
        <div v-for='ride in attraction_list'>
          <transition 
            enter-active-class="animated bounceInDown"
            leave-active-class="animated bounceOutDown">  
              <p style='text-align: left; padding-left: 130px;' v-if="show" v-animation>{{ ride.name }} <b> | </b>
                <span v-if="ride.park === 'Epcot'" style="color: blue">
                  <b>{{ ride.park }}</b>
                </span> 
                <span v-if="ride.park === 'Magic Kingdom'" style="color: Red">
                  <b>{{ ride.park }}</b>
                </span> 
                <span v-if="ride.park === 'Animal Kingdom'" style="color: Green">
                  <b>{{ ride.park }}</b>
                </span> 
                <span v-if="ride.park === 'Hollywood Studios'" style="color: Orange">
                  <b>{{ ride.park }}</b>
                </span>
              </p>
          </transition>
        </div>

        
    </form>
  </div>
</template>

<style>
</style>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      attraction_list: [],
      park_list: [],
      show: false,
      show2: false
    };
  },
  created: function() {
    axios.get('/api/attractions').then(response => {
      this.attraction_list = response.data; 
    })
    axios.get('/api/parks').then(response => {
      this.park_list = response.data;
    })
  },
  methods: {
    toggle: function() {
      this.show = !this.show;
    },
    toggleParks: function() {
      this.show2 = !this.show2;
    }
  }
};
</script>