import '../css/style.css';
// import table from './table-js/table';
// import graph from './graph-js/graph';
import list from './list-js/list';
import globalCases from './globalCases-js/globalCases';
import selectCountry from './selectCountry';
import autocompleteCountries from './views/autocomplete';
import keyboard from './views/keyboard';

window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');
    const showKeyboard = document.querySelector('.keyboard-show');
   
    keyboard.init();
    list.setupListData();
    globalCases.setupGlobalCasesData();
    autocompleteCountries();

    showKeyboard.addEventListener('click', () => {
        const wrapper = document.querySelector('.wrapper');
        wrapper.classList.toggle('wrapper-hidden');
    });
    document.addEventListener('click', (event) => {
        if (event.target.getAttribute('class') === "target-country") {
            let searchText = event.target.textContent;
            selectCountry(searchText);
        }
        if (event.target.getAttribute('id') === "global-cases") {
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

