import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
    apiKey: "AIzaSyAUvnhZpyVySdhooFAbkRqD1QO5qr7qkxE",
    authDomain: "word-goblin.firebaseapp.com",
    databaseURL: "https://word-goblin.firebaseio.com",
    projectId: "word-goblin",
    storageBucket: "word-goblin.appspot.com",
    messagingSenderId: "266263832018",
};

const devFirebase = firebase.initializeApp(config, "devFirebase");

const DB = devFirebase.database();
const Auth = devFirebase.auth();

// const providerFacebook = new firebase.auth.FacebookAuthProvider();
const providerGithub = new firebase.auth.GithubAuthProvider();
const providerGoogle = new firebase.auth.GoogleAuthProvider();
const providerTwitter = new firebase.auth.TwitterAuthProvider();

Auth.useDeviceLanguage();

module.exports = {
    Auth,
    authProviders: {
        // Facebook: providerFacebook,
        Github: providerGithub,
        Google: providerGoogle,
        Twitter: providerTwitter,
    },
    authProviderNames: [
        // "Facebook",
        "Github",
        "Google",
        "Twitter",
    ],
    DB,
};
