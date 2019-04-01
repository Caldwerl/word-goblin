import firebase from "firebase";

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

const providerGoogle = new firebase.auth.GoogleAuthProvider();
const providerFacebook = new firebase.auth.FacebookAuthProvider();
const providerGithub = new firebase.auth.GithubAuthProvider();

Auth.useDeviceLanguage();

module.exports = {
    Auth,
    authProviders: {
        Google: providerGoogle,
        Facebook: providerFacebook,
        Github: providerGithub,
    },
    DB,
};

// const targetRef = DB.ref("restaurants/single-platform");

// function writeToFirebase(data) {
//     return targetRef.update(data);
// }

// function readFromFirebase() {
//     return targetRef.once("value", (snapshot) => {
//         if (snapshot.val()) {
//             fs.writeFileSync("./output/single-platform/restaurants-raw-data.json", JSON.stringify(snapshot.val()));
//         }
//     });
// }
