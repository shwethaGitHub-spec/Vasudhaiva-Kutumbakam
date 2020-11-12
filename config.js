import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyDsMeER8H_4RFCCA-UH2t-yYYZhEvmpslE",
    authDomain: "vasudevay-kutumbakam.firebaseapp.com",
    databaseURL: "https://vasudevay-kutumbakam.firebaseio.com",
    projectId: "vasudevay-kutumbakam",
    storageBucket: "vasudevay-kutumbakam.appspot.com",
    messagingSenderId: "479048580765",
    appId: "1:479048580765:web:f13c95785594fcf1755e74"
}
  
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();