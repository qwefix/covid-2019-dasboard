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
        this.cases = [];
        this.deaths = [];
        this.recover = [];
        data.forEach((country) => {
            this.cases.push([country.Country, country.CountryCode, country.TotalConfirmed]);
            this.deaths.push([country.Country, country.CountryCode, country.TotalDeaths]);
            this.recover.push([country.Country, country.CountryCode,country.TotalRecovered]);
        });
        console.log(this.cases, this.deaths, this.recover)
        this.listParagraph.forEach(p => {
            switch(p.textContent) {
                case 'Cases':
                    this.setListInfo(this.cases, 0, 'cases');
                    break;
                case 'Deaths':
                    this.setListInfo(this.deaths, 1, 'rec');
                    break;
                case 'Recovered':
                    this.setListInfo(this.recover, 2, 'deaths');
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