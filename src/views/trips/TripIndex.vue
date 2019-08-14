<template>
  <div class="trips-index">
    <div class="container">
      <h1>Your Trips</h1>
      <br />
      <div v-if="trips == ''">
        <h1>You have no trips currently, lets plan a trip!</h1>
        <br />
        <button
          class="btn btn-raised btn-lg btn-primary btn-outline-dark"
          v-on:click.prevent="route()"
        >Add Trips</button>
      </div>

      <div v-for="trip in trips" :key="trip.id">
        {{ trip.id }}
        <h4>
          <img src="../../../public/disney/oswald.png" style="width: auto; height: 50px;" />
          From {{ trip.arrival }} to {{ trip.departure }}
        </h4>
        <collapse :index="2" :animation-duration="500">
          <collapse-item title="Trip Itinerary" :name="index">
            <div>
              <br />
              <h1>Your Parks & Attractions</h1>
              <div class="container">
                <div class="card-columns">
                  <div class="col-md-6">
                    <div v-for="interest in interests" :key="interest.id">
                      <div v-if="interest.trip_id === trip.id">
                        <card
                          text-center
                          class="card p-2"
                          :raised="true"
                          :style="cardColoring(interest.park.name)"
                          header-classes="text-center"
                        >
                          <template slot="image">
                            <div class="card-image">
                              <slot name="image">
                                <img v-bind:src="interest.ride.image" />
                              </slot>
                            </div>
                          </template>

                          <template slot="header">
                            <br />
                            <h3>{{ interest.park.name }}</h3>
                          </template>

                          <template slot="header">
                            <div class="info">
                              <slot name="info">
                                <h5>
                                  <b>{{ interest.ride.name }}</b>
                                </h5>
                              </slot>
                            </div>
                          </template>

                          <div class="card-footer text-center">
                            <p>Updated at: {{ interest.last_update }}</p>
                            <div class="info">
                              <slot name="info">
                                <p>
                                  {{ interest.ride.anticipated_wait_time }} minutes |
                                  <span
                                    v-if="interest.ride.status === 'closed'"
                                    style="color: Red;"
                                  >
                                    <b>{{ interest.ride.status }}</b>
                                    <br />
                                  </span>

                                  <span
                                    v-if="interest.ride.status === 'operational'"
                                    style="color: Green;"
                                  >
                                    <b>{{ interest.ride.status }}</b>
                                    <br />
                                  </span>

                                  <span
                                    v-if="interest.ride.status === 'maintenance'"
                                    style="color: Orange;"
                                  >
                                    <b>{{ interest.ride.status }}</b>
                                    <br />
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
            <span>
              <br />
              <router-link v-bind:to="'/trips/edit/' + trip.id">
                <n-button type="warning" size="md" outline round>
                  <i class="fa fa-edit">Edit Trip</i>
                </n-button>
              </router-link>•
              <n-button type="danger" size="md" outline round v-on:click="deleteTrip(trip)">
                <i class="fa fa-trash">Delete Trip</i>
              </n-button>
            </span>
          </collapse-item>
        </collapse>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<style>
.container {
  text-align: center;
}
</style>

<script>
import axios from "axios";
import { Collapse, CollapseItem } from "../../components";
import { Card, Button } from "@/components";

export default {
  data() {
    return {
      show: false,
      trips: [],
      interests: [],
      tickets: [],
      attractions: [],
      index: 0,
      cardColor: ""
    };
  },
  components: {
    Collapse,
    CollapseItem,
    Card,
    [Button.name]: Button
  },
  created: function() {
    if (localStorage.getItem("jwt")) {
      axios.all([axios.get("/api/interests"), axios.get("/api/trips")]).then(
        axios.spread((first_response, second_response) => {
          this.interests = first_response.data;
          this.trips = second_response.data;
        })
      );
    } else {
      alert("Sign in to view your trips!");
      this.$router.push("/login");
    }
  },
  methods: {
    deleteTrip: function(trip) {
      axios.delete("/api/trips/" + trip.id).then(() => {
        this.$router.push("/trips");
        var index = this.trips.indexOf(trip);
        this.trips.splice(index, 1);
      });
    },
    cardColoring(park) {
      if (park === "Epcot") {
        return "width: 22rem; height: 40rem; background-color: #F4DB9F;";
      } else if (park === "Magic Kingdom") {
        return "width: 22rem; height: 40rem; background-color: #BBA2DA;";
      } else if (park === "Animal Kingdom") {
        return "width: 22rem; height: 40rem; background-color: #83CBAE;";
      } else {
        return "width: 22rem; height: 40rem; background-color: #D13A1D;";
      }
    },
    route() {
      this.$router.push("/trips/new");
    }
  }
};
</script>
