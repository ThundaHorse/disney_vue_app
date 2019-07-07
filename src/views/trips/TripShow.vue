<template>
  <div class='trip-show'>
    <div class='container'>
      <h1>Trip {{ trip.id }}</h1>
        <br>
      <h3>Arrival Day: {{ trip.arrival }}</h3>
      <h3>Departure Day: {{ trip.departure }}</h3>
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
    axios.get('/api/trips/' + this.$route.params.id ).then(response => {
      this.trip = response.data;
    })
    axios.get('/api/interests').then(response => {
      this.interests = response.data;
    })
    axios.get('/api/tickets').then(response => {
      this.tickets = response.data;
    })
  },
  methods: {
    toggle: function() {
      this.show = !this.show;
    }
  }
};
</script>