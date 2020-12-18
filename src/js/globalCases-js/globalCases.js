import urls from '../apiUrlConfig/apiUrl';

class GlobalCases {
    constructor(apiUrls) {
        this.covid2019Api  = apiUrls.covid19api;
        this.globalCasesBlock = document.getElementById('global-cases');
    }
    setupGlobalCasesData() {
        fetch(`${this.covid2019Api}/summary`)
            .then(res => {
                if (res.status !== 200) {
                    return Promise.reject(res);
                }
                return res.json();
            })
            .then((res) => {
               this.globalInfo = res.Global.TotalConfirmed.toLocaleString('en', { maximumFractionDigits: 0 });
               this.getGlobalInfo(this.globalInfo);
            })     
    };
    getGlobalInfo(casesNumber) {
        this.globalCasesBlock.innerHTML = `Global Situation: ${casesNumber}`;
    }
}

let globalCases = new GlobalCases(urls);
export default globalCases;