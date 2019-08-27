<template>
  <div class='trip-new'>
    <h1>New Trip</h1>
    <div class="container">
      <form v-on:submit.prevent="submit()">

        <div class="container">
          <div class="block">
            <!-- Dates -->
            <div class="row">
              <div class='col-6'>
                Arrival Day
              </div>
              <div class="col-6">
                Departure Day
              </div>
            </div>
            <div class="row">
              <fg-input class='col-6'>
                <el-date-picker v-model="newArrival"
                                popper-class="date-picker-primary"
                                type="date"
                                start-placeholder="Arrival">
                </el-date-picker>
              </fg-input>
              <fg-input class='col-6'>
                <el-date-picker v-model="newDeparture"
                                popper-class="date-picker-primary"
                                type="date"
                                start-placeholder="Departure">
                </el-date-picker>
              </fg-input>
            </div>
          </div>
        </div>

          <br>
        <h5 id='trip'>Maximum time willing to wait:</h5>

          <fg-input
              class='col-md-6 offset-3'
              placeholder="Total minutes"
              v-model="newMaxWait"
              clearable=true>
          </fg-input>

          <br>
          <div v-if="tripCreated === false" class='button-condition'>
            <button class='btn btn-round btn-primary' v-on:click.prevent="submit()">
              Set Dates and wait
            </button>
          </div>
          <div v-else="tripCreated === true">
            <p>Dates have been saved! Please select your attractions below!</p>
          </div>
          <br>
      <div v-if="tripCreated === true">
          <br>
        <!-- <h4 id='attractions'>Attractions: -->
        <!-- </h4> -->
          <button class='btn btn-lg btn-round btn-primary' v-on:click.prevent="seeYourTrip()">Done</button>
          <br>
          <h4>Attractions to Add:</h4>
            <div v-for='ride in attraction_list'>
              <img v-bind:src="ride.image" v-bind:alt="ride.name">
              <p>
                <div v-if="!ride.interested" class="to-add">
                  <button class='btn btn-round btn-sm btn-success' v-on:click.prevent="createInterest(ride)"> 
                    Click to add
                  </button>        
                </div>
                <div v-else class="to-remove">
                  <button class='btn btn-round btn-sm btn-danger' v-on:click.prevent="removeInterest(ride)">
                    Click to Remove 
                  </button>
                </div>
                  <span>
                  <!-- <div class="container"> -->
                    <h4 id='datetime'>
                      Date and Time for Attraction: 

                      <div class="container">
                        <fg-input>
                          <el-date-picker v-model="attrTime"
                                          popper-class="date-time-picker-primary"
                                          type="datetime"
                                          placeholder="Select date & Time">
                            </el-date-picker>
                        </fg-input>
                      </div>

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
        </div>
      </form>
    </div>
      <back-to-top text="Back to top"></back-to-top>
  </div>
</template>

<style>
.parks {
  background-color: black;
  opacity: 0.7;
}
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
import { DatePicker } from 'element-ui'
import { FormGroupInput } from '@/components'

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
      attrTime: '',

      newTrip: [], 
      addedInterest: []
    };
  },
  created: function() {
    if (localStorage.getItem('jwt')) {
      axios.all([
        this.getAttractions(),
        this.getParks()
      ])
      .then(axios.spread((first_response, second_response) => {
        this.attraction_list = first_response.data;
        this.park_list = second_response.data;
      }))
    } else {
      alert("Sign up or Log in to book a new trip!")
      this.$router.push('/login')
    }
  },
  components: {
    [DatePicker.name]: DatePicker,
    [FormGroupInput.name]: FormGroupInput
  },
  methods: {
    getAttractions() {
      return axios.get('/api/attractions')
    },
    getParks() {
      return axios.get('/api/parks')
    },
    seeYourTrip() {
      this.$router.push('/trips/');
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
      inputRide.interested = !inputRide.interested
      if (this.newTrip.id !== undefined) {
        var interestParams = {
            trip_id: this.newTrip.id,
            attraction_id: inputRide.id,
            start_time: this.attrTime
          }
        axios.post('/api/interests', interestParams).then(response => {
          this.addedInterest = response.data
          console.log(response.data.ride.name + " added successfully!");
        })
      } else {
        alert("Please create a trip first"); 
        setTimeout(createInterest(inputRide), 500);
      }
    },
    removeInterest(inputRide) {
      inputRide.interested = !inputRide.interested
      axios.delete('/api/interests/' + this.addedInterest.id).then(response => {
        console.log("Removed successfully!");
      })
    }
  }
};
</script>


