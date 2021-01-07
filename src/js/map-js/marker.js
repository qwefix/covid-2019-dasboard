import selectCountry from '../selectCountry';
import {coordinates} from './coordinates';

var L = window.L;
const data = [];
let markerGroup = null;
let circleArray = [];
const circleOption = {
    color: '#000',
    fillOpacity: 1,
    strokeOpacity: 100
}
export default class Marker {
    constructor (map){
        this.map = map;
        this.getData();
        this.popup = document.querySelector('.popup');
        this.popupCountry = document.querySelector('.popup-country');
        this.popupContent = document.querySelector('.popup-content');
    }

    loadMarker(mapContent={content: 'TotalConfirmed', coefficient: 20, text: 'Total confirmed'}) {
        this.removeMarker();

        data.forEach(element => {
            const circleRadius = element[mapContent.content] / mapContent.coefficient;

            const circle = new L.circle([element.lat, element.lon], circleRadius, circleOption);
            
            circleArray.push(circle);

            circle.addEventListener('mouseover', () => {
                this.popup.style.display = 'flex';
                this.popupCountry.innerHTML = element.Country;
                this.popupContent.innerHTML = `
                    <div>
                        <p>${mapContent.text}: ${element[mapContent.content]}</p>
                        ${mapContent.content !== 'TotalConfirmed' ? `<p>Percentage: ${(element[mapContent.content] / element.TotalConfirmed * 100).toFixed(2)}%</p>` : ''}
                    </div>`;
            });

            circle.addEventListener('mouseout', () => {
                this.popup.style.display = 'none';
            });

            circle.addEventListener('click', (e) => {
                selectCountry(element.Country);
                clickZoom(e);
            });
            const clickZoom = (e) => {
                this.map.setView(e.target.getLatLng(),5);
            }
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
            .catch(err => console.log(err))
    }

    loadOption(number) {
        let mapContent;
        switch (number) {
            case 0: { 
                circleOption.color = '#000'; 
                mapContent = {
                    content: 'TotalConfirmed',
                    coefficient: 20,
                    text: 'Total confirmed'
                }; 
            } break;
            case 1: {
                circleOption.color = 'green'; 
                mapContent = {
                    content: 'TotalRecovered',
                    coefficient: 15,
                    text: 'Total recovered'
                };  
            } break;
            case 2: {
                circleOption.color = 'red'; 
                mapContent = {
                    content: 'TotalDeaths',
                    coefficient: 0.5,
                    text: 'Total deaths'
                };  
            } break;
        }
        this.loadMarker(mapContent);
    }
    
    zoomCountry(country) {
        data.forEach((el) => {
            if (el.Country === country) {
                const mk = new L.marker([el.lat, el.lon]);
                this.map.setView(mk.getLatLng(),4);
            }
        });
    }
}