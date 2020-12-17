const defImport = {
    type: 'bar',
    options: {
        legend: {
            display: false
         },
        scales: {
            yAxes: [{
                ticks: {
                    // display: false,
                    beginAtZero: true
                },
                gridLines: {
                    // color: "rgba(0, 0, 0, 0)",
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
export default defImport