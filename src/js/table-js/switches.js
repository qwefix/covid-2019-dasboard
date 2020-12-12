function switcherForTable(evt){
    const switcher = evt.target.closest('div.switch');
    if (switcher === null) return
    switcher.querySelectorAll('p').forEach(v=>v.classList.toggle('on'))

}
function addTableSwitchListeners(){
    document.querySelectorAll('#table .settings').forEach(a=>a.addEventListener('click',switcherForTable,{capture:true}))
}
export default addTableSwitchListeners;
