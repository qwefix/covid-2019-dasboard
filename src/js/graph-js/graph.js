import Chart from 'chart.js';

class Graph {
    constructor(){
        this.canvas = document.getElementById('graphCanvas');
        this.config = {
            type: 'bar',
            data: {
                labels: ['1', '2', '3', '4', '5', '6'],
                datasets: [
                    {
                        barPercentage: 0.4,
                        label: 'deaths',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: 'red',
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
                            // display: false
                        }
                    }]
                }
            }
        };
        this.chartJS = new Chart(this.canvas, this.config);
        this.setup();
    }

    setup(){
        this.promice = fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=366")
            .then(res => {
                if (res.status !== 200) {
                    return Promise.reject(res);
                }
                return res.json();
            })  
    }
}




function setupGraph(){
    console.log('hello');
    let graph = new Graph()
}
export default setupGraph