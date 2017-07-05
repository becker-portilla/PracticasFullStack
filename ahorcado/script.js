var partes = [DibujarHorca, DibujarCabeza, DibujarCuello, DibujarCuerpo, DibujarBrazoIzquierdo, DibujarBrazoDerecho, DibujarPiernaIzquierda, DibujarPiernaDerecha];
var parteActual = 0;

function DibujarHorca(ctx) {
    ctx.moveTo(50, 50);
    ctx.lineTo(50, 300);
    ctx.stroke();

    ctx.moveTo(50, 50);
    ctx.lineTo(200, 50);
    ctx.stroke();

    ctx.moveTo(200, 50);
    ctx.lineTo(200, 100);
    ctx.stroke();
}

function DibujarCabeza(ctx) {
    ctx.beginPath();
    ctx.arc(200, 140, 40, 0, 2 * Math.PI);
    ctx.stroke();
}

function DibujarCuello(ctx) {
    ctx.moveTo(200, 180);
    ctx.lineTo(200, 200);
    ctx.stroke();
}

function DibujarCuerpo(ctx) {
    ctx.moveTo(200, 200);
    ctx.lineTo(200, 250);
    ctx.stroke();
}

function DibujarBrazoIzquierdo(ctx) {
    ctx.moveTo(200, 200);
    ctx.lineTo(150, 250);
    ctx.stroke();
}

function DibujarBrazoDerecho(ctx) {
    ctx.moveTo(200, 200);
    ctx.lineTo(250, 250);
    ctx.stroke();
}

function DibujarPiernaIzquierda(ctx) {
    ctx.moveTo(200, 250);
    ctx.lineTo(150, 300);
    ctx.stroke();
}

function DibujarPiernaDerecha(ctx) {
    ctx.moveTo(200, 250);
    ctx.lineTo(250, 300);
    ctx.stroke();
}

function DibujarSiguiente() {
    var c = document.getElementById("canvasAhorcado");
    var ctx = c.getContext("2d");
    ctx.lineWidth = 2;

    if (parteActual < partes.length) {
        partes[parteActual++](ctx);
    }
}


var palabraCorrecta = "";
var palabraCorrectaPista = "";
var letrasProbadas;

function AgregarLetraProbada() {
    var letrasUsadas = $('#letrasUsadas').text();
    var letraProbada = $('#letraProbar').val().toUpperCase();

    if (letrasUsadas.indexOf(letraProbada) < 0) {
        if (palabraCorrecta.indexOf(letraProbada) >= 0) {
            palabraCorrectaPista = ReemplazarCaracterOtraCadena(palabraCorrecta, palabraCorrectaPista, letraProbada);
            MostrarPalabraPista(palabraCorrectaPista);
        } else {
            DibujarSiguiente();
        }

        $('#letrasUsadas').text(letrasUsadas + ' ' + letraProbada);
        $('#letraProbar').val("");
    }

    if (palabraCorrecta == palabraCorrectaPista) {
        $('#tituloResultado').text("Ganaste :D");
        $('#cuerpoResultado').text("Felicitaciones!!");
        $('#modalResultado').modal('show');
    }

    if (parteActual >= partes.length) {
        $('#tituloResultado').text("Perdiste :(");
        $('#cuerpoResultado').text("La palabra correcta es: " + palabraCorrecta);
        $('#modalResultado').modal('show');
    }
}

function Limpiar() {
    var c = document.getElementById("canvasAhorcado");
    c.width = c.width;

    parteActual = 0;
    DibujarSiguiente();

    palabraCorrecta = ObtenerPalabra(4);
    palabraCorrectaPista = "";
    $('#letraProbar').val("");
    $('#letrasUsadas').text("");

    for (var key in palabraCorrecta) {
        palabraCorrectaPista += "_";
    }

    MostrarPalabraPista(palabraCorrectaPista);
}

function ReemplazarCaracterOtraCadena(cadenaOriginal, cadenaReemplazar, caracterReemplazo) {
    var result = "";

    for (var i in cadenaOriginal) {

        if (cadenaOriginal[i] == caracterReemplazo) {
            result += caracterReemplazo;
        } else {
            result += cadenaReemplazar[i];
        }
    }

    return result;
}

function MostrarPalabraPista(palabra) {

    var palabraConEspacios = palabra.split('').join(" ");
    $('#palabraCorrecta').text(palabraConEspacios);
}

var totalPalabras = [];

function readTextFile() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "./listado-general.txt", false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                totalPalabras = rawFile.responseText.split(rawFile.responseText[1]);
            }
        }
    }
    rawFile.send(null);
}

function ObtenerPalabra(cantidadMinimoCaracteres) {
    if (totalPalabras.length <= 0) {
        readTextFile();
    }

    var res = "";

    do {
        res = totalPalabras[Math.floor(Math.random() * totalPalabras.length)];
    }
    while (res.length < cantidadMinimoCaracteres);

    res = res.toLowerCase();
    res = res.replace(/á/gi, "a");
    res = res.replace(/é/gi, "e");
    res = res.replace(/í/gi, "i");
    res = res.replace(/ó/gi, "o");
    res = res.replace(/ú/gi, "u");

    return res.toUpperCase();
}

$(document).ready(function () {
    Limpiar();
});