<template>
  <div class='trip-new'>
    <h1>New Trip</h1>
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <div class="container">
          <div class="block">
            <span class="demonstration"><h5>Dates</h5></span>
              <!-- <fg-input> -->
              
              <div class="class">
                <fg-input>
                  <el-date-picker v-model="dates"
                                  popper-class="daterange-picker-primary"
                                  type="daterange"
                                  range-separator="To"
                                  start-placeholder="Select date"
                                  end-placeholder="Departure">
                  </el-date-picker>
                </fg-input>
              </div>
          </div>
        </div>
          <br>
        <h5 id='trip'>Maximum time willing to wait:</h5>

          

        <fg-input>
          <input v-model="newMaxWait" type="number">
        </fg-input>


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
             <span v-bind:class="{
                                      'epcot-button': park.name === 'Epcot',
                                      'magic_kingdom-button': park.name === 'Magic Kingdom',
                                      'animal-kingdom-button': park.name === 'Animal Kingdom',
                                      'hollywood-studios-button': park.name === 'Hollywood Studios'
                                      }" >
                <p>
                  {{ park.name }} <b>•</b> {{ park.address }} 
                    <br>
                  {{ park.opening }} to {{ park.closing }}
                </p>
              </span> 
          </div>
      <!-- <div v-if="tripCreated === true"> -->
          <br>
        <!-- <h4 id='attractions'>Attractions: -->
        <!-- </h4> -->
          <button v-on:click.prevent="seeYourTrip()">Done</button>
          <br>
          <h4>Attractions to Add:</h4>
            <div v-for='ride in attraction_list'>
              <img v-bind:src="ride.image" v-bind:alt="ride.name">
              <p>
                <div v-if="!ride.interested" class="to-add">
                  <button class='btn-sm btn-success' v-on:click.prevent="createInterest(ride)"> 
                    Click to add
                  </button>        
                </div>
                <div v-else class="to-remove">
                  <button class='btn-sm btn-danger' v-on:click.prevent="removeInterest(ride)">
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
        <!-- </div> -->
      </form>
    </div>
      <back-to-top text="Back to top"></back-to-top>
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
import { DatePicker } from 'element-ui'
import { FormGroupInput } from '@/components'

export default {
  data: function() {
    return {
      errors: [], 
      attraction_list: [],
      park_list: [],
      tripCreated: false,

      dates: '',
      newMaxWait: '',
      attrTime: '',

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
  components: {
    [DatePicker.name]: DatePicker,
    [FormGroupInput.name]: FormGroupInput
  },
  methods: {
    seeYourTrip() {
      this.$router.push('/trips/' + this.newTrip.id);
    },
    submit() {
      var params = {
        arrival_day: this.dates[0], 
        departure_day: this.dates[1],
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


