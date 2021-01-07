import Marker from './marker';

export default function setupMap() {
    const mapId = document.getElementById('map');
    const mapOptions = {
        center: [32.526955973553164, 23.047893209259385],
        minZoom: 2,
        zoom: 3
    }
    var L = window.L;
    const map = new L.map(mapId, mapOptions);
    const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    map.addLayer(layer);
    
    const marker = new Marker(map);
    const button = document.querySelectorAll('.map-button');
    button.forEach((item, i ) => {
        item.addEventListener('click', () => {
            marker.loadOption(i);
        });
    })

    document.addEventListener('click', (event) => {
        if (event.target.getAttribute('class') === "target-country") {
            let searchText = event.target.textContent;
            marker.zoomCountry(searchText);
        }
    });
}

