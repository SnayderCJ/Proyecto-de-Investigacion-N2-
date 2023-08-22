/*
Proyecto de Investigacion (Grupal):
--> Integrantes
- Melanie Bermeo Gutierrez
- Veronica Pin Suarez
- Snayder Cedeño Jimenez
- Danilo Tamayo Angulo
*/

let jugador = [];
let pc = [];
let puntosJugador = 0;
let puntosPc = 0;
let mazo

window.onload = function () { // funcion para cuando la pagina se carga
    reiniciar(); // configura el juego para empezar de nuevo
    document.getElementById('empezar').addEventListener('click', reiniciar); // Si se da click en el boton empezar, se reinicia y comienza el juego
    document.getElementById('pedirCarta').addEventListener('click', pedirCarta); // Si se da click en el boton Pedir Carta, pedira una carta
    document.getElementById('finalizar').addEventListener('click', finalizarJuego); // si da click en finalizar, llama a la funcion de finalizar juego y se vera el resultado,
}

function iniciarMazo() {
    let valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let cartas = ['CorazonRojo', 'BrilloRojo', 'CorazonNegro', 'TrebolNegro'];
    mazo = [];

    for (let i = 0; i < cartas.length; i++) { // ['CorazonRojo', 'BrilloRojo', 'CorazonNegro', 'TrebolNegro'] 
        for (let j = 0; j < valores.length; j++) { // ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
            mazo.push(valores[j] + '-' + cartas[i]); // A - Corazon Rojo . . .
        }
    }
    //  console.log(mazo);
}

function barajar() {
    // Esta función baraja las cartas en el mazo utilizando el algoritmo de intercambio aleatorio. Genera un número aleatorio j y luego intercambia la carta en la posición i con la carta en la posición j.
    for (let i = 0; i < mazo.length; i++) { // 52 cartas
        let j = Math.floor(Math.random() * mazo.length); // En la variable j se guarda numeros aletorios enteros hasta 52
        let temp = mazo[i]; // Se crea una variable vacia para guardar las cartas en orden
        mazo[i] = mazo[j]; // las cartas aletorias de J se guardan en mazo[i], lo aletorio en forma desordenada
        mazo[j] = temp;

    }
    //  console.log(mazo);
}

function reiniciar() { // Se crea una funcion para empezar de nuevo
    iniciarMazo(); // Se llama a la funcion para contar con las 52 cartas
    barajar(); // Procede hacer el cambio automatico de cartas para que no siempre salga igual
    jugador = [];   // Se resetea los puntajes y cartas en mano de jugador y maquina para empezar de nuevo.
    pc = [];
    puntosJugador = 0;
    puntosPc = 0;
    document.getElementById('resultado').innerHTML = '';
    repartirCartas(); // reparte las primeras dos cartas a jugador y pc.
}

function repartirCartas() {
    for (let i = 0; i < 2; i++) {
        let cartaJugador = mazo[mazo.length - 1]; // obtiene la ultima carta del mazo
        let cartaPc = mazo[mazo.length - 2]; // obtiene la penultima carta

        puntosJugador += obtenerValor(cartaJugador); // suma los puntos del jugador 
        puntosPc += obtenerValor(cartaPc); // suma los puntos de pc

        jugador.push(cartaJugador); // se guardan las dos cartas en el arreglo
        pc.push(cartaPc); // se guardan las dos cartas en el arreglo
        mazo.length -= 2; // se resta la cantidad de cartas que se escogen anteriormente para reducir la longitud
    }
    mostrarCartas() // muestra las cartas repartidas
}

function mostrarCartas() {
    document.getElementById('cartasJugador').textContent = jugador.toString();
    document.getElementById('cartasPc').textContent = pc[0] + ', ???' // pc.toString()
    document.getElementById('puntosJugador').textContent = 'Puntos del Jugador: ' + puntosJugador;
    document.getElementById('puntosPc').textContent = 'Puntos de la Máquina: ' + puntosPc;
}

function pedirCarta() {
    if (puntosJugador >= 21) {
        return // no permite pedir si tienes 21 puntos o mas
    }
    let carta = mazo[mazo.length - 1]; // se agarra la ultima carta del mazo
    jugador.push(carta); // se guarda en el jugador
    puntosJugador += obtenerValor(carta); // se suman los puntos de la nueva carta

    mazo.length--; // se resta 1 al mazo.length para que no se vuelva a repetir y escoger el mismo valor

    mostrarCartas();

    if (puntosJugador > 21) {
        finalizarJuego();
    }
}

function obtenerValor(card) {
    let datos = card.split('-'); // 
    let valor = datos[0];

    if (isNaN(valor)) { // Si valor no es un numero
        if (valor === 'A') {
            return 1; // Si el valor de la carta es A contara como 1
        }
        return 10; // Si no cumple esa condicion automaticamente J, Q y K valdran 10
    }
    return parseInt(valor); // cualquier dato de la carta lo convierte en numero entero
}

function finalizarJuego() {
    while (puntosPc < 17) { // mientras los puntos de pc sean menor de 17 puede tomar cartas
        let carta = mazo[mazo.length - 1] // se agarra la ultima carta del mazo
        pc.push(carta); // guarda esa cartas en su mano
        puntosPc += obtenerValor(carta); // y suma los puntajes o cartas anteriores con la nueva carta

        mazo.length-- // se resta la longitud del mazo: ej 52 cartas es el lengt - 1 seria 51, por lo que no escogerian nuevamente otra carta repetida

    }

    let resultado = '';
    if (puntosJugador > 21 || (puntosPc <= 21 && puntosPc > puntosJugador)) { // si el jugador tiene mas de 21 y la maquina tiene menos o igual a 21, y tambien el puntaje es mayor al jugador, entonces pc gana
        resultado = '¡La Máquina gana!';
    } else if (puntosPc > 21 || (puntosJugador <= 21 && puntosJugador > puntosPc)) { // si el puntaje de pc es mayor a 21 o los puntos del jugador es menor o igual a 21 y los puntos del jugador son mayor a los de pc, entonces jugador gana
        resultado = '¡El Jugador gana!';
    } else { // si no se cumple con ninguna de las condiciones anteriores entonces es un empate 
        resultado = '¡Es un empate!';
    }

    document.getElementById('cartasPc').textContent = pc.toString();  // se convierten las cartas de la máquina en una cadena de texto
    document.getElementById('puntosPc').textContent = 'Puntos de la Máquina: ' + puntosPc;
    document.getElementById('resultado').textContent = resultado;
}