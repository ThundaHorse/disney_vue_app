<template>
<div class="trips-index">
  <div class="container">
    <h1>Your Trips</h1>
      <br>
      <div v-if="trips == ''">
        <h1>You have no trips currently, lets plan a trip!</h1>
          <br>
        <button class='btn btn-raised btn-lg btn-primary btn-outline-dark' v-on:click.prevent='route()'>Add Trips</button>
      </div>


      <div v-for='trip in trips' :key='index'>
        <h4><img src='../../../public/disney/oswald.png' style='width: auto; height: 50px;'>    From {{ trip.arrival }} to {{ trip.departure }} 
              <router-link v-bind:to="'/trips/' + trip.id">
                <button class='btn btn-raised btn-sm btn-outline-light btn-primary btn-round'>
                  View This Trip
                </button>
              </router-link></h4>
        <collapse :active-index="2" :animation-duration="500">
          <collapse-item title="Trip Itinerary" :name="index">
            <div>
                <br>
              <h1>Your Parks & Attractions</h1>
                <br>
                <div v-for='int in interests'>
                  <div v-if="int.trip_id === trip.id">
                  <h4>{{ int.formatted.formatted_start_time }}</h4>
                    <p>{{ int.ride.name }} • 
                      <span v-if="int.park.name === 'Epcot'" style="color: blue">                
                        <b>{{ int.park.name }}</b>
                      </span>
                      <span v-if="int.park.name === 'Magic Kingdom'" style="color: red">
                        <b>{{ int.park.name }}</b>
                      </span>
                      <span v-if="int.park.name === 'Hollywood Studios'" style="color: orange">
                        <b>{{ int.park.name }}</b>
                      </span>
                      <span v-if="int.park.name === 'Animal Kingdom'" style="color: green">
                        <b>{{ int.park.name }}</b>
                      </span>
                      <br>
                    </p>
                  </div>
                </div>
              </div>
              <span>
                <br>
                <router-link v-bind:to="'/trips/edit/' + trip.id">
                  <n-button type="primary" size='lg' outline round>
                    <i class="fa fa-edit">Edit Trip</i>
                  </n-button>
                </router-link>
                •
                <n-button type='danger' size='lg' outline round v-on:click="deleteTrip(trip)"> 
                  <i class="fa fa-trash">Delete Trip</i>
                </n-button>
              </span>
          </collapse-item>
      </collapse>
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
import { Collapse, CollapseItem } from '../../components'

export default {
  data() {
    return {
      show: false,
      trips: [],
      interests: [],
      tickets: [],
      attractions: [],
      index: 0
    }
  },
  components: {
    Collapse,
    CollapseItem
  },
  created: function() {
    if (localStorage.getItem('jwt')) {
      axios.all([
        this.getInterests(),
        this.getTrips()
      ])
      .then(axios.spread((first_response, second_response) => {
            this.interests = first_response.data;
            this.trips = second_response.data;
          }))
    } else {
      alert("Sign in to view your trips!")
      this.$router.push('/login')
    }
  },
  methods: {
    getInterests() {
      return axios.get('/api/interests')
    },
    getTrips() {
      return axios.get('/api/trips')
    },
    deleteTrip: function(trip) {
      axios.delete('/api/trips/' + trip.id).then(response => {
        this.$router.push('/trips')
        var index = this.trips.indexOf(trip);
        this.trips.splice(index, 1);
      })
    },
    route() {
      this.$router.push('/trips/new')
    }
  }
};
</script>
