import { setTableData } from './set-table-data';
import addTableSwitchListeners from './switches';
function setupTable(){
    addTableSwitchListeners();
    setTableData()
}
export default setupTable;
