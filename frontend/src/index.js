import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB1v5p7NhrNxY8E9TERzh7VTmhjbt15ruM",
    authDomain: "walnote-dev.firebaseapp.com",
    databaseURL: "https://walnote-dev.firebaseio.com",
    projectId: "walnote-dev",
    storageBucket: "walnote-dev.appspot.com",
    messagingSenderId: "467712672241",
    appId: "1:467712672241:web:f7a084163ff07344e6c450"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
