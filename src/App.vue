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
</style>
