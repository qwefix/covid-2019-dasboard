export default function setupMap() {
    const mapId = document.querySelector('#map');
    const mapOptions = {
        center: [32.526955973553164, 23.047893209259385],
        zoom: 2
    }

    const map = new L.map(mapId, mapOptions);
    const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    map.addLayer(layer);

    const data = [
        {coordinates: [17.385044, 78.486671]},
        {coordinates: [53.881297252241644, 27.569905821286902]},
        {coordinates: [16.506174, 80.648015]}
    ];
    data.forEach(element => {
        const circleRadius = 200000/100;
        const circleOption = {
            color: 'red',
            fillOpacity: 100
        }

        const circle = new L.circle(element.coordinates, circleRadius, circleOption);
        circle.addTo(map);
    });
    
}