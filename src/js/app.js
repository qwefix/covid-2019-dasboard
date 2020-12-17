import '../css/style.css';
import table from './table-js/table';
import graph from './graph-js/graph';
import list from './list-js/list';
import globalCases from './globalCases-js/globalCases';
import selectCountry from './selectCountry';

window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const searchForm = document.getElementById('search-form');
   list.setupListData();
   globalCases.setupGlobalCasesData();
    document.addEventListener('click', (event) => {
        if (event.target.getAttribute('class') === "target-country") {
            let searchText = event.target.textContent;
            selectCountry(searchText);
        }
        if (event.target.getAttribute('id') === "global-cases") {
            let searchText = 'Global';
            selectCountry(searchText);
        }
    });
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let searchText = searchInput.value;
        selectCountry(searchText);
    });
});

