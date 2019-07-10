<template>
  <div class='parks-show'>
    <div v-bind:class="{
                        'epcot': park.name === 'Epcot',
                        'holly': park.name === 'Hollywood Studios',
                        'magic': park.name === 'Magic Kingdom',
                        'animal': park.name === 'Animal Kingdom'
                        }">
  
      <div class='page-header'>
        <br>
        <div class='text-center'>
          <h1 id="title">{{ park.name }}</h1>
          <h2>{{ park.address }}</h2>
          <h3><b>Open</b>: {{ park.opening }} | <b>Close</b>: {{ park.closing }}</h3>
          <h1>Attraction List</h1>
          <div class="container">
            <div class="scroll-box">
              <div v-for="attraction in park.attractions" :key='attraction.id'> 
                <h5><b>{{ attraction.name }}</b></h5>
                <h5>Status: {{ attraction.status }} • Estimated Wait: {{ attraction.anticipated_wait_time }}</h5>
                <br>
              </div>
            </div>
          </div>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .epcot {
    background: url("https://www.orlando-florida.net/wp-content/uploads/2018/06/FlowerAndGarden-Topiaries.jpg") no-repeat center center;
    background-size: cover;
    opacity: 0.9;
  }
  .magic {
    background: url("https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2016/12/hwcu476786978.jpg") no-repeat center center;
    background-size: cover;
    opacity: 0.9;
  }
  .holly {
    background: url("https://wallpapercave.com/wp/wp2209740.jpg") no-repeat center center;
    background-size: cover;
    opacity: 0.9;
  }
  .animal {
    background: url("https://www.trbimg.com/img-5906349e/turbine/la-1493578904-vbwu16daao-snap-image") no-repeat center center;
    background-size: cover;
    opacity: 0.9;
  }
  .text-center {
    padding-top: 250px;
    -webkit-text-stroke: 0.5px;
    -webkit-text-stroke-color: black;
  }
  .scroll-box {
    background-color: black;
    margin-left: 220px; 
    margin-right: 220px;
    border-radius: 5%;
    opacity: 0.6; 
    height: 400px;
    padding: 10px;
    overflow-y: scroll;
  }
  .scroll-box::-webkit-scrollbar { width: 0 !important }
</style>

<script>
import axios from 'axios'

export default {
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
   
  },
  methods: {

  }
};
</script>