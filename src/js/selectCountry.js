import graph from './graph-js/graph';
import table from './table-js/table';

export default function selectCountry(input){
    let countryNameString = input.toLowerCase().split(' ').filter(v=>v!=='').map(v=>v.trim()).join(' ');
    if(table.checkCountryName(countryNameString)){
        table.promiceRender(countryNameString);
        graph.render(countryNameString);
    }else{
        document.querySelector('#search-input').classList.add('fail');
        setTimeout(()=>document.querySelector('#search-input').classList.remove('fail'),3000)
    }
}
