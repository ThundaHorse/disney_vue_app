<template>
  <div class='trip-add'>
    <div class='container'>
    <h1>Trip {{ trip.id }}</h1>
      <br>
    <router-link v-bind:to="'/trips/' + this.trip.id"><button class='btn btn-raised btn-outline-light btn-lg btn-primary'>Done</button></router-link>
      <div class="card-deck">
        <div v-for='ride in attractions'>

          <div class="card" style='width: 21rem; height: 40rem;'>
            <img v-bind:src="ride.image" class="card-img-top" v-bind:alt="ride.name">

              <div class="card-body">
                <div v-if="!ride.interested" class="to-add">
                  <br>
                  Enter Time you would like to attend at: 
                    <datetime v-model="startTime" type="time"></datetime>
                  <br>
                  <button class='btn btn-raised btn-outline-light btn-sm btn-success' v-on:click.prevent="createInterest(ride)"> 
                    Click to add
                  </button>        
                </div>
                <div v-else class="to-remove">
                  <button class='btn btn-raised btn-outline-light btn-sm btn-danger' v-on:click.prevent="removeInterest(ride)">
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
                <h6 class="card-title">{{ ride.name }}</h6>
                  <p class="card-text">{{ ride.formatted_wait }}</p>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Status: {{ ride.status }}</li>
                  </ul>
                <br>
              </div>
            </div>
          </div>
        </div>
        <br>
      <br>
      <back-to-top text="Back to top"></back-to-top>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from 'axios'

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
  created: function() {
    axios.get('/api/trips/' + this.$route.params.id).then(response => {
      this.trip = response.data;
    })
    axios.get('/api/attractions').then(response => {
      this.attractions = response.data; 
    })
  },
  methods: {
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