//variables
var todayDate = moment();
var APIKey = "7341266ecd1c2b76f83a4d7e336244b2";
var cityEl = document.getElementById("cityName");
var searchEl = document.getElementById("searchButton");
var showCity = document.getElementById("showCity");
var showCurrent = document.getElementById("showCurrent");

//get weather data
function getWeather() {
  showCurrent.innerHTML = "";
  var APIKey = "7341266ecd1c2b76f83a4d7e336244b2";
  var baseURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityEl.value +
    "&appid=" +
    APIKey;

  fetch(baseURL)
    .then(function (res) {
      return res.json();
    })

    .then(function (data) {
      var temp = "Temp: " + data.main.temp + "F";
      var wind = "Wind: " + data.wind.speed + " MPH";
      var humidity = "Humidity: " + data.main.humidity + "%";
      showCity.innerHTML = data.name;
      var liEl = document.createElement("li");
      liEl.append(temp);
      showCurrent.appendChild(liEl);

      var liEl = document.createElement("li");
      liEl.append(wind);
      showCurrent.appendChild(liEl);

      var liEl = document.createElement("li");
      liEl.append(humidity);
      showCurrent.appendChild(liEl);
    });
}

//show current data
function showCurrent(data) {
  console.log(data);
  console.log(data.name);
  console.log("Temp: " + data.main.temp + "F");
  console.log("Wind: " + data.wind.speed + " MPH");
  console.log("Humidity: " + data.main.humidity + "%");
}

//when user click search
searchEl.addEventListener("click", getWeather);
