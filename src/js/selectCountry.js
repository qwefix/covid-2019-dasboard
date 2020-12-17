import graph from './graph-js/graph';
import table from './table-js/table';

export default function selectCountry(countryNameString){
    table.promiceRender(countryNameString);
    graph.render(countryNameString);
}
