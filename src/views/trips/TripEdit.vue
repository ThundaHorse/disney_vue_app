<template>
  <div class='trip-edit'>
    <h1>Edit Trip</h1>
    <div class="container">
      <!-- Date/Time/Buttons -->
    <div class="row">
      <div class='col-6'>
        Arrival Day
      </div>
      <div class="col-6">
        Departure Day
      </div>
    </div>
      <br>
      <div class="row">
          <fg-input class='col-6'>
          <el-date-picker v-model="inputArrival"
                          popper-class="date-picker-info"
                          type="date"
                          :placeholder="trip.arrival">
            </el-date-picker>
        </fg-input>
          <fg-input class='col-6'>
            <el-date-picker v-model="inputDeparture"
                            popper-class="date-picker-info"
                            type="date"
                            :placeholder="trip.departure">
              </el-date-picker>
          </fg-input>
      </div>
          <br>
          <br>
        <label for='maxWaitTime'>Maximum Willing Wait: </label>
        <fg-input class='col-6 offset-3' v-model='inputWait' type='integer' v-bind:placeholder='trip.max_wait_time'></fg-input>
          <p>In total minutes</p>
          <br>
        <button class='btn btn-lg btn-round btn-success' v-on:click="submit()">Update</button> • <router-link v-bind:to="'/trips/add/' + trip.id"><button class='btn btn-round btn-raised btn-lg btn-outline-dark btn-info'>Add Attractions</button></router-link>
          <br>
          <br>
        <h2 style='text-align:center;'>Your Attractions</h2>
          <br>
<!-- Cards -->
    <!-- <form v-on:submit.prevent="submit()"> -->
      <div class="card-columns">
        <div class="col-md-6">
            <div v-for="interest in interests">

              <card text-center class='card p-3' :raised='true' :style="cardColoring(interest.park.name)" header-classes='text-center' color='blue'>
                <template slot='image'>
                  <div class="card-image">
                    <slot name="image">
                      <img v-bind:src="interest.ride.image">
                    </slot>
                  </div>
                </template>

                <template slot="default">
                  <div class="info">
                    <h4>{{ interest.ride.name }}</h4> 
                    <h4>{{ interest.ride.anticipated_wait_time }} min wait</h4>
                  </div>
                </template>

              <template slot='footer'>
                <slot name="footer">
                    <button class='btn btn-round btn-raised btn-outline-light btn-sm btn-danger' v-on:click.prevent="remove(interest)">
                      Remove Attraction
                    </button>
                </slot>
              </template>
            </card>

          </div>
        </div>
      </div>
    <!-- </form> -->
    </div>
  </div>
</template>

<style>
  img {
    height: 20rem;
    width: 30rem;
    border-radius: 15px;
  }
</style>

<script>
import axios from 'axios'
import { DatePicker } from 'element-ui'
import { Card, FormGroupInput, Button } from '@/components';
import TimeSelect from 'element-ui'

export default {
  data: function() {
    return {
      trip: [],
      interests: [], 
      inputArrival: "",
      inputDeparture: "",
      inputWait: "",
      show: false
    };
  },
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect
  },
  created: function() {
    if (localStorage.getItem('jwt')) {
      axios.all([
        axios.get('/api/trips/' + this.$route.params.id),
        axios.get('/api/interests')
      ])
      .then(axios.spread((first_response, second_response) => {
        this.trip = first_response.data;
        this.interests = second_response.data;
      }))
    } else {
      this.$router.push('/login')
    }
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
    toggle: function() {
      this.show = !this.show;
    },
    submit: function() {
      var params = {
        arrival_day: this.inputArrival, 
        departure_day: this.inputDeparture, 
        max_wait_time: this.inputWait
      }
      axios.patch('/api/trips/' + this.trip.id, params).then(response => {
        this.$router.push('/trips/' + this.trip.id);
      })
    },
    remove: function(int) {
      axios.delete("/api/interests/" + int.id).then(response => {
          var index = this.interests.indexOf(int);
          this.interests.splice(index, 1);
        });
    }
  }
};
</script>