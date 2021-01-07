import '../css/style.css';
import urls from './apiUrlConfig/apiUrl';
import setupMap from './map-js/map';
import list from './list-js/list';
import global from './globalCases-js/globalCases';
import table from './table-js/table';
import selectCountry from './selectCountry';
import autocompleteCountries from './views/autocomplete';
import keyboard from './views/keyboard';
import weatherSearch from './weather/weather';

window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');
    const showKeyboard = document.querySelector('.keyboard-show');
    const globalCaseWord = 'Global';

    function sendRequest(url) {
        return fetch(url).then(res => {
            if (res.status !== 200) {
                alert('Упс! Cервер не работает;-(...Попробуйте позже...');
                return Promise.reject(res);
            }
            return res.json();
        })
    
    }
    sendRequest(`${urls.covid19api}/summary`)
        .then(data => {
            list.getListInfo(data);
            global.getGlobalInfo(data);
            table.setupTableData(data);
            autocompleteCountries(data);
        })
        .catch(err => console.log(err))
   
    keyboard.init();
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
            let searchText = globalCaseWord;
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