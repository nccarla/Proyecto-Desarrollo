import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB...",
  authDomain: "proyect-barca.firebaseapp.com",
  projectId: "proyect-barca",
  storageBucket: "proyect-barca.appspot.com",
  messagingSenderId: "751645732122",
  appId: "1:751645732122:web:f5ff8c8b0f01bbaffa90a3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export async function registerUser(username, email, password, role) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      role,
    });

    console.log("Usuario registrado:", user);
    return true;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return false;
  }
}

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return { ...userDoc.data(), uid: user.uid };
    } else {
      throw new Error("Usuario no encontrado en Firestore.");
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return null;
  }
}
