import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore"



const firebaseConfig = {

  apiKey: "AIzaSyCpmRcyAhIlxKM6Papm0_y2c1ca7jrd4ck",

  authDomain: "movies-data-2ea67.firebaseapp.com",

  projectId: "movies-data-2ea67",

  storageBucket: "movies-data-2ea67.appspot.com",

  messagingSenderId: "39250087165",

  appId: "1:39250087165:web:7b7eec37503becc3720294"

};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);