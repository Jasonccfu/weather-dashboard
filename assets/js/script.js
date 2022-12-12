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
      var img = data.weather[0].icon;
      var temp = "Temp: " + data.main.temp + "°F";
      var wind = "Wind: " + data.wind.speed + " MPH";
      var humidity = "Humidity: " + data.main.humidity + " %";
      showCity.innerHTML =
        data.name + " (" + moment(data.dt_txt).format("MM/DD/YYYY") + ")";

      var weatherIcon = document.createElement("img");
      weatherIcon.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + img + ".png"
      );
      showCurrent.appendChild(weatherIcon);

      var divEl = document.createElement("div");
      divEl.append(temp);
      showCurrent.appendChild(divEl);

      var divEl = document.createElement("div");
      divEl.append(wind);
      showCurrent.appendChild(divEl);

      var divEl = document.createElement("div");
      divEl.append(humidity);
      showCurrent.appendChild(divEl);
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
      console.log(data);
      //for loop to show next five days
      // i = per 3 hrs , so i + 8 for next 24 hours.
      for (var i = 5; i < data.list.length; i = i + 8) {
        var h2El = document.createElement("h2");
        h2El.append(moment(data.list[i].dt_txt).format("MM/DD/YYYY"));
        showFiveday.appendChild(h2El);

        var img = data.list[i].weather[0].icon;
        var weatherIcon = document.createElement("img");
        weatherIcon.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/" + img + ".png"
        );
        showFiveday.appendChild(weatherIcon);

        var divEl = document.createElement("div");
        divEl.append("Temp: " + data.list[i].main.temp + "°F");
        showFiveday.appendChild(divEl);

        var divEl = document.createElement("div");
        divEl.append("Wind: " + data.list[i].wind.speed + " MPH");
        showFiveday.appendChild(divEl);

        var divEl = document.createElement("div");
        divEl.append("Humidity: " + data.list[i].main.humidity + " %");
        showFiveday.appendChild(divEl);
      }
    });
}

//search history
function searchHistory(text) {
  var his = text;
  console.log(text);
}

//when user click search
searchEl.addEventListener("click", getWeather);
// searchedEl.addEventListener("click", searchHistory(button.textContent));
