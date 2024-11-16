import { auth, registerUser, loginUser } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Elementos del formulario
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");

// Evento para el registro de usuario
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const username = document.getElementById("registerUsername").value;
  const role = document.getElementById("registerRole").value;

  try {
    const userData = await registerUser(email, password, username, role);
    if (userData) {
      alert("Usuario registrado exitosamente");
      window.location.href = "login.html"; // Redirigir al login después del registro
    }
  } catch (error) {
    console.error("Error en el registro:", error);
    alert("Error en el registro: " + error.message);
  }
});

// Evento para el inicio de sesión
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

// Evento para cerrar sesión
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

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
