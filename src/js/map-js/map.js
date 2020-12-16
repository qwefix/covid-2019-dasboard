import Marker from './marker';

export default function setupMap() {
    const mapId = document.querySelector('#map');
    const mapOptions = {
        center: [32.526955973553164, 23.047893209259385],
        minZoom: 1,
        zoom: 2
    }

    const map = new L.map(mapId, mapOptions);
    const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    map.addLayer(layer);
    
    const marker = new Marker(map);
    marker.loadMarker();
}