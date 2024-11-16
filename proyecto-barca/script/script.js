// Cargar los jugadores desde localStorage o inicializar con los jugadores del HTML
let plantilla = JSON.parse(localStorage.getItem("plantilla")) || [];

// Elementos del DOM
const btnAgregar = document.getElementById("btnAgregar");
const formModal = document.getElementById("formModal");
const closeModal = document.getElementById("closeModal");
const formJugador = document.getElementById("formJugador");
const modalTitle = document.getElementById("modalTitle");
const editIndex = document.getElementById("editIndex");

// Inicializar jugadores del HTML al localStorage (solo la primera vez)
if (!localStorage.getItem("plantilla")) {
    const jugadoresHTML = document.querySelectorAll("#info .caja");
    jugadoresHTML.forEach((jugadorDiv) => {
        const nombre = jugadorDiv.querySelector("h2").textContent.trim();
        const posicion = jugadorDiv.querySelector("h3").textContent.trim();
        const numero = jugadorDiv.querySelector(".numero").textContent.trim();
        const pais = jugadorDiv.querySelector("p:nth-of-type(1)").textContent.split(":")[1].trim();
        const nacimiento = jugadorDiv.querySelector("p:nth-of-type(2)").textContent.split(":")[1].trim();
        const altura = jugadorDiv.querySelector("p:nth-of-type(3)").textContent.split(":")[1].trim() || "-";
        const peso = jugadorDiv.querySelector("p:nth-of-type(4)").textContent.split(":")[1].trim() || "-";

        plantilla.push({ nombre, posicion, numero, pais, nacimiento, altura, peso });
    });
    localStorage.setItem("plantilla", JSON.stringify(plantilla));
}

// Mostrar el modal para agregar/editar jugadores
btnAgregar.addEventListener("click", () => {
    formModal.style.display = "block";
    modalTitle.textContent = "Agregar Jugador";
    formJugador.reset();
    editIndex.value = "";
});

// Cerrar el modal
closeModal.addEventListener("click", () => {
    formModal.style.display = "none";
});

// Guardar jugador
formJugador.addEventListener("submit", (e) => {
    e.preventDefault();

    const jugador = {
        nombre: document.getElementById("nombre").value,
        posicion: document.getElementById("posicion").value,
        numero: document.getElementById("numero").value,
        pais: document.getElementById("pais").value,
        nacimiento: document.getElementById("nacimiento").value,
        altura: document.getElementById("altura").value || "-",
        peso: document.getElementById("peso").value || "-",
    };

    if (editIndex.value) {
        // Editar jugador existente
        plantilla[editIndex.value] = jugador;
    } else {
        // Agregar nuevo jugador
        plantilla.push(jugador);
    }

    // Guardar la plantilla actualizada en localStorage
    localStorage.setItem("plantilla", JSON.stringify(plantilla));
    actualizarPlantilla();
    formModal.style.display = "none";
});

// Actualizar plantilla en el DOM
function actualizarPlantilla() {
    const plantillaContainer = document.getElementById("info");
    plantillaContainer.innerHTML = ""; // Limpiar el contenedor

    plantilla.forEach((jugador, index) => {
        const jugadorDiv = document.createElement("div");
        jugadorDiv.classList.add("caja");

        jugadorDiv.innerHTML = `
            <div class="texto">
                <h2>${jugador.nombre}</h2>
                <h3>${jugador.posicion}</h3>
                <span class="numero">${jugador.numero}</span>
                <p><strong>País:</strong> ${jugador.pais}</p>
                <p><strong>Nacimiento:</strong> ${jugador.nacimiento}</p>
                <p><strong>Altura:</strong> ${jugador.altura}</p>
                <p><strong>Peso:</strong> ${jugador.peso}</p>
                <button onclick="editarJugador(${index})" class="btn">Editar</button>
                <button onclick="eliminarJugador(${index})" class="btn">Eliminar</button>
            </div>
        `;

        plantillaContainer.appendChild(jugadorDiv);
    });
}

// Editar jugador
function editarJugador(index) {
    const jugador = plantilla[index];
    document.getElementById("nombre").value = jugador.nombre;
    document.getElementById("posicion").value = jugador.posicion;
    document.getElementById("numero").value = jugador.numero;
    document.getElementById("pais").value = jugador.pais;
    document.getElementById("nacimiento").value = jugador.nacimiento;
    document.getElementById("altura").value = jugador.altura;
    document.getElementById("peso").value = jugador.peso;

    editIndex.value = index;
    modalTitle.textContent = "Editar Jugador";
    formModal.style.display = "block";
}

// Eliminar jugador
function eliminarJugador(index) {
    plantilla.splice(index, 1);
    localStorage.setItem("plantilla", JSON.stringify(plantilla));
    actualizarPlantilla();
}

// Cargar los jugadores al iniciar la página
actualizarPlantilla();
