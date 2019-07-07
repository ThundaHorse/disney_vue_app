<template>
  <div class='trip-show'>
    <div class='container'>
      <h1>Trip {{ trip.id }}</h1>
        <br>
        <div class="container">
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
            <div class='col-6'>
              <h3>{{ trip.arrival }}</h3>
            </div>
            <div class='col-6'>
              <h3>{{ trip.departure }}</h3>
            </div>
          </div>
        </div>
      <!-- <button v-on:click.prevent="toggle()">Show Attractions</button> -->
        <br>
    <h3>Attractions & Parks</h3>
      <div class="container">
        <div class="card-columns">
          <div class="col-md-6">
            <div v-for='interest in interests'>
              <div v-if="interest.trip_id === trip.id">
                <card text-center class='card p-2' :raised='true' style="width: 22rem; height: 40rem;" header-classes='text-center' color='blue'>

                  <template slot='image'>
                    <div class="card-image">
                      <slot name="image">
                        <img v-bind:src="interest.ride.image">
                      </slot>
                    </div>
                  </template>

                  <template slot='header'>
                      <br>
                    <h3>{{ interest.park.name }}</h3>
                  </template>

                  <template slot='header'>
                      <div class="info">
                        <slot name="info">
                            <h5><b>{{ interest.ride.name }}</b></h5>
                        </slot>
                      </div>
                  </template>

                  <div class="card-footer text-center">
                    <p>Updated at: {{ interest.last_update }}</p>
                    <div class="info">
                        <slot name="info">
                          <p>{{ interest.ride.anticipated_wait_time }} minutes | 
                            <span v-if="interest.ride.status === 'closed'" style="color: Red;">
                                <b>{{ interest.ride.status }}</b>
                                <br>
                            </span>
                                
                            <span v-if="interest.ride.status === 'operational'" style="color: Green;">
                              <b>{{ interest.ride.status }}</b>
                                <br>
                            </span>

                            <span v-if="interest.ride.status === 'maintenance'" style="color: Orange;">
                              <b>{{ interest.ride.status }}</b>
                                <br>
                            </span>
                        </p>
                      </slot>
                    </div>
                  </div>
                </card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .container {
    text-align: center;
  }
</style>

<script>
import axios from 'axios'
import { Card, FormGroupInput, Button } from '@/components';
import { DatePicker } from 'element-ui'

export default {
  data: function() {
    return {
      trip: [],
      tickets: [],
      interests: [],
      show: false
    };
  },
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    [DatePicker.name]: DatePicker
  },
  created: function() {
    axios.all([
      this.getTickets(),
      this.getInterests(),
      this.getTrips()
    ])
    .then(axios.spread((first_response, second_response, third_response) => {
      this.tickets = first_response.data;
      this.interests = second_response.data;
      this.trip = third_response.data;
    }))
  },
  methods: {
    getTickets() {
      return axios.get('/api/tickets')
    },
    getInterests() {
      return axios.get('/api/interests')
    },
    getTrips() {
      return axios.get('/api/trips/' + this.$route.params.id )
    },
    toggle: function() {
      this.show = !this.show;
    }
  }
};
</script>