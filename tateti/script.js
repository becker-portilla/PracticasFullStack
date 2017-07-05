var jugador1 = "🦍"; //gorila
var jugador2 = "🦈"; //tiburon
var matriz = []
var jugadas = [];
var turno = 1;
var jugadasGanadoras = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [6, 7, 8],
    [2, 4, 6],
    [3, 4, 5]
];

$(document).ready(function () {
    CargarMatriz();
});

function CargarMatriz() {
    for (var i = 1; i <= 9; i++) {
        var cuadrado = document.getElementById("c" + i);
        cuadrado.onclick = Jugar;
        matriz.push(cuadrado);
    }

    for (var i = 0; i < 9; i++) {
        jugadas.push("");
    }
}

function Limpiar() {
    for (var i in matriz) {
        matriz[i].innerHTML = "";
    }

    turno = 1;
    jugadas = [];
    for (var i = 0; i < 9; i++) {
        jugadas.push("");
    }
}

function CambiarTurno() {
    if (turno == 1)
        turno = 2;
    else
        turno = 1;
}

function ObtenerFichaJugador() {
    return turno == 1 ? jugador1 : jugador2;
}

function GuardarJugada(id, ficha) {
    var numeroCuadrado = id.substring(1, 2);
    jugadas[numeroCuadrado - 1] = ficha;
}

function DeterminarGanador() {
    var hayGanador = false;
    var hayEmpate = false;
    var primerFigura = "";

    for (var i = 0; i < jugadasGanadoras.length; i++) {
        hayGanador = true;
        primerFigura = jugadas[jugadasGanadoras[i][0]];

        if (primerFigura != "") {
            for (var k = 1; k < 3; k++) {
                if (jugadas[jugadasGanadoras[i][k]] != primerFigura) {
                    hayGanador = false;
                }
            }
        } else {
            hayGanador = false;
        }

        if (hayGanador)
            break;
    }

    var todoJunto = jugadas.join("");

    hayEmpate = !hayGanador && todoJunto.length == 18;

    if (hayGanador || hayEmpate) {
        if (hayEmpate) {
            $('#tituloResultado').text("Hubo empate :(");
            $('#cuerpoResultado').text("Empate!!!");
        } else {
            $('#tituloResultado').text("Ha ganado");
            $('#cuerpoResultado').text(primerFigura);
        }

        $('#modalResultado').modal('show');
    }
}

function Jugar() {
    var fichaJugador = ObtenerFichaJugador();
    this.innerHTML = fichaJugador;
    GuardarJugada(this.id, fichaJugador);
    console.log(jugadas);
    DeterminarGanador();
    CambiarTurno();
}