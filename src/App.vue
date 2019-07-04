<template>
  <div id="app">
    <router-view name="header" />
      <div class="navbar"> <!-- Navbar -->
        <br>
          <br>
        <br>
      </div> 
      <div class="container">
      </div>
    <div class="wrapper">
      <router-view />
    </div>
    <router-view name="footer" />
  </div>
</template>

<style>
</style>


<script>
export default {
  
}
</script>
