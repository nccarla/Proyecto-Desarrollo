import { auth, registerUser, loginUser } from "./firebase.js";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;

  try {
    const success = await registerUser(firstName, lastName, email, password);
    if (success) {
      alert("Registro exitoso. Puedes iniciar sesión ahora.");
      registerForm.reset();
      const loginTab = document.getElementById("login-tab");
      loginTab.click();
    } else {
      alert("Hubo un error durante el registro. Intenta de nuevo.");
    }
  } catch (error) {
    console.error("Error en el registro:", error);
    alert("Error en el registro: " + error.message);
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userData = await loginUser(email, password);
    if (userData) {
      alert(`Bienvenido, ${userData.username || "Usuario"}`);
      localStorage.setItem("user", JSON.stringify(userData));
      window.location.href = "dashboard.html";
    } else {
      alert("Credenciales incorrectas. Verifica tu correo y contraseña.");
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    alert("Error en el inicio de sesión: " + error.message);
  }
});

window.addEventListener("load", () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    alert(`Bienvenido de nuevo, ${user.username || "Usuario"}`);
    window.location.href = "dashboard.html"; 
  }
});
