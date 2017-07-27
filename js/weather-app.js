(function(){
var DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
var DARKSKY_API_KEY = '68ae7d38fb51db27bc7d79139fe20b2a';
var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

var GOOGLE_MAPS_API_KEY = 'AIzaSyApuWuU8zo2iT8ExAHbGRJU_1pQkJBt71Q';
var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

// This function returns a promise that will resolve with an object of lat/lng coordinates
function getCoordinatesForCity(cityName) {
  var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;

  return (
    fetch(url) // Returns a promise for a Response
    .then(response => response.json()) // Returns a promise for the parsed JSON
    .then(data => data.results[0].geometry.location) // Transform the response to only take what we need
  );
}

function getCurrentWeather(coords) {
  var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}?units=si&exclude=minutely,hourly,daily,alerts,flags`;

  return (
    fetch(url)
    .then(response => response.json())
    .then(data => data.currently)
  );
}

var app = document.querySelector('#app');
var cityForm = app.querySelector('.city-form');
var cityInput = cityForm.querySelector('.city-input');
var cityWeather = app.querySelector('.city-weather');
var temp = document.querySelector('.temp');

cityForm.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent the form from submitting


  var city = cityInput.value;
  cityWeather.innerText = "Checking Weather"
  getCoordinatesForCity(city)
  .then(getCurrentWeather)
  .then(function(weather) {
    console.log(weather)
    console.log(typeof weather.temperature)
    if(weather.temperature >= 30){
    temp.innerText = `It's really hot.`
  }
    else if(weather.temperature<29 && weather.temperature>=25){
      temp.innerText = `It's hot.`
    }
    else if(weather.temperature<25 && weather.temperature>=20){
      temp.innerText = `It's kind of hot.`
    }
    else if(weather.temperature<20 && weather.temperature>=15){
      temp.innerText = `It's warm.`
    }
    else if(weather.temperature<15 && weather.temperature>=10){
      temp.innerText = `It's a little chilly.`
    }
    else if(weather.temperature<10 && weather.temperature>=0){
      temp.innerText = `It's cold.`
    }
    else if(weather.temperature<0){
      temp.innerText = `It's cold.`
    }
    cityWeather.innerText = "hello";
  });
});
})(); //IFFE
