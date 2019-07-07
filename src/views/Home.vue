<template>
  <div class='home'>
    <div class="container">
        <br>
          <br>
          <br>
          <br>
          <br>
        <br>
        <h1><b>Let's</b> Go To</h1>
        <br>
        <img src="../../public/disney/disneyLogo.png" style='width: 70%; height: 30%;'>
      <h2>
        <br>
        <br>
        <router-link v-bind:to="'/trips'"><button class="btn btn-info btn-round">Trips</button></router-link> • 
        <router-link v-bind:to="'/parks'"><button class="btn btn-primary btn-round">Parks</button></router-link> • 
        <router-link v-bind:to="'/attractions'"><button class="btn btn-success btn-round">Attractions</button></router-link> • 
        <router-link v-bind:to="'/info'"><button class="btn btn-warning btn-round">Profile</button></router-link>
      </h2>
    </div>
  </div>
</template>

<style>

</style>

<script>

export default {
  data: function() {
    return {

    };
  },
  created: function() {

  },
  methods: {

  }
};
</script>