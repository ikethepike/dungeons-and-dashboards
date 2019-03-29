import Vue from "vue";
import firebase from "firebase/app";
import "firebase/firestore";
import App from "./App.vue";
import IntroView from "./components/views/IntroView.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
};

// Make firebase exportable
export const Firebase = firebase.initializeApp(config);

const db = firebase.firestore();
Vue.prototype.$db = db;

new Vue({
  router,
  store,
  render: h => h(IntroView)
}).$mount("#app");
