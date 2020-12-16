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
        this.Country='Global';
        this.switches.switchers.forEach(v=>v.addEventListener('click',(evt)=>{
            this.switches.switcherForTable(evt);
            this.promiceRender(this.Country);
        })) 
    }
    setupTableData() {
        this.promice = fetch("https://api.covid19api.com/summary")
            .then(res => {
                if (res.status !== 200) {
                    return Promise.reject(res);
                }
                return res.json();
            })
            .then((res) => {
                this.worldData=res;
            })
            .then(()=>fetch("https://restcountries.eu/rest/v2/all?fields=population;alpha2Code"))
            .then(res => {
            if (res.status !== 200) {
                return Promise.reject(res);
            }
            return res.json();
            }).then((res) => {
                this.worldData.population=res;
                console.log(this)
            })
            .then(()=>this.renderData('Global'))
    };
    
    renderData(countryName='Global'){
        this.Country=countryName;
        let countryObj={};
        let isAllTime = this.switches.tableSwitchesPositions.allTime;
        let isAbsolute = this.switches.tableSwitchesPositions.absolute;
        let outputObj ={};
        if(countryName==='Global'){
            console.log
            countryObj=this.worldData.Global;
            countryObj.population = 7000000000;
        }else{
            countryObj = this.worldData.Countries.find(a=>a.Country === countryName);
            countryObj.population = this.worldData.population.find(a=>a.alpha2Code === countryObj.CountryCode).population;
        };
        outputObj.countryName = countryName;
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
        this.renderInTable(outputObj)   
    }
    promiceRender(country){
        this.promice.then(()=>this.renderData(country))
    }
    renderInTable(obj){
        this.table.countryName.textContent = obj.countryName;
        this.table.cases.textContent = this.prettyNumber(obj.cases);
        this.table.deaths.textContent = this.prettyNumber(obj.deaths);
        this.table.rec.textContent = this.prettyNumber(obj.rec);
    }
    prettyNumber(number){
        let divider={
            num:1,
            str:'',
        }
        if(number>9999999){
            divider={
                num:1000000,
                str:'M',
            }
        }else if(number>9999){
            divider={
                num:1000,
                str:'K'
            }
        }

        return Math.round(number/divider.num*10)/10 + divider.str
    }
}
const table = new CovidTable(tableSwitchers);

export default table