import { initializeApp } from "firebase/app";
import {getAuth}  from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCKMy_IL-anF_9_mygPNa5OPf1PiPspCk0",
    authDomain: "whatsapp-e888f.firebaseapp.com",
    projectId: "whatsapp-e888f",
    storageBucket: "whatsapp-e888f.appspot.com",
    messagingSenderId: "383668292693",
    appId: "1:383668292693:web:67a010ca3cfed328dc98dc",
    measurementId: "G-TV0FVNM7HL"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)
