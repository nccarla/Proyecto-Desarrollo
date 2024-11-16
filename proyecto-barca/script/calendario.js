let nuevosPartidos = JSON.parse(localStorage.getItem("nuevosPartidos")) || [];

// Elementos del DOM
const calendarioBody = document.getElementById("calendario-body");
const btnAgregarPartido = document.getElementById("btnAgregarPartido");
const formModal = document.getElementById("formModal");
const closeModal = document.getElementById("closeModal");
const formPartido = document.getElementById("formPartido");

// Mostrar el modal para agregar un partido
btnAgregarPartido.addEventListener("click", () => {
    formModal.style.display = "block";
    formPartido.reset();
});

// Cerrar el modal
closeModal.addEventListener("click", () => {
    formModal.style.display = "none";
});

// Guardar un nuevo partido
formPartido.addEventListener("submit", (e) => {
    e.preventDefault();

    const partido = {
        fecha: document.getElementById("fecha").value,
        rival: document.getElementById("rival").value,
        competicion: document.getElementById("competicion").value,
        estadio: document.getElementById("estadio").value,
        hora: document.getElementById("hora").value,
    };

    nuevosPartidos.push(partido);
    localStorage.setItem("nuevosPartidos", JSON.stringify(nuevosPartidos));
    agregarPartidoAlDOM(partido);
    formModal.style.display = "none";
});

// Agregar un partido al DOM
function agregarPartidoAlDOM(partido) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${partido.fecha}</td>
        <td>${partido.rival}</td>
        <td>${partido.competicion}</td>
        <td>${partido.estadio}</td>
        <td>${partido.hora}</td>
    `;
    calendarioBody.appendChild(row);
}

// Cargar partidos iniciales y nuevos partidos
function cargarCalendario() {
    // Agregar nuevos partidos desde localStorage
    nuevosPartidos.forEach(agregarPartidoAlDOM);
}

// Cargar el calendario al iniciar
cargarCalendario();
