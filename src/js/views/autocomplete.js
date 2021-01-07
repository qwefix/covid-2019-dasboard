function autocompleteCountries(data) {
    showCountries(data.Countries.map(item => item.Country));
}
function showCountries(data) {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener("input", function(event) {
        let searchValue = event.target.value;
        let arr = data;
        const searchContainer = document.createElement("div");
        closeAllLists();
        if (!searchValue) { return false;}
        searchContainer.setAttribute("id", "MyAutocomplete-list");
        searchContainer.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(searchContainer);
        for (let i = 0; i < arr.length; i += 1) {
            if (arr[i].substr(0, searchValue.length).toUpperCase() == searchValue.toUpperCase()) {
            const autocompleteList = document.createElement("div");
            autocompleteList.innerHTML = `<strong>${arr[i].substr(0, searchValue.length)}</strong>`;
            autocompleteList.innerHTML += arr[i].substr(searchValue.length);
            autocompleteList.innerHTML += `<input  class="myInput" type='hidden' value='${arr[i]}'>`;
                autocompleteList.addEventListener("click", function(event) {
                searchInput.value = event.target.getElementsByTagName("input")[0].value;
                searchInput.focus();
                closeAllLists();
            });
            searchContainer.appendChild(autocompleteList);
            }
        }
    });

    function closeAllLists(elem) {
    const searchInput = document.getElementById('search-input');
    const autocompleteItems = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < autocompleteItems.length; i += 1) {
            if (elem !== autocompleteItems[i] && elem !== searchInput) {
                autocompleteItems[i].parentNode.removeChild(autocompleteItems[i]);
            }
        }
    }

}
export default autocompleteCountries;