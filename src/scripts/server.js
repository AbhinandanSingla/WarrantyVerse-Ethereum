import {initializeApp} from "firebase/app";
import "firebase/storage"
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAMTP6-KSVmfzr8Rkn6jA4cTguyB0iQNTk",
    authDomain: "personaltestingbase.firebaseapp.com",
    databaseURL: "https://personaltestingbase.firebaseio.com",
    projectId: "personaltestingbase",
    storageBucket: "personaltestingbase.appspot.com",
    messagingSenderId: "804892899364",
    appId: "1:804892899364:web:8a0f02185e9d90e60b00b1",
    measurementId: "G-SSHQE2J0QQ"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

