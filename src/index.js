function showCurrentlocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3154b3b9fa1b9603160b9d7cdb5a315c";
  let apiUrl = `Https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperatureAndCity);
}

function showTemperatureAndCity(response) {
  console.log(response);

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C`;

  let city = response.data.name;
  let h3 = document.querySelector("#h3-city");
  h3.innerHTML = city;
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
  let minutes = now.getMinutes();
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
