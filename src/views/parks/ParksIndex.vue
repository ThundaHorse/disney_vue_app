<template>
  <div class='parks-index'>
    <div class="container">
    <h1>Walt Disney World Parks</h1>
      <br>
    <div v-for="park in parks">
    <div v-bind:class="{
                        'epcot': park.name === 'Epcot',
                        'holly': park.name === 'Hollywood Studios',
                        'magic': park.name === 'Magic Kingdom',
                        'animal': park.name === 'Animal Kingdom'
                        }">
      <div class="jumbotron">
        <div class="container">
        <h1 class="display-4">{{ park.name }}</h1>
          <p class="lead">{{ park.formatted.opening}} to {{ park.formatted.closing }}</p>
        <hr class="my-3">
          <p>{{ park.address }}</p>
          <a v-on:click.prevent="parkPage(park)" class="btn btn-primary btn-lg" role="button">
            Learn more
          </a>
        </div>
      </div>
    </div>
      <br>
    </div>
    </div>
  </div>
</template>

<style>
  /* .jumbotron {
    background: url("https://ewscripps.brightspotcdn.com/dims4/default/3c6b07a/2147483647/strip/true/crop/600x338+0+1/resize/1280x720!/quality/90/?url=https%3A%2F%2Fewscripps.brightspotcdn.com%2F05%2Fd3%2F8bdb71a64d7f88d9ed004a312c93%2Fdisney-fireworks.jpg") no-repeat center center; 
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -o-background-size: 100% 100%;
    background-size: 100% 100%;
    opacity: 0.8;
  } */
/* 1078 x 257 */

  .magic .jumbotron {
    background: url("https://ewscripps.brightspotcdn.com/dims4/default/3c6b07a/2147483647/strip/true/crop/600x338+0+1/resize/1280x720!/quality/90/?url=https%3A%2F%2Fewscripps.brightspotcdn.com%2F05%2Fd3%2F8bdb71a64d7f88d9ed004a312c93%2Fdisney-fireworks.jpg") no-repeat center center; 
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -o-background-size: 100% 100%;
    background-size: 100% 100%;
    opacity: 0.8;
    color: white; 
    -webkit-text-stroke:0.9px; 
    -webkit-text-stroke-color: black;
  }
  .epcot .jumbotron {
    background: url("https://secure.cdn1.wdpromedia.com/resize/mwImage/1/640/360/75/dam/wdpro-assets/gallery/destinations/epcot/epcot-gallery-00.jpg?1537220971715") no-repeat center center; 
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -o-background-size: 100% 100%;
    background-size: 100% 100%;
    opacity: 0.8;
    color: white; 
    -webkit-text-stroke:0.9px; 
    -webkit-text-stroke-color: white;
  }
  .animal .jumbotron {
    background: url("https://cdn7.wdwnt.com/wp-content/uploads/2018/06/Tree-of-Life-the-Stars-990x556.jpg") no-repeat center center; 
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -o-background-size: 100% 100%;
    background-size: 100% 100%;
    opacity: 0.8;
    color: white; 
    -webkit-text-stroke:0.9px; 
    -webkit-text-stroke-color: white;
  }
  .holly .jumbotron {
    background: url("https://media2.fdncms.com/orlando/imager/u/original/2409999/1000w_disneyhwoodstudios.jpg") no-repeat center center; 
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -o-background-size: 100% 100%;
    background-size: 100% 100%;
    opacity: 0.8;
    color: white; 
    -webkit-text-stroke:0.9px; 
    -webkit-text-stroke-color: white;
  }
  img.index {
    border-radius: 5%;
    max-width: 55rem;
    float: right;
  }
  h2 {
    text-align: left;
    padding-left: 50px;
  }
  h3#parks {
    padding-left: 50px;
  }
  h3 {
    text-align: left; 
    padding-left: 100px;
  }
  li.index {
    text-align: left; 
    padding-left: 100px;
  }
</style>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      parks: []
    };
  },
  created: function() {
    axios.get('/api/parks').then(response => {
      this.parks = response.data;
    })
  },
  methods: {
    parkPage(input) {
      this.$router.push('/parks/' + input.id)
    }
  }
};
</script>