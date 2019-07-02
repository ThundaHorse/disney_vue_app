import { Parallax } from '../components';
/**
 * You can register global components here
 */

//  import { MainNavbar } from '../layout/MainNavbar.vue';

const globalComponents = {
  install(Vue) {
    Vue.component(Parallax.name, Parallax);
    // Vue.component(MainNavbar); 
  }
};

export default globalComponents;
