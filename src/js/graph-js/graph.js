import Chart from 'chart.js';
import urls from '../apiUrlConfig/apiUrl';
import defImport from './defImport';
import GraphSlider from './slider';

class Graph {
    constructor(){
        this.slider = new GraphSlider(this.renderBySlider,this)
        this.canvas = document.querySelector('#graph canvas');
        this.lastCountry = 'Global',
        
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
            barPercentage: 1.2,
        }],

        this.chart.update();
    }
    render(country=this.lastCountry){
        if(country.toLowerCase() === 'global'){
            this.renderGlobal()
        }
    }
    renderBySlider(){
        this.parent.render()
    }
}

let graph = new Graph()

export default graph