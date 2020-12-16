import Chart from 'chart.js';
import urls from '../apiUrlConfig/apiUrl';

class Graph {
    constructor(){
        this.canvas = document.getElementById('graphCanvas');
        this.input = {
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
        this.chartJS = new Chart(this.canvas, this.input);
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
                    lables: Object.entries(res.cases).map(a=>a[0]),
                    cases: Object.entries(res.cases).map(a=>a[1]),
                    deaths: Object.entries(res.deaths).map(a=>a[1]),
                    recovered: Object.entries(res.recovered).map(a=>a[1]),
                }
                this.renderGlobal();
                console.log(this.worldData)
            })
    }
    renderGlobal(){
        this.input.data.labels = this.worldData.lables;
        let colors = ['grey','red','green'];
        this.input.data.datasets=[];
        ['cases','deaths','recovered'].forEach((a,i)=>{
            this.input.data.datasets.push({
                label: a,
                data: this.worldData[a],
                backgroundColor: colors[i],
                barPercentage: 1.3,
            })
        })
        this.chartJS.update();
        console.log(this.input);
    }
}




function setupGraph(){
    console.log('hello');
    let graph = new Graph()
}
export default setupGraph