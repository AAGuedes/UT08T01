/* eslint-disable no-undef */
import { estadisticasTarta, estadisticasLinea } from '../modules/functions.js';

// Carga los charts
google.charts.load('current', { 'packages': ['corechart'] });

// Imprime los chart cuando termina la carga
google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawLineChart);

// Grafica de tarta
export function drawPieChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows(estadisticasTarta);

    // Set chart options
    var options = {
        'title': 'Ocurrencias de paises',
        'width': 400,
        'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('pieChart'));
    chart.draw(data, options);
}

// Grafica de lineas
export function drawLineChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Intentos');
    data.addColumn('number', 'Tiempos');

    data.addRows(estadisticasLinea);

    var options = {
        'title': 'Tiempos por Partida',
        'curveType': 'function',
        'width': 600,
        'height': 300,
        hAxis: {
            title: 'Intentos',
            textStyle: {
                fontSize: 12
            },
            titleTextStyle: {
                fontSize: 12,
                italic: true
            }
        },
        vAxis: {
            title: 'Tiempo',
            textStyle: {
                fontSize: 12
            },
            titleTextStyle: {
                fontSize: 12
            }
        },
        colors: ['#0000FF', '#0000FF']
    };

    var chart = new google.visualization.LineChart(document.getElementById('lineChart'));
    chart.draw(data, options);
}