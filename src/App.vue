<template>
  <div id="app">
    <router-view name="header" />
    <div class="navbar">
      <!-- Navbar -->
      <br />
      <br />
      <br />
    </div>
    <div class="container"></div>
    <div class="wrapper">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
    <router-view name="footer" />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>


<script>
export default {};
</script>
