const apiKey = "2c73d2c90c31c425ac8fabe555d70c3e";

const submitButton = document.getElementById("submit");
const inputElement = document.getElementById("input");
const cityElement = document.getElementById("city-name");
const headlineElement = document.getElementById("headline");
const tempElement = document.getElementById("temperature");
const feelsLikeElement = document.getElementById("feels-like");
const minMaxElement = document.getElementById("temp-range");
const forecastImage = document.getElementById("forecast-img");
const forecastArea = document.getElementById("forecast-area");

function getWeatherData(city) {
    let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetch(queryUrl)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      displayWeather(data);
    });
}

function buttonClick() {
  getWeatherData(inputElement.value);
}
submitButton.addEventListener("click", buttonClick);

function displayWeather(data) {
  cityElement.innerText = data.city.name;
    headlineElement.innerText = data.list[0].weather[0].main;
    tempElement.innerText = `Current temperature: ${data.list[0].main.temp}°C`;
    feelsLikeElement.innerText = `Feels like: ${data.list[0].main.feels_like}°C`;
    minMaxElement.innerText = `Temperature range: ${data.list[0].main.temp_min}°C - ${data.list[0].main.temp_max}°C`
    let imgUrl = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    forecastImage.innerHTML = `<img src="${imgUrl}"></img>`;
    forecastArea.innerHTML = "";
    displayForecast(data.list[8], 1);
    displayForecast(data.list[16], 2);
    displayForecast(data.list[24], 3);
    displayForecast(data.list[32], 4);
}

function displayForecast(data, idx) {
    let imgUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let htmlToAdd = `
        <div class="col-3 border">
            <p>${idx} day(s) from today:</p>
            <p>Forecast: ${data.weather[0].main}</p>
            <img src="${imgUrl}"></img>
            <p>Temperature: ${data.main.temp}</p>
        </div>
    `;
    forecastArea.innerHTML += htmlToAdd;
}