import {coordinates} from './coordinates';

export default class Marker {
    constructor (map){
        this.map = map;
    }

    loadMarker() {
        coordinates.forEach(element => {
            const circleRadius = 200000/100;
            const circleOption = {
                color: 'red',
                fillOpacity: 100
            }
            console.log(element.lat);
            const circle = new L.circle([element.lat, element.lon], circleRadius, circleOption);
            circle.addTo(this.map);
        });
    }
}