import {initializeApp} from "firebase/app"



const firebaseConfig = {
  apiKey: "AIzaSyAt9-bUyJwpseJ4tWSx2DOK1Jdw_EqVU2E",
  authDomain: "pwa-lucas.firebaseapp.com",
  databaseURL: "https://pwa-lucas-default-rtdb.firebaseio.com",
  projectId: "pwa-lucas",
  storageBucket: "pwa-lucas.appspot.com",
  messagingSenderId: "575102804747",
  appId: "1:575102804747:web:a4f158ce24f59df241f80e",
  measurementId: "G-2QYS4VRWYS"
};

export const init = initializeApp(firebaseConfig);
