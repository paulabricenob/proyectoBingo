var numeros = 










// Obtener los datos de localStorage
let puntajes = JSON.parse(localStorage.getItem('bingoPuntajes')) || [];

// Función para renderizar los puntajes en la tabla
function renderizarPuntajes() {
    const tablaPuntajes = document.getElementById('tabla-puntajes');
    tablaPuntajes.innerHTML = ''; // Limpiar la tabla antes de renderizar

    // Recorrer los puntajes y agregarlos a la tabla
    puntajes.forEach((puntaje, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${puntaje.nombre}</td>
            <td>${puntaje.puntaje}</td>
        `;
        tablaPuntajes.appendChild(fila);
    });
}

// Renderizar los puntajes al cargar la página
renderizarPuntajes();


// Función para generar un número aleatorio entre min y max (incluidos)
function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para generar un cartón de bingo de tamaño NxN
function generarCartonBingo(N) {
    const numerosDisponibles = Array.from({ length: N * N }, (_, i) => i + 1);
    const carton = [];

    for (let i = 0; i < N; i++) {
        const fila = [];
        for (let j = 0; j < N; j++) {
            const numeroAleatorio = numerosDisponibles.splice(generarNumeroAleatorio(0, numerosDisponibles.length - 1), 1)[0];
            fila.push(numeroAleatorio);
        }
        carton.push(fila);
    }

    return carton;
}

// Función para mostrar los cartones de bingo en la página
function mostrarCartones() {
    const contenedorCartones = document.getElementById('cartones');
    contenedorCartones.innerHTML = ''; // Limpiar el contenedor antes de mostrar los cartones

    const cantidadJugadores = 4;
    const tamanoCarton = generarNumeroAleatorio(3, 5);

    for (let i = 1; i <= cantidadJugadores; i++) {
        const carton = generarCartonBingo(tamanoCarton);
        const cartonHTML = document.createElement('div');
        cartonHTML.innerHTML = `
            <h3>Cartón de Jugador ${i}</h3>
            <table border="1">
                ${carton.map(fila => `
                    <tr>
                        ${fila.map(numero => `<td>${numero}</td>`).join('')}
                    </tr>
                `).join('')}
            </table>
        `;
        contenedorCartones.appendChild(cartonHTML);
    }
}

// Mostrar los cartones al cargar la página
mostrarCartones();

