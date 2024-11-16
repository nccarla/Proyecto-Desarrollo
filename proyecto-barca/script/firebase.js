// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, addDoc, setDoc, getDoc, getDocs, collection, query, where} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfQ163tLMsNjFZsOClKENEwzw3Xl6BRNU",
  authDomain: "proyect-barca.firebaseapp.com",
  projectId: "proyect-barca",
  storageBucket: "proyect-barca.firebasestorage.app",
  messagingSenderId: "751645732122",
  appId: "1:751645732122:web:f5ff8c8b0f01bbaffa90a3"
};

const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
const db=getFirestore(app);

export async function registerUser(username, email, password){
  try{
      const userCredencial=await createUserWithEmailAndPassword(auth,email,password);
      const user=userCredencial.user;
      await setDoc(doc(db,"users",user.uid),{
        username,
        email,
        role:"user"
      })
      console.log('Usuario registrado: ', userCredencial.user);
      return true;
    }
  catch(error){
      console.log('Error:' , error.message);
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
      throw new Error("Usuario no encontrado.");
    }
  } catch (error) {
    console.error("Error con el inicio de sesion:", error);
    return null;
  }
}


export const getUsers = async () => {
  const result = await getDocs(collection(db, 'users'));
  return result.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export const getUser = async (id) => {
  const result = await getDoc(doc(db, 'users', id));
  return result.exists() ? { id: result.id, ...result.data() } : null;
};

export async function getContactsByUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      unsubscribe();

      if (!user) {
        console.log("Usuario no autenticado");
        resolve([]);  
        return;
      }

      const contactsRef = collection(db, "contacts");
      const q = query(contactsRef, where("userId", "==", user.uid));

      try {
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          console.log("No se encontraron contactos.");
          resolve([]);  
          return;
        }

        const contacts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        resolve(contacts);  
      } catch (error) {
        console.error("Error:", error);
        resolve([]);  
      }
    });
  });

}

export function saveContactToFirebase(contact) {
  return db.collection("contacts").add(contact)
    .then(() => {
      alert('Contacto guardado');
    })
    .catch((error) => {
      console.error("Error: ", error);
      alert('Hubo un problema guardando el contacto. Intente de nuevo.');
    });
}

export async function saveContact(contact) {
try {
  await addDoc(collection(db, "contacts"), contact);
  alert('Contacto guardado');
} catch (error) {
  console.error("Error: ", error);
  alert('Hubo un problema guardando el contacto. Intente de nuevo.');
}
}

export function getCurrentUserId() {
const user = auth.currentUser;
return user ? user.uid : null;
}

