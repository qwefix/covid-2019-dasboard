import tableSwitchers from './switches';
import urls from '../apiUrlConfig/apiUrl';
class CovidTable{
    constructor(switches, urls){
        this.table={
            cases: document.querySelector('#table td.cases'),
            deaths: document.querySelector('#table td.deaths'),
            rec: document.querySelector('#table td.rec'),
            countryName: document.querySelector('#table header p'),
        };
        this.covid2019Api = urls.covid19api;
        this.populationApi = urls.populationInfoApi;
        this.switches=switches;
        this.setupTableData();
        this.Country='Global';
        this.switches.switchers.forEach(v=>v.addEventListener('click',(evt)=>{
            this.switches.switcherForTable(evt);
            this.promiceRender(this.Country);
        })) 
    }
    setupTableData(data) {
        this.worldData=data;
        if (data) {
            this.setupPopulation()
        }
    }
    setupPopulation() {
        this.promice = fetch(`${this.populationApi}`)
            .then((res => {
                if (res.status !== 200) {
                            alert('Упс! Cервер не работает;-(...Попробуйте позже...');
                            return Promise.reject(res);
                        }
                        return res.json();
            }))
            .then((res) => this.worldData.population=res)
            .then(()=>this.renderData('Global'))
            .catch(err => console.log(err))
    }
    
    renderData(countryName = 'global'){
        this.Country=countryName;
        let countryObj={};
        let isAllTime = this.switches.tableSwitchesPositions.allTime;
        let isAbsolute = this.switches.tableSwitchesPositions.absolute;
        let outputObj ={};
        if(countryName.toLowerCase() === 'global'){
            countryObj=this.worldData.Global;
            countryObj.population = 7000000000;
        }else{
            countryObj = this.worldData.Countries.find(a=>a.Country.toLowerCase() === countryName);
            countryObj.population = this.worldData.population.find(a=>a.alpha2Code === countryObj.CountryCode).population;
        }
        outputObj.countryName =  countryObj.Country || 'Global';
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
        this.promice.then(()=>this.renderData(country)).catch(err => console.log(err))
    }
    renderInTable(obj){
        this.table.countryName.textContent = obj.countryName;
        this.table.cases.textContent = this.round(obj.cases);
        this.table.deaths.textContent = this.round(obj.deaths);
        this.table.rec.textContent = this.round(obj.rec);
    }
    round(num){
        return Math.round(num*10)/10
    }
    checkCountryName(name){
        if(this.worldData.Countries.find(v=>v.Country.toLowerCase() === name || name === 'global') === undefined) return false;
        return true
    }
    prettyNumber(number){
        let divider={
            num:1,
            str:'',
        }
        if(number>999999){
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
const table = new CovidTable(tableSwitchers, urls);

export default table