const url = 'https://api.covid19api.com';
const arrowLeft = document.querySelector('.arrow-left'); 
const arrowRight = document.querySelector('.arrow-right');
const slides = document.querySelectorAll('.slide');
const current = document.querySelector('.current');
const total = document.querySelector('.total');
const searchInput = document.getElementById('search');
const searchForm = document.getElementById('search-form');
let slideIndex = 1;

showSlides(slideIndex);

function addZero(n) {
    return n < 10 ? `0${n}` : n;
}

function showSlides(n) {
    let totalNum = slides.length;
    let currentNum = slideIndex;
    total.textContent = addZero(totalNum);
    if (n > slides.length) {
        slideIndex = 1;
        currentNum = slideIndex;
    }
    if (n < 1) {
        slideIndex = slides.length;
        currentNum = slideIndex;
    }

    slides.forEach(item => item.style.display = 'none');
    slides[slideIndex - 1].style.display = '';
    current.textContent = addZero(currentNum);
}

function presSlide(n) {
    showSlides(slideIndex += n);
}

arrowLeft.addEventListener('click', () => {
    presSlide(-1);
});

arrowRight.addEventListener('click', () => {
    presSlide(1);
});

const globalCases = document.getElementById('global-cases');
const tbody = document.querySelectorAll('.tbody');
const tableName = document.querySelector('.table-name');
const tableOutput = document.querySelector('.output');
const listParagraph = document.querySelectorAll('#list p');

window.addEventListener('DOMContentLoaded', () => {
    getInfo();
    getMap();
    grtChart();
});

//первый запрос
function getInfo() {
    //спиннер при загрузке сайта в каждом блоке. Может сделать один и затемнить экран и убрать 
    //его после получения ответа? или и так норм?
    globalCases.innerHTML = `<div class="spinner"></div>`;
    tbody[0].innerHTML = `<div class="spinner"></div>`;
    tableOutput.innerHTML = `<div class="spinner"></div>`
  fetch("https://api.covid19api.com/summary")
    .then(res => {
        if (res.status !== 200) {
            return Promise.reject(res);
        }
        return res.json();
    })
    .then((res) => {
        console.log(res);
        // searchCheckedCountry - флаг для table - отображать информацию для Global или 
        // у нас страна выбрана. false - изначально у нас global
        let searchCheckedCountry = false;
        //страна для поиска: input.value или event.target.textContent
        let searchText = '';
        //массивы массивов с информацией для list
        let cases = [];
        let deaths = [];
        let recover = [];
    
        res.Countries.forEach((country) => {
            cases.push([country.Country, country.CountryCode, country.TotalConfirmed]);
            deaths.push([country.Country, country.CountryCode, country.TotalDeaths]);
            recover.push([country.Country, country.CountryCode,country.TotalRecovered]);
        });
        //стартовая информация для table
        let lastDayTableInfo = [res.Global.NewConfirmed, res.Global.NewRecovered, res.Global.NewDeaths];
        let tableInfo = [res.Global.TotalConfirmed,  res.Global.TotalRecovered, res.Global.TotalDeaths];

        setGlobalInfo('Global cases:', res.Global.TotalConfirmed);
        setInfoInTable('Global cases:', tableInfo);

        //информация для list
        listParagraph.forEach(p => {
            switch(p.textContent) {
                case 'Cases':
                    setInfoInList(cases, 0);
                    break;
                case 'Deaths':
                    setInfoInList(deaths, 1);
                    break;
                case 'Recovered':
                    setInfoInList(recover, 2);
                    break;
            }
        });

        //поиск города 
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            searchCheckedCountry = true;
            searchText = searchInput.value;
            //меняем информацию в таблице, res.Countries - ответ от сервера, фильтруем информацию в нем по городу
            setInfoInTable(getCountryName(res.Countries, searchText), getTableInfo(res.Countries, searchText)); 
            //город который ищем для отрисовки графика
            drawChart(searchText);
        });
        document.addEventListener('click', (event) => {
                //отслеживаем клик по стране из lista
            if (event.target.getAttribute('class') === "target-country") {
                searchCheckedCountry = true;
                searchText = event.target.textContent;
                setInfoInTable(getCountryName(res.Countries, searchText), getTableInfo(res.Countries, searchText));
                drawChart(searchText);
            }
            //если кликнули в квадратик с глобальной информацией
            if (event.target.getAttribute('id') === 'global-cases') {
                searchCheckedCountry = false;
                setInfoInTable('Global cases:', tableInfo);
            }
            // 3 обработчика по корявым кнопочкам для теста как работает, здесь и нужен searchCheckedCountry чтоб знать что в таблицу грузить
            if(event.target.getAttribute('id') === 'button-global') {
                if (searchCheckedCountry === true) {
                    setInfoInTable(getCountryName(res.Countries, searchText), getTableInfo(res.Countries, searchText));
                } else {
                    setInfoInTable('Global cases:', tableInfo);
                }
            }
            if (event.target.getAttribute('id') === 'button-last') {
                if (searchCheckedCountry === true) {
                    setInfoInTable(getCountryName(res.Countries, searchText), getLastDayTableInfo(res.Countries, searchText));
                } else {
                    setInfoInTable('Global cases:', lastDayTableInfo);
                }
            }
            if(event.target.getAttribute('id') === 'button-statistic') {
                if (searchCheckedCountry === true) {
                    getPopulation(res.Countries, searchText);
                } else {
                    
                    setInfoInTable('Global cases:', lastDayTableInfo);
                }
            }
        });;
        
    });
    
}

//рендерит информацию в global
function setGlobalInfo(text, number) {
  globalCases.innerHTML = `${text} ${number}`;
}
//рендерит информацию в table
function setInfoInTable(text, array) {
    tableName.innerHTML = text;
    tableOutput.innerHTML = `
        <td>${array[0]}</td>
        <td class="rec">${array[1]}</td>
        <td class="deaths">${array[2]}</td>
    `
}
//рендерит информацию в list, n - индекс tbody куда информацию закидывать, понимаю что как-то иначе должно происходить, 
//но идеи лучше не посещают
function setInfoInList(array, n) {
    tbody[n].innerHTML = "";
    array.sort((a,b) => b[2] - a[2]);
    array.forEach(item => {
    tbody[n].innerHTML += `
        <tr>
            <td><img src="https://www.countryflags.io/${item[1]}/flat/24.png"></td>
            <td class="target-country">${item[0]}</td>
            <td >${item[2]}</td>
        </tr>
        `
    });
}

// для карты получить информацию
function getMap() {
    fetch(`https://api.covid19api.com/live/country/south-africa/status/confirmed`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
    });
}

function getChart() {
    //найти глобальные данные для загрузки при загрузке страницы
}

//получает информацию по случаям заражения (без умерших и выздоровевших)
function drawChart(countryName = 'belarus') {
    fetch(`https://api.covid19api.com/total/country/${countryName}/status/confirmed`)
        .then((res) => res.json())
        .then((res) => {
            let cases = [];
            if (res.length !== 0) {
                res.forEach((day) => {
                    cases.push([day.Date.slice(0, 10), day.Cases]);
                });
            }
            console.log(res)
    });
}
//получает информацию по населению и делает расчет на 100 000
function getPopulation(array, searchText) {
    fetch(`https://restcountries.eu/rest/v2/all?fields=name;population;flag`)
    .then((res) => res.json())
    .then((res) => {
        let statisticInfo = [];
        let showStatisticInfo = [];
        statisticInfo.push(getTableInfo(array, searchText));
        let populationInfo = getCountryPopulation(res, searchText);
        let statisticCases = Math.floor(+statisticInfo[0][0] / +populationInfo[0] * 100000);
        let statisticDeath = Math.floor(+statisticInfo[0][1] / +populationInfo[0] * 100000);
        let statisticRec = Math.floor(+statisticInfo[0][2] / +populationInfo[0] * 100000);
        showStatisticInfo.push(statisticCases, statisticDeath, statisticRec);
        setInfoInTable(`Cases in: ${searchText}`, showStatisticInfo);
});
}

//вспомогательные функции поиск страны, информации для таблицы, по последнему дню инфу, по населению для расчета
function getCountryName(array, searchText) {
    let countryTotalCase = '';
    array.filter(item => {
        if ((item.Country).toLowerCase() === searchText.toLowerCase()) {
            countryTotalCase += `Cases in: ${item.Country}`;
        }
    })
    return countryTotalCase;
}

function getTableInfo(array, searchText) {
    let tableInfo = [];
    array.filter(item => {
        if ((item.Country).toLowerCase() === searchText.toLowerCase()) {
            tableInfo.push(item.TotalConfirmed, item.TotalRecovered, item.TotalDeaths);
        }
    })
    return tableInfo;
}
function getLastDayTableInfo(array, searchText) {
    let tableInfo = [];
    array.filter(item => {
        if ((item.Country).toLowerCase() === searchText.toLowerCase()) {
            tableInfo.push(item.NewConfirmed, item.NewRecovered, item.NewDeaths);
        }
    })
    return tableInfo;
}
function getCountryPopulation(array, searchText) {
    let tableInfo = [];
    array.filter(item => {
        if ((item.name).toLowerCase() === searchText.toLowerCase()) {
            tableInfo.push(item.population);
        }
    })
    return tableInfo;
}


