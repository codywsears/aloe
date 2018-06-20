import { envConfig } from '../config';
// Initialize Firebase
let config = {
    apiKey: envConfig.firebaseApiKey,
    authDomain: "resource-aloe.firebaseapp.com",
    databaseURL: "https://resource-aloe.firebaseio.com",
    projectId: "resource-aloe",
    storageBucket: "resource-aloe.appspot.com",
    messagingSenderId: "422837712810"
};
window.firebase.initializeApp(config);