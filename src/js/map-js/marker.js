import {coordinates} from './coordinates';

const data = [];
let markerGroup = null;
let circleArray = [];
const circleOption = {
    color: 'red',
    fillOpacity: 1,
    strokeOpacity: 100
}
let radiusInfo, radiusСoefficient;
export default class Marker {
    constructor (map){
        this.map = map;
        this.getData();
        this.popup = document.querySelector('.popup');
        this.popupCountry = document.querySelector('.popup-country');
        this.popupContent = document.querySelector('.popup-content');
    }

    loadMarker(radius={content: 'TotalConfirmed', coefficient: 20}) {
        this.removeMarker();

        data.forEach(element => {
            const circleRadius = element[radius.content] / radius.coefficient;

            const circle = new L.circle([element.lat, element.lon], circleRadius, circleOption);
            
            //circle.addTo(this.map);
            
            circleArray.push(circle);
            //markerGroup = L.layerGroup(circle);

            circle.addEventListener('mouseover', () => {
                //circle.bindPopup(`${element.Country}<br>Total confirmed: ${element.TotalConfirmed}`).openPopup();
                this.popup.style.display = 'block';
                this.popupCountry.innerHTML = element.Country;
                this.popupContent.innerHTML = `Total confirmed: ${element.TotalConfirmed}`;
            });

            circle.addEventListener('mouseout', () => {
                this.popup.style.display = 'none';
            });

            circle.addEventListener('click', () => {
               alert(element.Country);
            });
        });
        markerGroup = L.layerGroup([...circleArray]);
        markerGroup.addTo(this.map);
        circleArray = [];
    }

    removeMarker() {
        if (markerGroup) {
            markerGroup.clearLayers();
        }
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
                data.push(...res.Countries);
            })
            .then(() => {
                data.forEach((el) => {
                    coordinates.forEach(elem => {
                        if (el.CountryCode === elem.country) {
                            el.lat = +elem.lat;
                            el.lon = +elem.lon;
                        }
                    });
                });
            })
            .then(() => {this.loadMarker();})
    }

    loadOption(number) {
        switch (number) {
            case 0: { 
                circleOption.color = 'red'; 
                radiusInfo = {
                    content: 'TotalConfirmed',
                    coefficient: 20
                }; 
            } break;
            case 1: {
                circleOption.color = 'rgb(31, 83, 255)'; 
                radiusInfo = {
                    content: 'TotalDeaths',
                    coefficient: 0.5
                };  
            } break;
            case 2: circleOption.color = 'black'; break;
        }
        this.loadMarker(radiusInfo);
    }
}