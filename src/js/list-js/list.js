import Slider from '../views/slider';
const slider = new Slider('.slides-wrapper', '.slide', '.arrow-left', '.arrow-right', '.current', '.total');
slider.render();

class CovidList {
    constructor(slider) {
        this.slider = slider;
        this.listParagraph = document.querySelectorAll('#list p');
        this.tbody = document.querySelectorAll('.tbody');
        this.slider.render();
        this.countriesInfo = [];
    }
    getListInfo(data) {
        this.cases = data.Countries.map(country => [country.Country, country.CountryCode, country.TotalConfirmed]);
        this.deaths = data.Countries.map(country => [country.Country, country.CountryCode, country.TotalDeaths]);
        this.recover = data.Countries.map(country => [country.Country, country.CountryCode, country.TotalRecovered]);
        this.listParagraph.forEach(p => {
            switch(p.textContent) {
                case 'Cases':
                    this.setListInfo(this.cases, 0, 'cases');
                    break;
                case 'Deaths':
                    this.setListInfo(this.deaths, 1, 'deaths');
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
                <td class="${selectorName}">${this.prettyNumber(item[2])}</td>
            </tr>
            `
        });
    }
    prettyNumber(number){
        let divider={
            num:1,
            str:'',
        }
        if(number>999999){
            divider={
                num:1000000,
                str:'M',
            }
        }else if(number>9999){
            divider={
                num:1000,
                str:'K'
            }
        }
        return Math.round(number/divider.num*10)/10 + divider.str
    }
}

const list = new CovidList(slider);
export default list;