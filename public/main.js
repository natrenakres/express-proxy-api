const weatherDisplay = document.querySelector('.weather');
const weatherForm = document.querySelector('#weather-form');
const cityInput = document.querySelector('#city-input');


const fetchWeather = async (city) => {
    const url = `/api?city=${city}`;


    const res = await fetch(url);
    const {data} = await res.json();

    data.forEach(weather => {
        const displayData = {
            city: weather.city_name,
            temp: weather.temp
        }
    
        addWeatherToDOM(displayData);
        
    });

}

const addWeatherToDOM = (data) => {
    weatherDisplay.innerHTML = `
        <h1>Weather in ${data.city}</h1>
        <h2>${data.temp}</h2>
    `;

    cityInput.value = '';
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (cityInput.value === '') {
        alert('Please enter a city');
    } else {
        fetchWeather(cityInput.value);
    }

});

fetchWeather('Boston');