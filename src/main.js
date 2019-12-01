import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "./plugins/firebase";
import axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.filter("toDateTime", function(value) {
  if (value) {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
});

let project;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch("setUser", user);
  }

  if (project) {
    return;
  }
  new Vue({
    firebase,
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});
