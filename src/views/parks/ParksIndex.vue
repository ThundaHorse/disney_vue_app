<template>
  <div class='parks-index'>
     <h1>Walt Disney World Parks</h1>
      <nav class="nav flex-column nav-pills ml-5">
        <tabs tabNavWrapperClasses="success" :type='buttonColor(this.colors)' vertical class="row" role='tablist'>
          <div class="container">
            <div v-for="park in parks">
              <div v-bind:class="{
                                  'epcot': park.name === 'Epcot',
                                  'holly': park.name === 'Hollywood Studios',
                                  'magic': park.name === 'Magic Kingdom',
                                  'animal': park.name === 'Animal Kingdom'
                                  }">
                <tab :label="park.name">   
                  <div class="jumbotron jumbotron-fluid shadow-lg mb-5 bg-white rounded">
                    <h1>{{ park.name }}</h1>
                      <h2 class="header">{{ park.opening}} to {{ park.closing }}</h2>
                      <h2 class='footer'>{{ park.address }}</h2>
                      <a v-on:click.prevent="parkPage(park)" class="btn btn-round btn-lg btn-info" role="button">
                        Learn more
                      </a>
                  </div>
                </tab>
              </div>
            </div>
              <tab label='Map of Parks' style='color:white;'>   
                <park-locations>
                </park-locations>
              </tab>
            <br>
          </div>
        </tabs>
      </nav>
    </div>
  </div>
</template>

<style scoped>
  .magic .jumbotron {
    background: url("https://ewscripps.brightspotcdn.com/dims4/default/3c6b07a/2147483647/strip/true/crop/600x338+0+1/resize/1280x720!/quality/90/?url=https%3A%2F%2Fewscripps.brightspotcdn.com%2F05%2Fd3%2F8bdb71a64d7f88d9ed004a312c93%2Fdisney-fireworks.jpg") no-repeat center center; 
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -o-background-size: 100% 100%;
    background-size: 100% 100%;
    opacity: 0.9;
    color: white; 
  }
  .epcot .jumbotron {    
    background: url("https://secure.cdn1.wdpromedia.com/resize/mwImage/1/640/360/75/dam/wdpro-assets/gallery/destinations/epcot/epcot-gallery-00.jpg?1537220971715") no-repeat center center; 
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -o-background-size: 100% 100%;
    background-size: 100% 100%;
    opacity: 0.9;
    color: white;         
  }
  .animal .jumbotron {
    background: url("https://cdn7.wdwnt.com/wp-content/uploads/2018/06/Tree-of-Life-the-Stars-990x556.jpg") no-repeat center center; 
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -o-background-size: 100% 100%;
    background-size: 100% 100%;
    opacity: 0.9;
    color: white; 
  }
  .holly .jumbotron {
    background: url("https://media2.fdncms.com/orlando/imager/u/original/2409999/1000w_disneyhwoodstudios.jpg") no-repeat center center; 
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -o-background-size: 100% 100%;
    background-size: 100% 100%;
    opacity: 0.9;
    color: white; 
  }
</style>

<script>
import axios from 'axios'
import ParkLocations from './../locations/ParkLocations.vue';
import Tab from './../../components/Tabs/Tab'
import Tabs from './../../components/Tabs/Tabs'

export default {
  components: {
    ParkLocations,
    Tabs,
    Tab
  },
  data: function() {
    return {
      parks: [],
      colors: ['info', 'default', 'primary', 'success']
    };
  },
  created: function() {
    axios.get('/api/parks').then(response => {
      this.parks = response.data;
    })
  },
  methods: {
    buttonColor(input) {
      return input[Math.floor(Math.random() * input.length)];
    },
    parkPage(input) {
      this.$router.push('/parks/' + input.id)
    }
  }
};
</script>