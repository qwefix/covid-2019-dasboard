import Chart from 'chart.js';
import urls from '../apiUrlConfig/apiUrl';

class Graph {
    constructor(){
        this.lastCountry = 'Global',
        this.defaultInput = {
            type: 'bar',
            data: {
                labels: ['1', '2', '3', '4', '5', '6'],
                datasets: [
                    {
                        label: 'deaths',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: 'red',
                        barPercentage: 1.3,
                    },
                ]
            },
            options: {
                legend: {
                    display: false
                 },
                scales: {
                    yAxes: [{
                        ticks: {
                            display: false,
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            display: false
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
            barPercentage: 1,
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