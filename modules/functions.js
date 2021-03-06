/* eslint-disable no-undef */
// Importaciones requeridas
import { gameData } from '../resources/questions.js';
import { mymap, marker } from '../modules/map.js';
import { drawLineChart, drawPieChart } from '../modules/chart.js';


// Declaración de variables
const paises = gameData.countries;
const numeroPaises = 5;
var intervaloContador;
export var estadisticasTarta = [];
export var estadisticasLinea = [];
var numeroAciertos;
var numeroPartida = 0;

// Rellena el array de estadisticas con todos los valores disponibles
for (let i = 0; i < paises.length; i++) {
    for (let j = 0; j < paises[i].cities.length; j++) {
        estadisticasTarta.push([paises[i].cities[j].name, 0 ])
    }
}


/**
 * Funcion que inicia una partida llamando a otras funciones
 */
export function nuevaPartida() {
    document.getElementsByClassName('timer')[0].textContent = 0;
    numeroAciertos = 0;
    mymap.panTo([28.456, -16.283], 15);
    marker.setLatLng([28.456, -16.283]);
    marker.bindPopup('Santa Cruz de Tenerife').openPopup();
    iniciarContador();
    limpiarEscenario();
    var paisesJuego = paisesPartida(paises);
    var ciudadesJuego = ciudadesPartida(paisesJuego);
    generarEscenario(ciudadesJuego, paisesJuego);
}


/**
 * Inicia el contador de tiempo y actualiza el contador
 */
export function iniciarContador() {
    intervaloContador = setInterval(() => {
        let contador = document.getElementsByClassName('timer')[0];
        let contadorActual = contador.textContent;
        contadorActual = +contadorActual + 1;
        contador.textContent = contadorActual;    
    }, 1000)
}


/**
 * Elimina el intervalo del contador
 * @param {*} timer Variable que contiene el intervalo
 */
export function pararContador(timer) {
    clearInterval(timer);
}


/**
 * Limpia el escenario en caso que hayan elementos
 */
export function limpiarEscenario() {
    if (document.getElementById('draggables').childElementCount != 0 && document.getElementById('droppables').childElementCount != 0) {
        let hijosDraggables = document.querySelectorAll('#draggables')[0];
        let hijosDroppables = document.querySelectorAll('#droppables')[0];
        while (hijosDraggables.lastElementChild != null) {
            hijosDroppables.lastElementChild.remove();
            hijosDraggables.lastElementChild.remove();
        }
    }
}


/**
 * Extrae y retorna paises aleatoriamente
 * @param {*} paises Objeto con todos los paises
 */
export function paisesPartida(paises) {
    let paisesJuego = [];
    while (paisesJuego.length < numeroPaises) {
        let position = Math.floor(Math.random() * (paises.length));
        if (!paisesJuego.includes(paises[position])) {
            paisesJuego.push(paises[position])
        }
    }
    return paisesJuego;
}


/**
 * Extrae y retorna ciudades aleatoriamente de los paises
 * @param {*} paisesJuego Objeto con los paises de la partida
 */
export function ciudadesPartida(paisesJuego) {
    var ciudadesJuego = []
    for (let i = 0; i < paisesJuego.length; i++) {
        let position = Math.floor(Math.random() * (paisesJuego[i].cities.length))
        ciudadesJuego.push({ 'code': paisesJuego[i].code, 'name': paisesJuego[i].cities[position].name})
    }
    return ciudadesJuego;
}


/**
 * Genera la ciudad recibida en el DOM
 * @param {*} ciudad Objeto con una ciudad
 */
function generarCiudad(ciudad) {

    // Clona el template dentro del contenedor draggables
    let cityTemplate = document.getElementsByClassName('city-template')[0];
    let templateClon = cityTemplate.content.cloneNode(true);
    document.getElementById('draggables').appendChild(templateClon);

    // Agrega información a los elementos clonados
    let elemento = document.getElementById('draggables').lastElementChild;
    elemento.setAttribute('class', 'draggable');
    elemento.setAttribute('data-city', ciudad.code)
    elemento.firstElementChild.innerHTML = ciudad.name;

    // Hace que el elemento sea draggable
    $(elemento).draggable({ revert: true })
}


/**
 * Genera el pais recibido en el DOM
 * @param {*} ciudad 
 * @param {*} pais 
 */
function generarPais(pais) {

    // Clona el template dentro de contenedor droppable
    let countryTemplate = document.getElementsByClassName('country-template')[0];
    let countryClon = countryTemplate.content.cloneNode(true);
    document.getElementById('droppables').appendChild(countryClon);

    //  Agrega información a los elementos clonados
    let elemento = document.getElementById('droppables').lastElementChild;
    elemento.setAttribute('class', 'country');
    elemento.lastElementChild.setAttribute('data-country', pais.code)
    elemento.lastElementChild.previousElementSibling.firstElementChild.innerHTML = pais.name
    elemento.lastElementChild.setAttribute('class', 'droppable')

    // Llama a la funcion que hace que el elemento sea droppable
    elementoDroppable(elemento.lastElementChild, pais.name);
}


/**
 * Genera los elementos de la partida en el DOM
 * @param {*} ciudadesJuego Objeto con las ciudades de la partida
 * @param {*} paisesJuego Objeto con los paises de la partida
 */
export function generarEscenario(ciudadesJuego, paisesJuego) {

    while (ciudadesJuego.length != 0) {
        var posicionCiudadRandom = Math.floor(Math.random() * ciudadesJuego.length);
        var posicionPaisRandom = Math.floor(Math.random() * paisesJuego.length);
        generarCiudad(ciudadesJuego[posicionCiudadRandom]);
        generarPais(paisesJuego[posicionPaisRandom]);
        ciudadesJuego.splice(posicionCiudadRandom, 1);
        paisesJuego.splice(posicionPaisRandom, 1);
    }

}


/**
 * Convierte y controla los elementos droppables
 * @param {*} elemento Elemento del DOM
 */
function elementoDroppable(elemento) {

    $(elemento).droppable({
        drop: function (a) {

            // Comprueba si los data- coinciden 
            if (a.target.dataset.country == a.toElement.parentNode.dataset.city) {

                // Extrae las coordenadas de la ciudad que acaba de coincidir
                var nombreCiudad = a.toElement.parentNode.firstElementChild.textContent;
                var ciudadesPais = paises.find(e => e.code == a.target.dataset.country).cities
                var coordenadas = ciudadesPais.find(e => e.name == nombreCiudad).location

                // Ajusta el draggable y droppable
                $(a.toElement.parentNode).draggable({ revert: false });
                $(a.toElement.parentNode).draggable("destroy");
                a.target.setAttribute('class', 'droppable success');

                // Ajusta la nueva posicion del mapa, el marcador y su popup
                // mymap.stop(); // No lo uso porque termina la animacion en curso bruscamente
                mymap.flyTo([coordenadas[0], coordenadas[1]], 15);
                marker.setLatLng([coordenadas[0], coordenadas[1]]);
                marker.bindPopup(nombreCiudad).openPopup();

                // Agrega valor a las estadisticas
                for (let i = 0; i < estadisticasTarta.length; i++) {
                    if (estadisticasTarta[i][0] == nombreCiudad) {
                        estadisticasTarta[i][1]++;
                        drawPieChart();

                        // Controla el numero de aciertos para terminar el juego
                        numeroAciertos++;
                        if (numeroAciertos == numeroPaises) {
                            pararContador(intervaloContador);

                            numeroPartida++;
                            let tiempo = document.getElementsByClassName('timer')[0].textContent;
                            estadisticasLinea.push([numeroPartida, +tiempo])
                            drawLineChart();

                            var newGameButton = document.getElementsByClassName('newGame')[0];
                            newGameButton.disabled = false;
                        }
                    }
                }
            }
        }
    });
}