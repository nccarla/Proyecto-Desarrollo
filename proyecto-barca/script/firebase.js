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
    // Crear el usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar los detalles del usuario en Firestore
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      role, // Guardar el rol (user o admin)
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
    // Autenticar al usuario
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Recuperar detalles del usuario desde Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return { ...userDoc.data(), uid: user.uid }; // Retorna los datos del usuario, incluido el rol
    } else {
      throw new Error("Usuario no encontrado en Firestore.");
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return null;
  }
}

