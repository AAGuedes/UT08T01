/* eslint-disable no-undef */
/**
 * 
 */
export var mymap = L.map('mapid').setView([28.456, -16.283], 15);

/**
 * 
 */
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9ieWwiLCJhIjoiY2trZnRnaWg2MHd4dDJwcXRxbDR5OG9kYyJ9.1FCnopCdf1dw0E3_UEl-KA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

/**
 * 
 */
export var marker = L.marker([28.456, -16.283]).addTo(mymap);
marker.bindPopup('Santa Cruz de Tenerife').openPopup();
