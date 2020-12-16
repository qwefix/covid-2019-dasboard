import {coordinates} from './coordinates';

const data = [];
export default class Marker {
    constructor (map){
        this.map = map;
        this.getData();
        this.popup = document.querySelector('.popup');
        this.popupCountry = document.querySelector('.popup-country');
        this.popupContent = document.querySelector('.popup-content');
    }

    loadMarker() {
        data.forEach(element => {
            const circleRadius = element.TotalConfirmed / 20;
            const circleOption = {
                color: 'red',
                fillOpacity: 100
            }

            const circle = new L.circle([element.lat, element.lon], circleRadius, circleOption);
            
            circle.addTo(this.map);

            circle.addEventListener('mouseover', () => {
                //circle.bindPopup(`${element.Country}<br>Total confirmed: ${element.TotalConfirmed}`).openPopup();
                this.popup.classList.add('popup');
                this.popupCountry.innerHTML = element.Country;
                this.popupContent.innerHTML = `Total confirmed: ${element.TotalConfirmed}`;
            });

            circle.addEventListener('mouseout', () => {
                this.popup.classList.remove('popup');
            });

            circle.addEventListener('click', () => {
               alert(element.Country);
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
                console.log(data.length);
            })
            .then(() => {this.loadMarker();})
    }
}