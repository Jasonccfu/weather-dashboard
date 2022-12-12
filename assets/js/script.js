//variables
var todayDate = moment();
var APIKey = "7341266ecd1c2b76f83a4d7e336244b2";
var cityEl = document.getElementById("cityName");
var searchEl = document.getElementById("searchButton");
var showCity = document.getElementById("showCity");
var showCurrent = document.getElementById("showCurrent");
var showFiveday = document.getElementById("showFiveday");
var searchHistory = document.getElementById("searchHistory");
var cities = [];
let lon = 0;
let lat = 0;

//get weather data
function getWeather() {
  //clear previous when recall
  showCurrent.innerHTML = "";
  var baseURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityEl.value +
    "&units=imperial&appid=" +
    APIKey;

  fetch(baseURL)
    .then(function (res) {
      return res.json();
    })

    .then(function (data) {
      //get location:lon&lat

      lon = data.coord.lon;
      lat = data.coord.lat;

      searchedEl = document.createElement("button");
      searchedEl.append(data.name);
      searchHistory.appendChild(searchedEl);

      var temp = "Temp: " + data.main.temp + "°F";
      var wind = "Wind: " + data.wind.speed + " MPH";
      var humidity = "Humidity: " + data.main.humidity + " %";
      showCity.innerHTML =
        data.name + " (" + moment(data.dt_txt).format("MM/DD/YYYY") + ")";
      var liEl = document.createElement("li");
      liEl.append(temp);
      showCurrent.appendChild(liEl);

      var liEl = document.createElement("li");
      liEl.append(wind);
      showCurrent.appendChild(liEl);

      var liEl = document.createElement("li");
      liEl.append(humidity);
      showCurrent.appendChild(liEl);
      //get 5-daysforecast
      getFiveDayForecast();
    });
}

function getFiveDayForecast() {
  //clear previous when recall
  showFiveday.innerHTML = "";
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=" +
    APIKey;

  fetch(forecastURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data.list);
      //for loop to show next five days
      // i = per 3 hrs , so i + 8 for next 24 hours.
      for (var i = 5; i < data.list.length; i = i + 8) {
        var h2El = document.createElement("h2");
        h2El.append(moment(data.list[i].dt_txt).format("MM/DD/YYYY"));
        showFiveday.appendChild(h2El);

        var liEl = document.createElement("li");
        liEl.append("Temp: " + data.list[i].main.temp + "°F");
        showFiveday.appendChild(liEl);

        var liEl = document.createElement("li");
        liEl.append("Wind: " + data.list[i].wind.speed + " MPH");
        showFiveday.appendChild(liEl);

        var liEl = document.createElement("li");
        liEl.append("Humidity: " + data.list[i].main.humidity + " %");
        showFiveday.appendChild(liEl);
      }
    });
}

//search history
function searchHistory(cityName) {
  searchedEl = document.createElement("button");
  searchedEl.innerHTML(cityName);
}

//when user click search
searchEl.addEventListener("click", getWeather);
