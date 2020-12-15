// https://api.covid19api.com/world
//https://api.covid19api.com/dayone/country/south-africa
//https://api.covid19api.com/summary

import tableSwitchers from './switches';

class CovidTable{
    constructor(switches){
        this.table={
            cases: document.querySelector('#table td.cases'),
            deaths: document.querySelector('#table td.deaths'),
            rec: document.querySelector('#table td.rec'),
            countryName: document.querySelector('#table header p'),
        };
        this.switches=switches;
        this.setupTableData();
    }
    setupTableData() {
        fetch("https://api.covid19api.com/summary")
            .then(res => {
                if (res.status !== 200) {
                    return Promise.reject(res);
                }
                return res.json();
            })
            .then((res) => {
                this.worldData=res;
                this.table.cases.textContent=res.Global.TotalConfirmed;
                this.table.deaths.textContent=res.Global.TotalDeaths;
                this.table.rec.textContent=res.Global.TotalRecovered;
            }).then(()=>fetch("https://restcountries.eu/rest/v2/all?fields=name;population"))
            .then(res => {
            if (res.status !== 200) {
                return Promise.reject(res);
            }
            return res.json();
            }).then((res) => {
                this.worldData.population=res;
                console.log(this)
            })
            .then(()=>this.renderData('Belarus'))
    };

    renderData(countryName='Global'){
        let countryObj;
        let isAllTime = this.switches.tableSwitchesPositions.allTime;
        let isAbsolute = this.switches.tableSwitchesPositions.absolute;
        let outputObj ={};
        if(countryName==='Global'){
            countryObj=this.worldData.Global;
            countryObj.population = 7000000000;
        }else{
            countryObj = this.worldData.Countries.find(a=>a.Country === countryName);
            countryObj.population = this.worldData.population.find(a=>a.name === countryName).population;
        };
        this.countryObj = countryObj;

        outputObj.countryName = countryObj.Country;
        if(isAllTime){
            outputObj.cases = countryObj.TotalConfirmed;
            outputObj.rec = countryObj.TotalRecovered;
            outputObj.deaths = countryObj.TotalDeaths;           
        }else{
            outputObj.cases = countryObj.NewConfirmed;
            outputObj.rec = countryObj.NewRecovered;
            outputObj.deaths = countryObj.NewDeaths;
        }

        if(!isAbsolute){
            outputObj.cases *=100000 / countryObj.population;
            outputObj.rec *=100000 / countryObj.population;
            outputObj.deaths *=100000 / countryObj.population;
        }
        console.log(countryObj)
        console.log(outputObj)        
    }
    
}
const table = new CovidTable(tableSwitchers);


export default table