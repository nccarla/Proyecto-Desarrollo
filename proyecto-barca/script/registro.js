import { auth, registerUser, loginUser } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");



loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userData = await loginUser(email, password);
    if (userData) {
      alert(`Bienvenido, ${userData.username || "Usuario"}`);
      localStorage.setItem("user", JSON.stringify(userData));
      // Redirigir según el rol
      window.location.href = userData.role === "admin" ? "admin_dashboard.html" : "user_dashboard.html";
    } else {
      alert("Credenciales incorrectas. Verifica tu correo y contraseña.");
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    alert("Error en el inicio de sesión: " + error.message);
  }
});


// Función para iniciar sesión
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userData = await loginUser(email, password);
    if (userData) {
      alert(`Bienvenido, ${userData.username || "Usuario"}`);
      localStorage.setItem("user", JSON.stringify(userData));
      window.location.href = userData.role === "admin" ? "admin_dashboard.html" : "user_dashboard.html";
    } else {
      alert("Credenciales incorrectas. Verifica tu correo y contraseña.");
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    alert("Error en el inicio de sesión: " + error.message);
  }
});


const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
    alert("Sesión cerrada exitosamente.");
    window.location.href = "registro.html";
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    alert("Error al cerrar sesión: " + error.message);
  }
};


const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
