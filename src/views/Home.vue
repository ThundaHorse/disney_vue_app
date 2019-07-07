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
        <router-link v-bind:to="'/trips'">
            <button class="btn btn-md btn-info btn-round"><img src='../../public/disney/castleicon.png' style='width: auto; height: 45px;'>Trips</button>
          </router-link> • 
          <router-link v-bind:to="'/parks'">
            <button class="btn btn-md btn-primary btn-round"><img src='../../public/disney/allparks.png' style='width: auto; height: 45px;'>Parks</button>
          </router-link> • 
          <router-link v-bind:to="'/attractions'">
            <button class="btn btn-md btn-success btn-round"><img src='../../public/disney/stitch.png' style='width: auto; height: 45px;'>Attractions</button>
          </router-link> • 
          <router-link v-bind:to="'/info'">
            <button class="btn btn-md btn-warning btn-round"><img src='../../public/disney/mickey.png' style='width: auto; height: 45px;'>Profile</button>
        </router-link>
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