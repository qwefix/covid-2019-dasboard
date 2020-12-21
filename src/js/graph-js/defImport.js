const defImport = {
    type: 'bar',
    options: {
        legend: {
            display: false
         },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
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
export default defImport