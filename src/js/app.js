import '../css/style.css';
import setupMap from './map-js/map';
import list from './list-js/list';
import globalCases from './globalCases-js/globalCases';
import selectCountry from './selectCountry';
import autocompleteCountries from './views/autocomplete';
import keyboard from './views/keyboard';
import weatherSearch from './weather/weather';

window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');
    const showKeyboard = document.querySelector('.keyboard-show');
   
    keyboard.init();
    list.setupListData();
    globalCases.setupGlobalCasesData();
    autocompleteCountries();
    weatherSearch();

    showKeyboard.addEventListener('click', () => {
        const wrapper = document.querySelector('.wrapper');
        wrapper.classList.toggle('wrapper-hidden');
    });
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
        
    });
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let searchText = searchInput.value;
        selectCountry(searchText);
        searchForm.reset();
    });
   
});
setupMap();