import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore,collection, addDoc ,onSnapshot, serverTimestamp ,orderBy,query} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyBigThPGAZKsSuoOqxyO0PKF36Hiw_Ev9c",
  authDomain: "chat-app-73168.firebaseapp.com",
  projectId: "chat-app-73168",
  storageBucket: "chat-app-73168.firebasestorage.app",
  messagingSenderId: "592937856890",
  appId: "1:592937856890:web:a754f7bc0a6d6c876970c3",
  measurementId: "G-TS7ZEL0RLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db,collection, addDoc,onSnapshot,serverTimestamp ,orderBy,query}