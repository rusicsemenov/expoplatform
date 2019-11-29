import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "./plugins/firebase";

Vue.config.productionTip = false;

window.axios = require("axios");
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

firebase.auth().onAuthStateChanged(function(user) {
  console.log(user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
