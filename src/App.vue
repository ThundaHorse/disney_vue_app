<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-light" style="background-color:#c4eaf7">
          <a class="navbar-brand" href="/">Home</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item active">
        <!-- Parks & Attractions  -->
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true">
                  Parks & Attractions
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="/parks">All Parks</a>
                  <a class="dropdown-item" href="/attractions">All Attractions</a>
                </div>
              </li>
        <!-- End Parks & Attractions -->

        <!-- Trip options -->
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true">
                  Trips
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="/trips">Your Trips</a>
                  <a class="dropdown-item" href="/trips/new">Create a new Trip</a>
                </div>
              </li>
        <!-- End Trip Options -->

        <!-- Account and sign up/out -->
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true">
                  Options
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="/login">Log In</a>
                  <a class="dropdown-item" href="/edit-info">Edit Info</a>
                  <a class="dropdown-item" href="/signup">Sign Up</a>
                  <a class="dropdown-item" href="/logout">Log Out</a>
                </div>
              </li>
        <!-- End Account and Sign out in -->
              </li>
            </ul>
          </div>
        </nav>
    </div>
    <router-view/>
  </div>
</template>

<style>
</style>
