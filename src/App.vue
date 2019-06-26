<template>
  <div id="app">
    <div id="nav">
      <router-link to="/trips">Your Trips</router-link> |
      <router-link to='/'>All Parks</router-link> 
        <br>
      <router-link to='/edit-info'>Edit Personal Info</router-link>  
        <br>
      <router-link to="/login">Log In</router-link> |
      <router-link to='/logout'>Log Out</router-link> | 
      <router-link to='/signup'>Sign Up</router-link> 
        <br>
      <router-link to='/attractions'>Attractions</router-link> |
      <router-link to='/trips/new'>New Trip</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
