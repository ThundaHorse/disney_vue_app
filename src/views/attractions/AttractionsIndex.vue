<template>
  <div class='attractions-index'>
    <div class="container">

      <h1>Attractions</h1>   
      <div>
        Search by Thing: <input v-model="searchFilter" style='border-radius: 10px;'>
      </div>
      <table class="table table-striped table-dark mt-2">
        <thead>
          <tr>
            <th v-on:click="setSortAttribute('id')" scope="col" style="color:white;">{{ isAscending('id') }} ID</th>
            <th v-on:click="setSortAttribute('name')" scope="col" style="color:white;">{{ isAscending('name') }} Name</th>
            <th v-on:click="setSortAttribute('formatted_wait_time')" scope="col" style="color:white;">{{ isAscending('formatted_wait_time') }} Wait Time</th>
            <th v-on:click="setSortAttribute('park')" scope="col" style="color:white;">{{ isAscending('park') }} Park</th>
          </tr>
        </thead>

        <tbody is="transition-group" appear enter-active-class="animated lightSpeedIn" leave-active-class="animated lightSpeedOut">
          <tr v-for="attraction in orderBy(filterBy(attractions, searchFilter, 'name'), sortAttribute, sortAscending)" v-bind:key="attraction.id">
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
                    <div v-if="!attraction.anticipated_wait_time">
                      {{ '-' }}
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
  .operational-status {
    color: green;
    -webkit-text-stroke-width: 0.5px;
    -webkit-text-stroke-color: black;
  }
  .maintenance-status {
    color: orangered;
    -webkit-text-stroke-width: 0.5px;
    -webkit-text-stroke-color: black;    
  }
  .closed-status {
    color: red;
    -webkit-text-stroke-width: 0.4px;
    -webkit-text-stroke-color: black;
  }
  .less-than-60 {
    color: greenyellow;
    -webkit-text-stroke-width: 0.4px;
    -webkit-text-stroke-color: black;
  }
  .less-than-100 {
    color: orange;
    -webkit-text-stroke-width: 0.4px;
    -webkit-text-stroke-color: black;
  }
  .over-100 {
    color: red;
    -webkit-text-stroke-width: 0.4px;
    -webkit-text-stroke-color: black;
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

export default {
  data: function() {
    return {
      attractions: [],
      searchFilter: "",
      sortAttribute: "id",
      sortAscending: 1
    };
  },
  created: function() {
    axios.get('/api/attractions').then(response => {
      this.attractions = response.data;
    })
  },
  
  methods: {
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