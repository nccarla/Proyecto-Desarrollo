// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfQ163tLMsNjFZsOClKENEwzw3Xl6BRNU",
  authDomain: "proyect-barca.firebaseapp.com",
  projectId: "proyect-barca",
  storageBucket: "proyect-barca.firebasestorage.app",
  messagingSenderId: "751645732122",
  appId: "1:751645732122:web:f5ff8c8b0f01bbaffa90a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};

export async function registerUser(username, email, password, rol) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar información en la colección `users`
    await setDoc(doc(db, "users", user.uid), {
      email,
      username,
      rol, // Guardar el rol
      password, // Solo guarda contraseñas en Firestore para pruebas locales
    });

    console.log("Usuario registrado:", user);
    return true;
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    return false;
  }
}


export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Obtener datos del usuario desde Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return { ...userDoc.data(), uid: user.uid };
    } else {
      throw new Error("Usuario no encontrado en Firestore.");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    return null;
  }
}

