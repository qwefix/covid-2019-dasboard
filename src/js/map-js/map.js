import Marker from './marker';

export default function setupMap() {
    const mapId = document.querySelector('#map');
    const mapOptions = {
        center: [32.526955973553164, 23.047893209259385],
        minZoom: 2,
        zoom: 3
    }

    const map = new L.map(mapId, mapOptions);
    const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    map.addLayer(layer);
    
    const marker = new Marker(map);
    const button = document.querySelectorAll('.map-button');
    
    button[0].addEventListener('click', () => {
        marker.loadOption(0);
    });
    button[1].addEventListener('click', () => {
        marker.loadOption(1);
    });
    button[2].addEventListener('click', () => {
        marker.loadOption(2);
    });
}