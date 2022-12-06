//variables
var APIKey = "7341266ecd1c2b76f83a4d7e336244b2";
var cityEl = document.getElementById("cityName");
var searchEl = document.getElementById("cityButton");

function getWeather(cityName) {
  var APIKey = "7341266ecd1c2b76f83a4d7e336244b2";
  var baseURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIKey;

  fetch(baseURL).then(function (res) {
    return res.json().then(function (data) {});
  });
}

getWeather("Seattle");
