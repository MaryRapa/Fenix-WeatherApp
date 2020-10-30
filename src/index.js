function showCurrentlocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3154b3b9fa1b9603160b9d7cdb5a315c";
  let apiUrl = `Https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperatureAndCity);
  let apiUrlFuture = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
  axios.get(apiUrlFuture).then(showFutureWeather);
}

function showTemperatureAndCity(response) {
  console.log(response);

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");

  temperatureElement.innerHTML = `${temperature}°C`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} kmh`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  descriptionElement.innerHTML = response.data.weather[0].description;

  let city = response.data.name;
  let h3 = document.querySelector("#h3-city");
  h3.innerHTML = city;
}

function showFutureWeather(response) {
  console.log(response);
}

function showThisCity(cityName) {
  let apiKey = "3154b3b9fa1b9603160b9d7cdb5a315c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperatureAndCity);
}

function showCity(event) {
  event.preventDefault();
  let textInput = document.querySelector("#city-name");

  showThisCity(textInput.value);
}

function setDate() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes(0 - 59);
  let day = days[now.getDay()];

  let paragraphDate = document.querySelector("#current-date");
  paragraphDate.innerHTML = `${day} ${hours}:${minutes}`;
}

function clickTemperature() {
  let temperature = document.querySelector("#temperature");
  if (temperature.innerHTML.indexOf("C") !== -1) {
    temperature.innerHTML = "75°F";
  } else {
    temperature.innerHTML = "24°C";
  }
  console.log("temperature click: " + temperature);
}

navigator.geolocation.getCurrentPosition(showCurrentlocation);
setDate();

let form = document.querySelector("#city-form");
form.onsubmit = showCity;

let temperatureElement = document.querySelector("#temperature");
//temperatureElement.addEventListener("click", clickTemperature);
