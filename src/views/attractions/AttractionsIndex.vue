<template>
  <div class='attractions-index'>
    <div class="container">

      <h1>Attractions</h1>   
      <div>
        Search: <input v-model="searchFilter" style='border-radius: 10px;'>
      </div>
      <table class="table table-striped table-dark mt-2">
        <thead>
          <tr>
            <th v-on:click="setSortAttribute('id')" scope="col" style="color:white;">{{ isAscending('id') }} ID</th>
            <th v-on:click="setSortAttribute('name')" scope="col" style="color:white;">{{ isAscending('name') }} Name</th>
            <th v-on:click="setSortAttribute('anticipated_wait_time')" scope="col" style="color:white;">{{ isAscending('anticipated_wait_time') }} Wait Time</th>
            <th v-on:click="setSortAttribute('park')" scope="col" style="color:white;">{{ isAscending('park') }} Park</th>
            <th v-on:click="setSortAttribute('last_update')" scope="col" style="color:white;">{{ isAscending('last_update') }} Last Update</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(attraction, componentKey) in orderBy(filterBy(attractions, searchFilter, 'name'), sortAttribute, sortAscending)" v-bind:key="attraction.id" :key="componentKey">
            <th scope="row">
              <router-link class="attr-link" v-bind:to="'/attractions/' + attraction.id">
                {{ attraction.id }}
              </router-link>
            </th>
              <td> 
                <router-link class='attr-link' v-bind:to="'/attractions/' + attraction.id">
                  {{ attraction.name }} 
                </router-link>
              </td>
              <td> 
                <span v-bind:class="{
                    'less-than-60': attraction.anticipated_wait_time <= 60, 
                    'less-than-100': attraction.anticipated_wait_time > 60 && attraction.anticipated_wait_time <= 100,
                    'over-100': attraction.anticipated_wait_time > 100
                    }">
                    <div v-if="attraction.anticipated_wait_time <= 0 && attraction.status !== 'closed'">
                      {{ 'N/A' }}
                    </div>
                    <div>
                      {{ attraction.formatted_wait_time }} 
                    </div>
                </span>
              </td>
              <td>
                <span v-bind:class="{
                                    'epcot': park === 'Epcot',
                                    'magic-kingdom': park === 'Magic Kingdom',
                                    'animal-kingdom': park === 'Animal Kingdom',
                                    'hollywood-studios': park === 'Hollywood Studios'
                                    }">
                <router-link v-bind:to="'/parks/' + attraction.park_id">
                  {{ attraction.park }}
                </router-link>
              </span>

              <td>
                {{ attraction.last_update }}
              </td>
            </td>
          </tr>
        </tbody>
      </table>
      <back-to-top text="Back to top"></back-to-top>
    </div>
  </div>
</template>

<style>
  .operational-status, .less-than-60 {
    color: rgb(22, 165, 22);
  }
  .maintenance-status, .less-than-100 {
    color: yellow;
  }
  .closed-status, .over-100 {
    color: red;
  }
  .magic-kingdom {
    color: palevioletred;
  }
  .hollywood-studios {
    color: yellow;
  }
  .epcot {
    color: turquoise;
  }
  .animal-kingdom {
    color: greenyellow;
  }
  table {
    opacity: 0.8;
  }

</style>

<script>
import axios from 'axios';
import Vue2Filters from 'vue2-filters';
import ActionCable from 'actioncable';

export default {
  data: function() {
    return {
      attractions: [],
      searchFilter: "",
      sortAttribute: "",
      sortAscending: 1,
      park: '',  
      udpated: [],
      old: [],
      index: undefined,
      componentKey: 0
    };
  },
  created: function() {
    axios.get('/api/attractions').then(response => {
      this.attractions = response.data;
    })
    var cable = ActionCable.createConsumer('ws://localhost:3000/cable');

    cable.subscriptions.create("AttractionsChannel", {
      connected: () => {
        console.log("Connected");
      },
      disconnected: () => {
        console.log("Disconnected");
      },
      received: data => {
        console.log("Communicating");
        // for (var i = 0; i < this.attractions.length; i ++) {
          // if (this.attractions[i].id === data.id) {
        //     console.log(this.attractions.slice(0, i));
            // this.index = i;
            // this.old = this.attractions[i] 
            // this.attractions[i] = data;
          // }
        // }
        // this.attractions.shift(this.attractions[this.index])
        // this.attractions.unshift(data)
        // this.forceRenderer(this.attractions);
      }
    })
  },
  methods: {
    forceRenderer() {
      this.componentKey += 1 
    },
    setSortAttribute: function(inputAttribute) {
      if (this.sortAttribute === inputAttribute) {
        this.sortAscending *= -1;
      } else {
        this.sortAscending = 1; 
      }
      this.sortAttribute = inputAttribute;
    },
    isAscending: function(inputAttribute) {
      if (this.sortAttribute === inputAttribute) {
        return this.sortAscending === 1 ? "^" : "v"; 
      }
    }
  },
  mixins: [Vue2Filters.mixin]
};
</script>