import '../css/style.css';
// import table from './table-js/table';
// import graph from './graph-js/graph';
import list from './list-js/list';
import globalCases from './globalCases-js/globalCases';
import selectCountry from './selectCountry';
import autocompleteCountries from './views/autocomplete';

window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');

    list.setupListData();
    globalCases.setupGlobalCasesData();
    autocompleteCountries();

    document.addEventListener('click', (event) => {
        const checkCountry = document.querySelectorAll('.target-country');
        if (event.target.getAttribute('class') === "target-country") {
            checkCountry.forEach(item => item.classList.remove('gray'));
            event.target.classList.add('gray');
            let searchText = event.target.textContent;
            selectCountry(searchText);
        }
        if (event.target.getAttribute('id') === "global-cases") {
            checkCountry.forEach(item => item.classList.remove('gray'));
            let searchText = 'Global';
            selectCountry(searchText);
        }
        if (event.target.getAttribute("class") === "autocomplete-items") {
            closeAllLists(event.target);
        }
    });
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let searchText = searchInput.value;
        selectCountry(searchText);
        searchForm.reset();
    });
   
});

