class GlobalCases {
    constructor() {
        this.globalCasesBlock = document.getElementById('global-cases');
    }
    getGlobalInfo(data) {
        this.globalCasesBlock.innerHTML = `Cases in the world: ${data.Global.TotalConfirmed.toLocaleString('en', { maximumFractionDigits: 0 })}`;
    }
}

let global = new GlobalCases();
export default global;