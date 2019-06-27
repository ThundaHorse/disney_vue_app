<template>
  <div class='attractions-index'>
    <div class="container">

      <h1>Attractions</h1>

        <div v-for="attraction in attractions">
          <!-- {{ attraction.anticipated_wait_time }} -->
          <p><router-link v-bind:to="'/attractions' + attraction.id">{{ attraction.name }} | </router-link>
            <span v-bind:class="{
                                  'operational-status': attraction.status === 'operational', 
                                  'maintenance-status':  attraction.status === 'maintenance',
                                  'closed-status': attraction.status === 'closed'
                                }">
            {{ attraction.status }}
            </span>
          </p>
          <p>
            Estimated Wait: 
          </p>
            <span v-bind:class="{
                                'less-than-60': attraction.anticipated_wait_time <= 60, 
                                'less-than-100': attraction.anticipated_wait_time > 60 && attraction.anticipated_wait_time <= 100,
                                'over-100': attraction.anticipated_wait_time > 100
                                }">
            {{ attraction.formatted_wait_time }} 
            </span>
        </div>


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

</style>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      attractions: []
    };
  },
  created: function() {
    axios.get('/api/attractions').then(response => {
      this.attractions = response.data;
    })
  },
  methods: {

  }
};
</script>