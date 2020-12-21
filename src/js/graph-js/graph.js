import Chart from 'chart.js';
import urls from '../apiUrlConfig/apiUrl';
import defImport from './defImport';
import GraphSlider from './slider';

class Graph {
    constructor(){
        this.slider = new GraphSlider(this.renderBySlider,this)
        this.canvas = document.querySelector('#graph canvas');
        this.lastCountry = 'Global',
        this.countries = {};
        
        this.defaultInput = defImport;
        this.input = {};
        Object.assign(this.input, this.defaultInput);

        this.chart = new Chart(this.canvas, this.input);
        this.setup();
    }

    setup(){
        this.promice = fetch(urls.graphGlobal)
            .then(res => {
                if (res.status !== 200) {
                    alert('Упс! Cервер не работает;-(...Попробуйте позже...');
                    return Promise.reject(res);
                }
                return res.json();
            })
            .then((res) => {
                this.worldData ={ 
                    labels: Object.entries(res.cases).map(a=>a[0]),
                    cases: Object.entries(res.cases).map(a=>a[1]),
                    deaths: Object.entries(res.deaths).map(a=>a[1]),
                    recovered: Object.entries(res.recovered).map(a=>a[1]),
                }
                this.renderGlobal();
            })
    }

    renderGlobal(){
        this.lastCountry = 'global';
        const typeOfGraphStr = this.slider.val;
        let colors = {
            cases: 'black',
            deaths: 'red',
            recovered: 'green',
        }
        this.input.data.labels = this.worldData.labels;
        this.input.data.datasets=[{
            label: typeOfGraphStr,
            data: this.worldData[typeOfGraphStr],
            backgroundColor: colors[typeOfGraphStr],
            barPercentage: 1.6,
        }],

        this.chart.update();
    }
    render(inputName=this.lastCountry){
        let countryName = inputName.toLowerCase().split(' ').filter(v=>v!=='').map(v=>v.trim()).join('-');
        if(countryName =='united-states-of-america'){
            countryName = 'united-states'
        }
        if(countryName === 'global'){
            this.renderGlobal()
        }else{
            this.setupCountryName(countryName)
        }
    }
    renderBySlider(){
        this.parent.render()
    }
    setupCountryName(countryName){
        if(this.countries[countryName]==undefined){
            fetch(`${urls.graphForCountry}${countryName}`)
            .then(res => {
                if (res.status !== 200) {
                    return Promise.reject(res);
                }
                return res.json();
            }).then((res) => {
                this.countries[countryName] = {
                    labels: res.map(v=>v.Date.slice(0,10).split('-').join('/')) ,
                    cases: res.map (v => v.Confirmed),
                    deaths: res.map (v => v.Deaths),
                    recovered: res.map (v => v.Recovered),
                };
                this.renderCountry(countryName);
            })
        }else{
            this.renderCountry(countryName);
        }
    }
    renderCountry(countryName){
        this.lastCountry = countryName;
        const typeOfGraphStr = this.slider.val;
        let colors = {
            cases: 'black',
            deaths: 'red',
            recovered: 'green',
        }
        this.input.data.labels = this.countries[countryName].labels;
        this.input.data.datasets=[{
            label: typeOfGraphStr,
            data: this.countries[countryName][typeOfGraphStr],
            backgroundColor: colors[typeOfGraphStr],
            barPercentage: 1.6,
        }];

        this.chart.update();
    }
}

let graph = new Graph()

export default graph