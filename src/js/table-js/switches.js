class TableSwitcher{
    constructor(){
        this.tableSwitchesPositions={
            allTime:true,
            absolute:true,
        };
        this.switchers = Array.from(document.querySelectorAll('#table .settings div.switch'));
    }

    switcherForTable(evt){
        const switcher = evt.target.closest('div.switch');
        const i =Array.from(document.querySelectorAll('#table .settings div.switch')).indexOf(switcher);
        this.switchBool(i);
        if (switcher === null) return;
        switcher.querySelectorAll('*').forEach(v=>v.classList.toggle('on'));
    }

    switchBool(i) {
        if(i===0){
            this.tableSwitchesPositions.allTime = !this.tableSwitchesPositions.allTime;
        }else{
            this.tableSwitchesPositions.absolute = !this.tableSwitchesPositions.absolute;
        }
    }
}
const tableSwitchers = new TableSwitcher();
export default tableSwitchers