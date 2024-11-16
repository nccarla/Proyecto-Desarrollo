const API_KEY = '3';
const LALIGA_ID = '4335';
const CHAMPIONS_ID = '4480';

async function obtenerPosiciones(leagueId) {
    const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/lookuptable.php?l=${leagueId}&s=2024-2025`);
    const data = await response.json();
    return data.table;
}

function actualizarTablaPosiciones(equipos, tablaId) {
    const tbody = document.querySelector(`#${tablaId} tbody`);
    tbody.innerHTML = '';

    equipos.forEach((equipo, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${equipo.strTeam}</td>
                <td>${equipo.intPlayed}</td>
                <td>${equipo.intWin}</td>
                <td>${equipo.intDraw}</td>
                <td>${equipo.intLoss}</td>
                <td>${equipo.intPoints}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function cargarTablas() {
    const posicionesLaLiga = await obtenerPosiciones(LALIGA_ID);
    if (posicionesLaLiga) {
        actualizarTablaPosiciones(posicionesLaLiga, 'tabla-laliga');
    }

    const posicionesChampions = await obtenerPosiciones(CHAMPIONS_ID);
    if (posicionesChampions) {
        actualizarTablaPosiciones(posicionesChampions, 'tabla-champions');
    }
}

document.addEventListener('DOMContentLoaded', cargarTablas);