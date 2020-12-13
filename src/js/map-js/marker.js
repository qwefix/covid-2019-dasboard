export default class Marker {
    constructor (map){
        this.map = map;
    }

    loadMarker() {
        const data = [
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
            circle.addTo(this.map);
        });
    }
}