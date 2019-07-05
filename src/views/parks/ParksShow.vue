<template>
  <div class='parks-show'>
    <div v-bind:class="{
                        'epcot': park.name === 'Epcot',
                        'holly': park.name === 'Hollywood Studios',
                        'magic': park.name === 'Magic Kingdom',
                        'animal': park.name === 'Animal Kingdom'
                        }">
    <parallax 
      class="page-header-image"
      style="background-image:url('img/disney/mickey.png')"
      >
    </parallax>
    
      <div class='page-header'>
        <br>
        <div class='text-center'>
          <h1 id="title">{{ park.name }}</h1>
          <h2>{{ park.address }}</h2>
          <h3><b>Open</b>: {{ park.formatted.opening }} | <b>Close</b>: {{ park.formatted.closing }}</h3>
        </div>
        <br>
      </div>
    </div>
      <google-map>
      </google-map>
    <div class="container">
            <br>
            <h1>Attraction List</h1>
          <p class='show' v-for="attraction in park.attractions"> 
            {{ attraction.name }} • Estimated wait: {{ attraction.anticipated_wait_time }}
          </p>
        <br>
    </div>
  </div>
</template>

    </div>
<style>
  .epcot {
    background: url("https://secure.cdn1.wdpromedia.com/resize/mwImage/1/640/360/75/dam/wdpro-assets/gallery/destinations/epcot/epcot-gallery-00.jpg?1537220971715") no-repeat center center;
    background-size: cover;
    opacity: 0.9;
  }
  .magic {
    background: url("https://ewscripps.brightspotcdn.com/dims4/default/3c6b07a/2147483647/strip/true/crop/600x338+0+1/resize/1280x720!/quality/90/?url=https%3A%2F%2Fewscripps.brightspotcdn.com%2F05%2Fd3%2F8bdb71a64d7f88d9ed004a312c93%2Fdisney-fireworks.jpg") no-repeat center center;
    background-size: cover;
    opacity: 0.9;
  }
  .holly {
    background: url("https://media2.fdncms.com/orlando/imager/u/original/2409999/1000w_disneyhwoodstudios.jpg") no-repeat center center;
    background-size: cover;
    opacity: 0.9;
  }
  .animal {
    background: url("https://cdn7.wdwnt.com/wp-content/uploads/2018/06/Tree-of-Life-the-Stars-990x556.jpg") no-repeat center center;
    background-size: cover;
    opacity: 0.9;
  }
  .text-center {
    padding-top: 250px;
    -webkit-text-stroke: 0.5px;
    -webkit-text-stroke-color: black;
  }
</style>

<script>
import axios from 'axios'
import { Parallax } from '@/components';
import ParkLocations from './../locations/ParkLocations.vue';

export default {
  computed: {
    parkName: function() {
      return this.park.name
    }, 
    address: function() {
      return this.park.address
    },
    opening: function() {
      return this.park.formatted.opening
    },
    closing: function() {
      return this.park.formatted.closing
    }
  },
  data: function() {
    return {
      park: [],
      locations: []
    };
  },
  created: function() {
    axios.get('/api/parks/' + this.$route.params.id).then(response => {
      this.park = response.data;
    })
    axios.get('/api/locations/' + this.$route.params.id).then(response => {
      this.locations = response.data;
    })
  },
  components: {
    Parallax,
    [ParkLocations.name]:ParkLocations
  },
  methods: {

  }
};
</script>