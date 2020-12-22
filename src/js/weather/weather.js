export default function weatherSearch() {
    const getCity = () => {
        if (localStorage.getItem('city') === null) {
            cityText.textContent = '[Enter City]';
        } else {
            cityText.textContent = localStorage.getItem('city');
            getResults(cityText.textContent );
        }
    }
    
    const setCity = (event) => {
        if (event.type === 'keypress') {
            if (event.key === 'Enter' && event.target.innerText !== '') {
                localStorage.setItem('city', event.target.innerText);
                getResults(cityText.textContent );
                cityText.blur();
            }
            if (event.key === 'Enter' && event.target.innerText === '') {
                cityText.blur();
                getCity()
            }
        }else if (event.type === 'click'){
            event.target.innerText = '';
            cityText.focus();
        } else {
            getCity();
        }
    };
    const cityText = document.querySelector('.city');
    const api = {
        key: "558ef0dc48039d0b4cd8d42ac5251fe5",
        base: "https://api.openweathermap.org/data/2.5/"
    }
    cityText.addEventListener('keypress', setCity);
    cityText.addEventListener('blur', setCity);
    cityText.addEventListener('click', setCity);
    
    function getResults(city) {
        fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
            .then(weather => {
                return weather.json();
            }).then(displayResults)
            .catch(err => alert(`Сity not found: ${err}`));
    }
    
    function displayResults(weather) {
    
        let temp = document.querySelector('.temp');
            temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    
        let weatherIcon = document.querySelector('.icon');
            weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.weather[0]['icon']}@2x.png">`;
    
        let humidity = document.querySelector('.humidity');
            humidity.innerText = `Humidity: ${Math.round(weather.main.humidity)}%`;
        
        let wind = document.querySelector('.wind');
            wind.innerText = `Wind: ${weather.wind.speed} m/s`;
    }
    getCity();
}

