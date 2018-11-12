import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import Admin from './Admin';

class test extends Component {

    componentDidMount() {
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        /*
        ui.start('#firebaseui-auth-container', {
            signInOptions: [
              firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            // Other config options...
          });*/

        var uiConfig = {
            callbacks: {
              signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
              },
              uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
              }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: <Admin />,
            signInOptions: [
              // Leave the lines as is for the providers you want to offer your users.

              //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
              //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
              //firebase.auth.GithubAuthProvider.PROVIDER_ID,
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
              //firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            // Privacy policy url.
            privacyPolicyUrl: '<your-privacy-policy-url>'
          };

            // The start method will wait until the DOM is loaded.
            ui.start('#firebaseui-auth-container', uiConfig);
    }
    render() {
        return (
            <div className="surveyContainer">
                <h1>Welcome to My Awesome App</h1>
                <div id="firebaseui-auth-container"></div>
                <div id="loader">Loading...</div>

                <h1>ASIANTUNTIJAN KOMPETENSSITYÖKALU-admin</h1>
                    <ul>
                    <li>Tänne siis admin asiaa</li>
                    <li>Tämä endpoint muuttaa "/admin", joka tarjoo login pagen</li>
                    <li>Login menee authUI setillä ehkä....?</li>
                    <li>SignIn authUI tänne tai fire.js filuun?</li>
                    <li>Sit joku formitus.......</li>
                    </ul>
            </div>
        )
    }
}

export default test;
