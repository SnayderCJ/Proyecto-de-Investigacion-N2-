
// const J = 10
// const Q = 10
// const K = 10
// const A = 1

// // const cartas = {
// let valores = [A, '2', '3', '4', '5', '6', '7', '8', '9', '10', J, Q, K]
// // let CorazonRojo = [A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K]
// // let Trebol = [A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K]
// // let CorazonNegro = [A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K]
// // }

// let cartas = ['Brillo', 'CorazonNegro', 'CorazonRojo', 'Trebol']
// let mazo = []
// let jugador = []
// let pc = []
// let PuntosPc = 0
// let PuntosJugador = 0

// class logicaJuego {

//     empezar() {
//         console.log(`Funciona :D`);
//         mazo = []
//         for (let carta of cartas) {
//             for (let valor of valores) {
//                 mazo.push({ valor, carta })
//             }
//         }
//         console.log(mazo);


//         jugador = []
//         pc = []


//         // let i = 0;
//         // while (i < 2) {
//         //     const cartaAleatoriaJugador = Math.floor(Math.random() * mazo.length);
//         //     jugador.push(mazo[cartaAleatoriaJugador]);
//         //     mazo.splice(cartaAleatoriaJugador, 1);

//         //     const cartaAleatoriaPc = Math.floor(Math.random() * mazo.length);
//         //     pc.push(mazo[cartaAleatoriaPc]);
//         //     mazo.splice(cartaAleatoriaPc, 1);

//         //     i++;
//         // }

//         // let i = 0
//         // while (i < 2) {
//         //     jugador.push(Math.floor(Math.random() * mazo.length))
//         //     pc.push(Math.floor(Math.random() * mazo.length))
//         //     i++
//         // }


//         console.log(`Jugador: ${jugador}`);
//         console.log(`Pc: ${pc}`);









//         // let i = 0
//         // while (i < 2) {
//         //     jugador.push(Math.floor(Math.random() * Brillo.length))
//         //     pc.push(Math.floor(Math.random() * Trebol.length))
//         //     i++
//         // }
//         document.getElementById('cartasJugador').textContent = `Cartas: ${jugador.map(carta => carta.valor).join(', ')}`;
//         document.getElementById('cartasPc').textContent = `Cartas: ${pc.map(carta => carta.valor).join(', ')}`;
//         document.getElementById('puntosJugador').textContent = `Puntos: ${calcularPuntos(jugador)}`;
//         document.getElementById('puntosPc').textContent = `Puntos: ${calcularPuntos(pc)}`;

//         // document.getElementById('cartasJugador').textContent = `Cartas: ${jugador}`
//         // document.getElementById('cartasPc').textContent = `Cartas: ${pc}`
//         // document.getElementById('puntosJugador').textContent = `Puntos: `
//         // document.getElementById('puntosPc').textContent = `Puntos:`
//         // console.log(jugador);
//         // console.log(pc);
//     }

//     pedirCarta() {
//     }

//     finalizar() { }
// }

// function calcularPuntos(mano) {
//     let puntos = 0;
//     let tieneAs = false;

//     for (const carta of mano) {
//         if (carta.valor === 'A') {
//             tieneAs = true;
//         }

//         if (typeof carta.valor === 'number') {
//             puntos += carta.valor;
//         } else {
//             puntos += 10;
//         }
//     }

//     if (tieneAs && puntos + 10 <= 21) {
//         puntos += 10;
//     }

//     return puntos;
// }

// const log = new logicaJuego()



let jugador = []
let pc = []
let puntosJugador = 0
let puntosPc = 0
let mazo

window.onload = function () {
    constructor()
    barajar()
    empezar()
}

function constructor() {
    let valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    let cartas = ['Brillo', 'CorazonNegro', 'CorazonRojo', 'Trebol']
    mazo = []

    for (let i = 0; i < cartas.length; i++) {
        for (let j = 0; j < valores.length; j++) {
            mazo.push(valores[j] + '-' + cartas[i])
        }
    }

    // console.log(mazo);
}

function barajar() {
    for (let i = 0; i < mazo.length; i++) {
        let j = Math.floor(Math.random() * mazo.length)
        let temp = mazo[i]
        mazo[i] = mazo[j]
        mazo[j] = temp
    }
    console.log(mazo);
}

function empezar() {
    puntosPc += obtenerValor()

    
}

function obtenerValor(card) {
    let datos = card.split("-")
    let valor = datos[0]

    if (isNaN(valor)) {
        if (valor == 'A'){
           return 1     // Si es A devuelve el valor de 1
        }
        return 10    // Si es J, Q, K devuelve el valor de 10
    }
    return parseInt(valor)
}