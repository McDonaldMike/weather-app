(function() {

var DS_KEY = 'bdc49c149699474b183318c850b6be17';
var DS_URL = `https://api.darksky.net/forecast/${DS_KEY}`;

var GM_KEY = 'AIzaSyCYoqRXMcbAdX2YKyTljZ4j4vNs59KKVZo'
var GM_URL = `https://maps.googleapis.com/maps/api/geocode/json`


var CORS = `https://cors-anywhere.herokuapp.com`


//CODE

function getCoordinatesForCity(cityName) {
var url = `${GM_URL}?address=${cityName}&key=${GM_KEY}`;

return (fetch(url)
        .then(response => response.json())
        .then(data => data.results[0].geometry.location)
      );
}


// getCoordinatesForCity("montreal").then(console.log)

function getCurrentWeather(coords) {
  // Template string again! I hope you can see how nicer this is :)
  var url = `${CORS}/${DS_URL}/${coords.lat},${coords.lng}?units=si&exclude=minutely,hourly,daily,alerts,flags`;

  return (
    fetch(url)
    .then(response => response.json())
    .then(data => {
		console.log(data, "this is it BABY!!")
		return data.currently
	})
  );
}

//DOM WRITING

var app = document.querySelector('#app');
var cityForm = app.querySelector('.city-form');
var cityInput = cityForm.querySelector('.city-input');
var cityWeather = app.querySelector('.city-weather');

cityForm.addEventListener('submit', function(event) { // this line changes
  event.preventDefault(); // prevent the form from submitting

  // This code doesn't change!
  var city = cityInput.value;


  cityWeather.innerText = "loading..."

  getCoordinatesForCity(city)
  .then(getCurrentWeather)
  .then(function(weather) {
    cityWeather.innerText = 'Current temperature: ' + weather.temperature;
  });
});

})(); //IFFE
