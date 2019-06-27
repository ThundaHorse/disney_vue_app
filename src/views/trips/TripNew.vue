<template>
  <div class='trip-new'>
    <h1>New Trip</h1>
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h5 id='trip'>Arrival Day: <datetime v-model="newArrival" type="date" id='arrival'></datetime></h5>
        <h5 id='trip'>Departure Day: <datetime v-model="newDeparture" type="date" id='departure'></datetime></h5>
          <br>
        <h5 id='trip'>Maximum to Wait: <input v-model='newMaxWait' type='integer' id='max_wait' placeholder="total minutes i.e. 100"></h5>
          <br>
          <div v-if="tripCreated === false" class='button-condition'>
            <button class='btn btn-primary' v-on:click.prevent="submit()">
              Set Dates and wait
            </button>
          </div>
          <div v-else="tripCreated === true">
            <p>Dates have been saved! Please select your attractions below!</p>
          </div>
          <br>
        <h4 id='parks'>Parks: 
        </h4>
          <div v-for='park in park_list'>
            <p>
              <span v-if="park.name === 'Epcot'" style="color: blue">                
                <b>{{ park.name }}</b> | {{ park.formatted.opening }} - {{ park.formatted.closing }} | <b>{{ park.address }}</b>
              </span>
              <span v-if="park.name === 'Magic Kingdom'" style="color: pink">
                <b>{{ park.name }}</b> | {{ park.formatted.opening }} - {{ park.formatted.closing }} | <b>{{ park.address }}</b>
              </span>
              <span v-if="park.name === 'Hollywood Studios'" style="color: orange">
                <b>{{ park.name }}</b> | {{ park.formatted.opening }} - {{ park.formatted.closing }} | <b>{{ park.address }}</b>
              </span>
              <span v-if="park.name === 'Animal Kingdom'" style="color: lightgreen">
                <b>{{ park.name }}</b> | {{ park.formatted.opening }} - {{ park.formatted.closing }} | <b>{{ park.address }}</b>
              </span>
            </p>
          </div>
        <!-- <div v-if="tripCreated === true"> -->
          <br>
        <h4 id='attractions'>Attractions:
        </h4>
          <h4>Attractions to Add:</h4>
            <div v-for='ride in attraction_list'>
              <!-- {{ ride.interested }} -->
              {{ attraction_list }}
              <p>
                <div v-if="!ride.interested" class="to-add">
                  <button class='btn-sm btn-success' v-on:click.prevent="createInterest(ride)"> 
                    Click to add
                  </button>        
                </div>
                <div v-else="ride.interested" class="to-remove">
                  <button class='btn-sm btn-danger' v-on:click.prevent="removeInterest(ride)">
                    Click to Remove 
                  </button>
                </div>
                  <span>
                    <h4 id='datetime'>
                      Date and Time for Attraction: 
                      <datetime v-model="dayAtPark" type='datetime' class="dateTime">
                      </datetime>
                    </h4>
                      <p>{{ ride.name }}</p>
                  </span>
                  <br>
                <span v-bind:class="{
                                      'epcot-button': ride.park === 'Epcot',
                                      'magic_kingdom-button': ride.park === 'Magic Kingdom',
                                      'animal-kingdom-button': ride.park === 'Animal Kingdom',
                                      'hollywood-studios-button': ride.park === 'Hollywood Studios'
                                      }" >
                  <b>{{ ride.park }}</b>
                </span> 
                <br>
              </p>
            </div>
          <button v-on:click.prevent="seeYourTrip()">Done</button>
        <!-- </div> -->
      </form>
    </div>
  </div>
</template>

<style>
.epcot-button {
  color: blue;
}
.magic_kingdom-button {
  color: pink;
}
.animal-kingdom-button {
  color: lightgreen;
}
.hollywood-studios-button {
  color: orange;
}
.to-add p {
  color: lightgreen;
}
.to-remove p {
  color: red;
}
h#info {
  text-align: left;
}
</style>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      errors: [], 
      attraction_list: [],
      park_list: [],
      tripCreated: false,

      newArrival: '', 
      newDeparture: '', 
      newMaxWait: '',
      startTime: '',  
      dayAtPark: '',

      newTrip: [], 
      addedInterest: []
    };
  },
  created: function() {
    if (localStorage.getItem('jwt')) {
      axios.get('/api/attractions').then(response => {
        this.attraction_list = response.data; 
      })
      axios.get('/api/parks').then(response => {
        this.park_list = response.data;
      })
    } else {
      alert("Sign up or Log in to book a new trip!")
      this.$router.push('/login')
    }
  },
  methods: {
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
        // // axios.post('/api/interests', interestParams).then(response => {
          // this.addedInterest = response.data
          // // console.log(response.data.ride.name + " added successfully!");
        // })
      } else {
        alert("Please create a trip first"); 
        setTimeout(createInterest(inputRide), 500);
      }
    },
    removeInterest(inputRide) {
      inputRide.interested = !inputRide.interested;
      // // axios.delete('/api/interests/' + this.addedInterest.id).then(response => {
        // console.log("Removed successfully!");
      // })
    }
  }
};
</script>


