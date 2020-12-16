import Chart from 'chart.js';
import urls from '../apiUrlConfig/apiUrl';

class Graph {
    constructor(){
        this.lastCountry = 'Global',
        this.defaultInput = {
            type: 'bar',
            options: {
                legend: {
                    display: false
                 },
                scales: {
                    yAxes: [{
                        ticks: {
                            display: false,
                            beginAtZero: true
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }
                    }]
                }
            }
        };
        this.createProps();
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
                this.renderGlobal('recovered');
                console.log(this.worldData)
            })
    }
    renderGlobal(typeOfGraphStr='cases'){
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
        console.log(this.input);
    }
    createProps() {
        this.canvas = document.querySelector('#graph canvas');
        this.input = {};
        Object.assign(this.input, this.defaultInput);
        this.chart = new Chart(this.canvas, this.input);
    }
}


let graph = new Graph()

export default graph