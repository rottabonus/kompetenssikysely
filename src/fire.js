import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyD4xO0rJiyRqzpTNfsElwA6gL85ctmwN4g",
    authDomain: "survey-87fc3.firebaseapp.com",
    databaseURL: "https://survey-87fc3.firebaseio.com",
    projectId: "survey-87fc3",
    storageBucket: "survey-87fc3.appspot.com",
    messagingSenderId: "805532426722"
  };
  var fire = firebase.initializeApp(config);    

export default fire;