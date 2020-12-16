import urls from '../apiUrlConfig/apiUrl';
import Slider from '../views/slider';
const slider = new Slider('.slides-wrapper', '.slide', '.arrow-left', '.arrow-right', '.current', '.total');
slider.render();

class CovidList {
    constructor(slider, apiUrls) {
        this.slider = slider;
        this.listParagraph = document.querySelectorAll('#list p');
        this.tbody = document.querySelectorAll('.tbody');
        this.covid2019Api  = apiUrls.covid19api;
        this.slider.render();
        this.countriesInfo = [];
    }
    
    setupListData() {
        fetch(`${this.covid2019Api}/summary`)
            .then(res => {
                if (res.status !== 200) {
                    return Promise.reject(res);
                }
                return res.json();
            })
            .then((res) => {
               this.countriesInfo = res.Countries;
               this.getListInfo(this.countriesInfo);
            })
           
    };
    getListInfo(data) {
        this.cases = data.map(country => [country.Country, country.CountryCode, country.TotalConfirmed]);
        this.deaths = data.map(country => [country.Country, country.CountryCode, country.TotalDeaths]);
        this.recover = data.map(country => [country.Country, country.CountryCode,country.TotalRecovered]);
        this.listParagraph.forEach(p => {
            switch(p.textContent) {
                case 'Cases':
                    this.setListInfo(this.cases, 0, 'cases');
                    break;
                case 'Deaths':
                    this.setListInfo(this.deaths, 1, 'daeths');
                    break;
                case 'Recovered':
                    this.setListInfo(this.recover, 2, 'rec');
                    break;
            }
        });
    }
    setListInfo(array, n, selectorName) {
        this.tbody[n].innerHTML = '';
        array.sort((a,b) => b[2] - a[2]);
        array.forEach(item => {
        this.tbody[n].innerHTML += `
            <tr>
                <td><img src="https://www.countryflags.io/${item[1]}/flat/24.png"></td>
                <td class="target-country">${item[0]}</td>
                <td class="${selectorName}">${item[2]}</td>
            </tr>
            `
        });
    }
}

const list = new CovidList(slider, urls);
export default list;