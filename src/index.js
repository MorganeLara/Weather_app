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

  let header = document.querySelector(".header-date");
  header.innerHTML = `${day} ${hours} : ${minutes}`;

  let currentTime = document.querySelector(".current-hour");
  currentTime.innerHTML = `${hours} : ${minutes}`;
}

showCurrentTime();

function searchCity(city) {
  let apiKey = "4ae86e02efa11f6104c128d0198748d6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function submit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-name");
  let cityInput = document.querySelector("#search-text-input");
  cityElement.innerHTML = cityInput.value;

  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", submit);

function displayTemperature(response) {
  let citySelector = document.querySelector("#city-name");
  citySelector.innerHTML = response.data.name;
  let tempSelector = document.querySelector(".card-temp");
  tempSelector.innerHTML = `${Math.round(response.data.main.temp)}°C`;
}

function showLocation(position) {
  let apiKey = "4ae86e02efa11f6104c128d0198748d6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function displayLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector(".button-current-location");
currentButton.addEventListener("click", displayLocation);
