import {coordinates} from './coordinates';

export default class Marker {
    constructor (map){
        this.map = map;
        this.data = [];
        this.getData();
    }

    loadMarker() {
        coordinates.forEach(element => {
            const circleRadius = 200000/100;
            const circleOption = {
                color: 'red',
                fillOpacity: 100
            }

            const circle = new L.circle([element.lat, element.lon], circleRadius, circleOption);
            
            circle.addTo(this.map);

            circle.addEventListener('mouseover', () => {
                circle.bindPopup(`${element.name}`).openPopup();
            });

            circle.addEventListener('click', () => {
               
            });
        });
    }

    getData() {
        this.promice = fetch ('https://api.covid19api.com/summary')
            .then(res => {
                if (res.status !== 200) {
                    return Promise.reject(res);
                }
                return res.json();
            })
            .then(res => {
                this.data.push(...res.Countries);
                console.log( this.data);
                console.log(typeof this.data);
            })
            .then(() => {
                this.data.forEach((el) => {
                    if (el.CountryCode === "AF") {
                        el["lat"] = 11;
                    }
                });
            })
        
    }
}