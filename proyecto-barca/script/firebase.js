import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBfQ163tLMsNjFZsOClKENEwzw3Xl6BRNU",
  authDomain: "proyect-barca.firebaseapp.com",
  projectId: "proyect-barca",
  storageBucket: "proyect-barca.firebasestorage.app",
  messagingSenderId: "751645732122",
  appId: "1:751645732122:web:f5ff8c8b0f01bbaffa90a3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const registerUser = async (email, password, username, role) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    email,
    password,
    username,
    role,
  });

  return { email, username, role };
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    return null;
  }
};

export { auth, db };
