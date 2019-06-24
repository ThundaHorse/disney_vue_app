<template>
  <div class='trip-new'>
    <h1>New Trip</h1>
  
    <form v-on:submit.prevent="submit()">
      <h3>Arrival Day: <input v-model="newArrival" type='date' id='arrival' placeholder="YYYY-MM-DD"></h3>
      <h3>Departure Day: <input v-model='newDeparture' type='date' id='departure' placeholder="YYYY-MM-DD"></h3>
      <h3>Maximum to Wait: <input v-model='newMaxWait' type='integer' id='max_wait' placeholder="total minutes i.e. 100"></h3>
      <h3>Parks: 
        <button v-on:click.prevent="toggleParks()">Show Parks</button>
      </h3>
        <div v-for='park in park_list'>
          <transition 
            enter-active-class="animated fadeInDownBig"
            leave-active-class="animated fadeOutDownBig">  
              <p style='text-align: left; padding-left: 130px;' v-if='show2' v-animation>
                <span v-if="park.name === 'Epcot'" style="color: blue">                
                  <b>{{ park.name }}</b> | {{ park.formatted.opening }} - {{ park.formatted.closing }} | <b>{{ park.address }}</b>
                </span>
                <span v-if="park.name === 'Magic Kingdom'" style="color: red">
                  <b>{{ park.name }}</b> | {{ park.formatted.opening }} - {{ park.formatted.closing }} | <b>{{ park.address }}</b>
                </span>
                <span v-if="park.name === 'Hollywood Studios'" style="color: orange">
                  <b>{{ park.name }}</b> | {{ park.formatted.opening }} - {{ park.formatted.closing }} | <b>{{ park.address }}</b>
                </span>
                <span v-if="park.name === 'Animal Kingdom'" style="color: green">
                  <b>{{ park.name }}</b> | {{ park.formatted.opening }} - {{ park.formatted.closing }} | <b>{{ park.address }}</b>
                </span>
              </p>
          </transition>
        </div>
      <h3>Attractions:
        <button v-on:click.prevent="toggle()">Show All Attractions</button>
      </h3>
      <h3>Attractions to Add:</h3>
        <div v-for='(ride, index) in attraction_list'>
          <transition 
            enter-active-class="animated bounceInDown"
            leave-active-class="animated bounceOutDown">  
              <p style='text-align: left; padding-left: 130px;' v-if="show" v-animation>
                <input v-model='attractionsToAdd[ride.id]' type='checkbox' id='index'>
                {{ index + 1 }} - {{ ride.name }} <b> | </b>
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
      <h3>Start Time: <input v-model='startTime' type='time' id='startTime' placeholder="Desired starting time"> </h3>

      <button v-on:click.prevent="submit()">Submit</button>
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
      show2: false,
      newArrival: '', 
      newDeparture: '', 
      newMaxWait: '',
      startTime: '',
      attractionsToAdd: []
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
    },
    submit: function() {
      var params = {
        arrival_day: this.newArrival, 
        departure_day: this.newDeparture,
        max_wait_time: this.newMaxWait
      }
      var interestParams = {
        trip_id: params.id,
        attractionsToAdd: this.attractionsToAdd,
        startTime: this.startTime
      }
        
      // axios.post('/api/trips/', params).then(response => {
      //   this.$router.push('/trips/')
      // })

      var attractionIds = interestParams.attractionsToAdd; 
      var attrInd = Object.keys(attractionIds);
      for (var i = 0; i < attrInd.length; i ++) {
        // console.log(attrInd[i]);
        axios.get('/api/attractions/' + attrInd[i]).then(response => {
          console.log(response.data.name);
        })

      }
      
      // console.log(interestParams);
      // axios.get('/api/trips' + interestParams.attractionsToAdd).then(response => {
        // console.log(response.data);
      // })
      // axios.post('/api/interests/', interestParams).then(response => {
      //   this.$router.push('/trips/')
      // })
    }
  }
};
</script>