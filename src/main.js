import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import axios from "axios";
import Datetime from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import BackToTop from "vue-backtotop";
import NowUiKit from "./plugins/now-ui-kit";
import { DatePicker } from "element-ui";

Vue.use(BackToTop);
Vue.use(Datetime);
Vue.use(NowUiKit);

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
