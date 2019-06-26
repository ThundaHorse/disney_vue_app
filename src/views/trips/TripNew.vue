<template>
  <div class='trip-new'>
    <h1>New Trip</h1>

    <form v-on:submit.prevent="submit()">
      <h3>Arrival Day:<datetime v-model="newArrival" type="date"></datetime></h3>
      <!-- <h3>Arrival Day: <input v-model="newArrival" type='date' id='arrival' placeholder="YYYY-MM-DD"></h3> -->
      <h3>Departure Day: <datetime v-model="newDeparture" type="date"></datetime></h3>
      <h3>Maximum to Wait: <input v-model='newMaxWait' type='integer' id='max_wait' placeholder="total minutes i.e. 100"></h3>

        <div v-if="tripCreated === false">
          <button v-on:click.prevent="submit()">
            Set Dates and wait
          </button>
        </div>
        <div v-else="tripCreated === true">
          <p2>Dates have been saved! Please select your attractions below!</p2>
        </div>

      <h3>Parks: 
        <!-- <button v-on:click.prevent="toggleParks()">Show Parks</button> -->
      </h3>
        <div v-for='park in park_list'>
          <!-- <transition 
            enter-active-class="animated fadeInDownBig"
            leave-active-class="animated fadeOutDownBig">   -->
              <!-- <p style='text-align: left; padding-left: 130px;' v-if='show2' v-animation> -->
              <p>
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
          <!-- </transition> -->
        </div>
      <div v-if="tripCreated === true">
        <br>
      <h3>Date Going: <datetime v-model="dayAtPark" type='datetime'></datetime></h3>
      <h3>Attractions:
        <!-- <button v-on:click.prevent="toggle()">Show All Attractions</button> -->
      </h3>
        <h3>Attractions to Add:</h3>
          <div v-for='ride in attraction_list'>
            <!-- <transition 
              enter-active-class="animated bounceInDown"
              leave-active-class="animated bounceOut.Down">   -->
                <!-- <p style='text-align: left; padding-left: 130px;' v-if="show" v-animation> -->
                <p>
                  <div v-bind:class="{ addOrRemove: ride.interest }">   
                    <button v-on:click.prevent="createInterest(ride)"> 
                      Click to add 
                    </button>        
                  </div>
                  {{ ride.name }} <b> | </b>
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
            <!-- </transition> -->
          </div>
          <button v-on:click.prevent="seeYourTrip()">Done</button>
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
      errors: [], 
      attraction_list: [],
      park_list: [],

      show: false,
      show2: false,
      tripCreated: false,
      isInterested: false,

      newArrival: '', 
      newDeparture: '', 
      newMaxWait: '',
      startTime: '',  
      dayAtPark: '',

      newTrip: [], 
      attractionsToAdd: [],
      newInterest: [],

      added: false
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
  computed: {
    addOrRemove: function() {
      console.log(this.content['addOrRemove'] ? 'add' : 'remove');
    }
  },
  methods: {
    // toggle: function() {
    //   this.show = !this.show;
    // },
    // toggleParks: function() {
    //   this.show2 = !this.show2;
    // },
    toAdd() {

    },
    toRemove() {

    },
    seeYourTrip() {
      this.$router.push('/trips/' + this.newTrip.id);
    },
    submit() {
      var params = {
        arrival_day: this.newArrival, 
        departure_day: this.newDeparture,
        max_wait_time: this.newMaxWait
      }
      axios.post('/api/trips', params).then(response => {
        this.newTrip = response.data; 
        this.tripCreated = true; 
      })
    }, 

    createInterest(inputRide) {
      inputRide.interested = !inputRide.interested;
      if (this.newTrip.id !== undefined) {
        var interestParams = {
            trip_id: this.newTrip.id,
            attraction_id: inputRide.id,
            start_time: this.dayAtPark + "T" + this.startTime +"Z"
          }
        axios.post('/api/interests', interestParams).then(response => {
          alert(response.data.ride.name + " added successfully!");
        })
      } else {
        setTimeout(createInterest(inputRide), 500);
      }
    }
  // submit: function() {
  //   var params = {
  //     arrival_day: this.newArrival, 
  //     departure_day: this.newDeparture,
  //     max_wait_time: this.newMaxWait
  //   }

  //   axios.post('/api/trips', params).then(response => {
  //     this.newTrip = response.data; 
  //     this.tripCreated = true; 

  //     var interestParams = {
  //       trip_id: this.newTrip.id,
  //       attraction_id: inputRide.id,
  //       start_time: this.dayAtPark + "T" + this.startTime +"Z"
  //     }      
  //   })
  //   .then(function (interestParams) {
  //     axios.post('/api/interests/', interestParams).then(response => {
  //       this.errors = errors
  //     })
  //   })
  //     .catch(function (errors) {
  //       for (var i = 0; i < errors.length; i ++) {
  //         console.log(errors[i]);
  //       }
  //     });
  //   }
  }
};
</script>


