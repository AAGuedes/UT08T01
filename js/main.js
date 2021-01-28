// Importaciones requeridas
import * as funcion from '/modules/functions.js';

// Controla el boton de nueva partida
var newGameButton = document.getElementsByClassName('newGame')[0];
newGameButton.addEventListener('click', () => {
    newGameButton.disabled = true;
    funcion.nuevaPartida();
})
