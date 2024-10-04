// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
	authDomain: "react-store-3a6915.firebaseapp.com",
	projectId: "react-store-3a6915",
	storageBucket: "react-store-3a6915.appspot.com",
	messagingSenderId: "961911909948",
	appId: "1:961911909948:web:c42443ae508a563ee39d39",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
