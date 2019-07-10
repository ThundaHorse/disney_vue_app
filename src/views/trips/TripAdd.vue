<template>
  <div class='trip-add'>
    <div class='container'>
    <h1>Trip {{ trip.id }}</h1>
      <br>
    <router-link v-bind:to="'/trips/'"><button class='btn btn-round btn-raised btn-outline-light btn-lg btn-primary'>Done</button></router-link>
    <div class="card-columns">
      <div class="col-md-6">
        <div v-for='ride in attractions'>
          <card text-center class='card p-2' :raised='true' :style="cardColoring(ride.park)" header-classes='text-center' color='blue'>
             <template slot='header'>
            <!-- Add or Remove -->                
               <slot name="info">
                <div v-if="!ride.interested" class="to-add">
                    <br>
                    Enter Time you would like to attend at: 
                    <datetime type="time" v-model="startTime" use12-hour></datetime>
                      <br>
                  <button class='btn btn-round btn-raised btn-outline-light btn-sm btn-success' v-on:click.prevent="createInterest(ride)"> 
                    Click to add
                  </button>        
                </div>
                <div v-else class="to-remove">
                  <button class='btn btn-round btn-raised btn-outline-light btn-sm btn-danger' v-on:click.prevent="removeInterest(ride)">
                    Click to Remove 
                  </button>
                </div>

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
              </slot>
             </template>
            
              <template slot='header'>
                <!-- Ride Information -->                            
                <div class="info">
                  <slot name="info">
                    <h6 class="card-title">{{ ride.name }}</h6>
                    <p class="card-text">{{ ride.formatted_wait }}</p>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">Status: {{ ride.status }}</li>
                    </ul>
                  </slot>
                </div>
                
                <!-- Ride Image -->
                <div class="card-image">
                  <slot name="image">
                    <img v-bind:src="ride.image" class="card-img-top" v-bind:alt="ride.name">
                  </slot>
                </div>
                <!-- Ride Updated -->
                <div class="card-footer text-center">
                  <p>Updated at: {{ ride.updated_at }}</p>
                </div>

              </template>
              </card>
              </div>
            </div>
            <br>
            <back-to-top text="Back to top"></back-to-top>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from 'axios'
import { Card, FormGroupInput, Button } from '@/components';

export default {
  data: function() {
    return {
      trip: [],
      attractions: [],
      startTime: '',
      interested: false,
      addedInterest: []
    };
  },
  components: {
    [FormGroupInput.name]: FormGroupInput,
    [Button.name]: Button,
    Card
  },
  created: function() {
    axios.all([
      axios.get('/api/trips/' + this.$route.params.id),
      axios.get('/api/attractions')
    ])
    .then(axios.spread((first_response, second_response) => {
      this.trip = first_response.data;
      this.attractions = second_response.data;
    }))
  },
  methods: {
    cardColoring(park) {
      if (park === 'Epcot') {
        return 'width: 22rem; height: 40rem; background-color: #F4DB9F;'
      } else if (park === 'Magic Kingdom') {
        return 'width: 22rem; height: 40rem; background-color: #BBA2DA;'
      } else if (park === 'Animal Kingdom') {
        return 'width: 22rem; height: 40rem; background-color: #83CBAE;'
      } else {
        return 'width: 22rem; height: 40rem; background-color: #D13A1D;'
      }
    },
    createInterest(inputRide) {
      inputRide.interested = !inputRide.interested;
        var interestParams = {
          trip_id: this.trip.id,
          attraction_id: inputRide.id,
          start_time: this.startTime + "Z"
        }
      axios.post('/api/interests', interestParams).then(response => {
        this.addedInterest = response.data;
        this.startTime = '';
      })
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