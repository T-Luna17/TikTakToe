const cells = document.querySelectorAll(".cell");
const button = document.getElementById("nuevoBtn");
const statusText = document.getElementById("status");
// Marcadores
const winEl = document.getElementById("win");
const lossEl = document.getElementById("loss");
const drawEl = document.getElementById("draw");

let juegoActivo = true; // Control del estado del juego
let winCount = localStorage.getItem("winCount") || 0;
let lossCount = localStorage.getItem("lossCount") || 0;
let drawCount = localStorage.getItem("drawCount") || 0;

// Combinaciones ganadoras
const combinacionesGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]             // Diagonales
];
winEl.textContent = winCount;
drawEl.textContent = drawCount;
lossEl.textContent = lossCount;

// Inicializa eventos
function movimientos() {
    const arregloGeneral = Array.from(cells);
    arregloGeneral.forEach((celda) => {
        celda.addEventListener("click", () => {
            if (celda.textContent === "" && juegoActivo) {
                celda.textContent = "X"; // Jugador
                if (verificarGanador("X")) {
                    statusText.textContent = "¡Ganaste Felicidades!";
                    winCount++;
                    localStorage.setItem("winCount", winCount);
                    winEl.textContent = winCount;
                    juegoActivo = false;
                } else if (esEmpate()) {
                    statusText.textContent = "¡Empate!";
                    drawCount++;
                    drawEl.textContent = drawCount;
                    juegoActivo = false;
                } else {
                    // Turno de la computadora
                    statusText.textContent = "Turno de la computadora...";
                    setTimeout(jugadaComputadora, 500); // Pequeña pausa para realismo
                }
            }
        });
    });
}

// Jugada aleatoria de la computadora
function jugadaComputadora() {
    const celdasVacias = Array.from(cells).filter(celda => celda.textContent === "");
    if (celdasVacias.length === 0 || !juegoActivo) return;

    const indiceAleatorio = Math.floor(Math.random() * celdasVacias.length);
    const celdaSeleccionada = celdasVacias[indiceAleatorio];

    celdaSeleccionada.textContent = "O";

    if (verificarGanador("O")) {
        statusText.textContent = "¡Perdiste Intenta de nuevo!";
        lossCount++;
        lossEl.textContent = lossCount;
        juegoActivo = false;
    } else if (esEmpate()) {
        statusText.textContent = "¡Empate!";
        drawCount++;
        drawEl.textContent = drawCount;
        juegoActivo = false;
    } else {
        statusText.textContent = "Tu turno (X)";
    }
}

// Verificar ganador
function verificarGanador(simbolo) {
    const arregloGeneral = Array.from(cells);
    return combinacionesGanadoras.some(combinacion => {
        const [a, b, c] = combinacion;
        return (
            arregloGeneral[a].textContent === simbolo &&
            arregloGeneral[b].textContent === simbolo &&
            arregloGeneral[c].textContent === simbolo
        );
    });
}

// Verificar empate
function esEmpate() {
    return Array.from(cells).every(celda => celda.textContent !== "");
}

// Reiniciar juego
function reiniciarJuego() {
    Array.from(cells).forEach(celda => celda.textContent = "");
    juegoActivo = true;
    statusText.textContent = "Tu turno (X)";
}

// Evento botón
button.addEventListener("click", reiniciarJuego);

movimientos();

