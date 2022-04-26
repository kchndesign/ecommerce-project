// import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/app';

const firebaseConfig = {
    apiKey: 'AIzaSyAh9jgMTEVvPcqlJpymy61JUjKiSXk2xow',
    authDomain: 'ecommerce-project-be400.firebaseapp.com',
    projectId: 'ecommerce-project-be400',
    storageBucket: 'ecommerce-project-be400.appspot.com',
    messagingSenderId: '408329194794',
    appId: '1:408329194794:web:b0643f483b05869ede2253',
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const firestore = firebase.firestore();
export { firebase };
export default firestore; // exporting a firebase.firestore.Firestore object
