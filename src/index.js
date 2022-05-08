function showCurrentTime() {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let header = document.querySelector(".date");
  header.innerHTML = `${day} ${hours} : ${minutes}`;
}

showCurrentTime();

function searchCity(city) {
  let apiKey = "4ae86e02efa11f6104c128d0198748d6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function submit(event) {
  event.preventDefault();
  let cityElement = document.querySelector(".city-name");
  let cityInput = document.querySelector("#search-text-input");
  cityElement.innerHTML = cityInput.value;

  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", submit);

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let temp_minElement = document.querySelector("#temp_min");
  let temp_maxElement = document.querySelector("#temp_max");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  temp_minElement.innerHTML = Math.round(response.data.main.temp_min);
  temp_maxElement.innerHTML = Math.round(response.data.main.temp_max);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  function showLocation(position) {
    let apiKey = "5dbcef116299e239c6fa8aa6bc960ebc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
  }

  function displayLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showLocation);
  }

  let currentButton = document.querySelector(".button-current-location");
  currentButton.addEventListener("click", displayLocation);
}

searchCity("Brussels");

//function displayFahrenheitTemperature(event) {
//event.preventDefault();
//let fahrenheitTemperature = (14 * 9) / 5 + 32;
//alert("Link clicked");
//alert(fahrenheitTemperature);
//}

//let fahrenheitLink = document.querySelector("fahrenheit-link");
//fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
