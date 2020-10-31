function showCurrentlocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3154b3b9fa1b9603160b9d7cdb5a315c";
  let apiUrl = `Https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperatureAndCity);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showTemperatureAndCity(response) {
  console.log(response);

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");

  temperatureElement.innerHTML = `${temperature}`;
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

  let apiKey = "3154b3b9fa1b9603160b9d7cdb5a315c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  console.log(response);

  let cardOneTitle = document.querySelector("#card-one-title");
  let cardOneImg = document.querySelector("#card-one-img");
  let cardOneTxt = document.querySelector("#card-one-txt");

  cardOneTitle.innerHTML = getDayOfWeek(response.data.daily[1].dt);
  cardOneImg.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[1].weather[0].icon}@2x.png`
  );
  cardOneImg.setAttribute("alt", response.data.daily[1].weather[0].description);
  cardOneTxt.innerHTML = response.data.daily[1].weather[0].description;

  let cardTwoTitle = document.querySelector("#card-two-title");
  let cardTwoImg = document.querySelector("#card-two-img");
  let cardTwoTxt = document.querySelector("#card-two-txt");

  cardTwoTitle.innerHTML = getDayOfWeek(response.data.daily[2].dt);
  cardTwoImg.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[2].weather[0].icon}@2x.png`
  );
  cardTwoImg.setAttribute("alt", response.data.daily[2].weather[0].description);
  cardTwoTxt.innerHTML = response.data.daily[2].weather[0].description;

  let cardThrTitle = document.querySelector("#card-thr-title");
  let cardThrImg = document.querySelector("#card-thr-img");
  let cardThrTxt = document.querySelector("#card-thr-txt");

  cardThrTitle.innerHTML = getDayOfWeek(response.data.daily[3].dt);
  cardThrImg.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[3].weather[0].icon}@2x.png`
  );
  cardThrImg.setAttribute("alt", response.data.daily[3].weather[0].description);
  cardThrTxt.innerHTML = response.data.daily[3].weather[0].description;

  let cardFouTitle = document.querySelector("#card-fou-title");
  let cardFouImg = document.querySelector("#card-fou-img");
  let cardFouTxt = document.querySelector("#card-fou-txt");

  cardFouTitle.innerHTML = getDayOfWeek(response.data.daily[4].dt);
  cardFouImg.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[4].weather[0].icon}@2x.png`
  );
  cardFouImg.setAttribute("alt", response.data.daily[4].weather[0].description);
  cardFouTxt.innerHTML = response.data.daily[4].weather[0].description;

  let cardFivTitle = document.querySelector("#card-fiv-title");
  let cardFivImg = document.querySelector("#card-fiv-img");
  let cardFivTxt = document.querySelector("#card-fiv-txt");

  cardFivTitle.innerHTML = getDayOfWeek(response.data.daily[5].dt);
  cardFivImg.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[5].weather[0].icon}@2x.png`
  );
  cardFivImg.setAttribute("alt", response.data.daily[5].weather[0].description);
  cardFivTxt.innerHTML = response.data.daily[5].weather[0].description;
}

function getDayOfWeek(unix_timestamp) {
  var date = new Date(unix_timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function showCity(event) {
  event.preventDefault();
  let textInput = document.querySelector("#city-name");

  let apiKey = "3154b3b9fa1b9603160b9d7cdb5a315c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${textInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperatureAndCity);
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

  let hours = now.getHours();
  let minutes = now.getMinutes(0 - 59);
  let day = days[now.getDay()];

  let paragraphDate = document.querySelector("#current-date");
  paragraphDate.innerHTML = `${day} ${hours}:${minutes}`;
}

navigator.geolocation.getCurrentPosition(showCurrentlocation);
setDate();

let form = document.querySelector("#city-form");
form.onsubmit = showCity;

let temperatureElement = document.querySelector("#temperature");

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
