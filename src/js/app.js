import '../css/style.css';
import table from './table-js/table';
import list from './list-js/list';
import selectCountry from './selectCountry';

window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const searchForm = document.getElementById('search-form');
   list.setupListData();
    document.addEventListener('click', (event) => {
        if (event.target.getAttribute('class') === "target-country") {
            let searchText = event.target.textContent;
            selectCountry(searchText);
        }
    });
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let searchText = searchInput.value;
        selectCountry(searchText);
    });
});