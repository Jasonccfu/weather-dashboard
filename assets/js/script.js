//variables
var todayDate = moment();
var APIKey = "7341266ecd1c2b76f83a4d7e336244b2";
var cityEl = document.getElementById("cityName");
var searchEl = document.getElementById("searchButton");
var showCity = document.getElementById("showCity");
var showCurrent = document.getElementById("showCurrent");

//get weather data
function getWeather() {
  //clearn when
  showCurrent.innerHTML = "";
  var APIKey = "7341266ecd1c2b76f83a4d7e336244b2";
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
      console.log(data);
      console.log(todayDate);
      console.log(data.dt);
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
    });
}

//when user click search
searchEl.addEventListener("click", getWeather);
