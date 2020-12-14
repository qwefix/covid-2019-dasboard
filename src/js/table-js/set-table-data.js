// https://api.covid19api.com/world?from=2020-03-01
const table ={
    cases: document.querySelector('#table td.cases'),
    deaths: document.querySelector('#table td.deaths'),
    rec: document.querySelector('#table td.rec'),
}
function setTableData(countryStr) {
  fetch("https://api.covid19api.com/summary")
    .then(res => {
        if (res.status !== 200) {
            return Promise.reject(res);
        }
        return res.json();
    })
    .then((res) => {
        console.log(res);
        table.cases.textContent=res.Global.TotalConfirmed;
        table.deaths.textContent=res.Global.TotalDeaths;
        table.rec.textContent=res.Global.TotalRecovered;
    })
}

export {setTableData}