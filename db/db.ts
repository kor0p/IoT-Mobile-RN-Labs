import firebase from 'firebase'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyCChFTBn1Chjf_popgJhtCx6KAz5KvKZig',
    authDomain: 'iot-rn-7f324.firebaseapp.com',
    databaseURL: 'https://iot-rn-7f324.firebaseio.com',
    projectId: 'iot-rn-7f324',
    storageBucket: 'iot-rn-7f324.appspot.com',
    messagingSenderId: '7739297103',
    appId: '1:7739297103:web:be3c3f89ba79840f82093a',
    measurementId: 'G-5L30CSLP32'
}
// @ts-ignore
if (!window.firebaseApp) window.firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebase.auth()
