<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template slot-scope="{ toggle, isToggled }">
      <router-link to="/">
        <img src="../../public/disney/mickey.png" style='height: 40px; width: 40px;'>
      </router-link>
    </template>

    <template slot="navbar-menu">
      <li class="nav-item">
        <drop-down
          tag="li"
          title="Parks & Attractions"
          icon="now-ui-icons design_app"
          class='nav-item'
          >
          <nav-link to="/parks">
            Parks
          </nav-link>
          <nav-link to='/attractions'>
            Attractions
          </nav-link>
          <nav-link to='/locations'>
            Map
          </nav-link>
        </drop-down>
      </li>

      <drop-down
        tag="li"
        title="Trip Info"
        icon="now-ui-icons design_app"
        class="nav-item"
      >
        <nav-link to="/trips">
          <i class="now-ui-icons business_chart-pie-36"></i> Your Trips
        </nav-link>
        <nav-link to="/trips/new">
          <i class="now-ui-icons business_chart-pie-36"></i> New Trip
        </nav-link>
      </drop-down>


      <drop-down
              tag="li"
              title="Info"
              icon="now-ui-icons design_image"
              class="nav-item"
      >
        <nav-link to="/info">
          <i class="now-ui-icons education_paper"></i> Your Profile
        </nav-link>
        <nav-link to="/login">
          <i class="now-ui-icons users_circle-08"></i> Login
        </nav-link>
        <nav-link to="/signup">
          <i class="now-ui-icons users_single-02"></i> Sign Up
        </nav-link>
        <nav-link to="/logout">
          <i class="now-ui-icons users_single-02"></i> Log Out
        </nav-link>
      </drop-down>     
      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="Log Out"
          data-placement="bottom"
          href="/logout"
          target="_blank"
        >
          Log Out
        </a>
      </li>
    </template>
  </navbar>
</template>

<script>
import { DropDown, NavbarToggleButton, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';
export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    DropDown,
    Navbar,
    NavbarToggleButton,
    NavLink,
    [Popover.name]: Popover
  }
};
</script>

<style scoped></style>
