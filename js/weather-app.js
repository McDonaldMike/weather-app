(function() {
	var DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
	var DARKSKY_API_KEY = '68ae7d38fb51db27bc7d79139fe20b2a';
	var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

	var GOOGLE_MAPS_API_KEY = 'AIzaSyApuWuU8zo2iT8ExAHbGRJU_1pQkJBt71Q';
	var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

	// This function returns a promise that will resolve with an object of lat/lng coordinates
	function getCoordinatesForCity(cityName) {
		var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;

		return (fetch(url). // Returns a promise for a Response
				then(response => response.json()). // Returns a promise for the parsed JSON
				then(data => data.results[0].geometry.location) // Transform the response to only take what we need
		);
	}

	function getCurrentWeather(coords) {
		var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}?units=si&exclude=minutely,hourly,daily,alerts,flags`;
		return (fetch(url).then(response => response.json()).then(data => data.currently));
	}

	var app = document.querySelector('#app');
	var cityForm = app.querySelector('.city-form');
	var button = app.querySelector('.get-weather-button')
	var cityInput = cityForm.querySelector('.city-input');
	var cityWeather = app.querySelector('.city-weather');
	var temp = document.querySelector('.temp');
	var clouds = app.querySelector('.clouds');
	var icon = app.querySelector('.icon')
	button.addEventListener('click', function(event) {
		event.preventDefault(); // prevent the form from submitting

		var city = cityInput.value;
		cityWeather.innerText = "Checking Weather"

		getCoordinatesForCity(city).then(getCurrentWeather).then(function(weather) {
			cityWeather.innerText = "";

			//Icons
			if (weather.icon === "clear-day") {
				icon.setAttribute('src', 'rns-weather-icons/SVG/weather_icons-15.svg')
			} else if (weather.icon === "clear-night") {
				icon.setAttribute('src', 'rns-weather-icons/SVG/weather_icons-05.svg')
			} else if (weather.icon === "rain") {
				icon.setAttribute('src', 'rns-weather-icons/SVG/weather_icons-14.svg')
			} else if (weather.icon === "snow") {
				icon.setAttribute('src', 'rns-weather-icons/SVG/weather_icons-41.svg')
			} else if (weather.icon === "sleet") {
				icon.setAttribute('src', 'rns-weather-icons/SVG/weather_icons-51.svg')
			} else if (weather.icon === "wind") {
				icon.setAttribute('src', 'rns-weather-icons/SVG/weather_icons-66.svg')
			} else if (weather.icon === "fog") {
				icon.setAttribute('src', 'rns-weather-icons/SVG/weather_icons-39.svg')
			} else if (weather.icon === "cloudy") {
				icon.setAttribute('src', 'rns-weather-icons/SVG/weather_icons-16.svg')
			} else if (weather.icon === "partly-cloudy-day") {
				icon.setAttribute('src', 'rns-weather-icons/SVG/weather_icons-17.svg')
			} else if (weather.icon === "partly-cloudy-night") {
				icon.setAttribute('src', 'rns-weather-icons/SVG/weather_icons-18.svg')
			}

			//Temperature
			if (weather.temperature >= 41) {
				cityWeather.innerText += `For the love of God stay inside `;
			} else if (weather.temperature < 40 && weather.temperature >= 30) {
				cityWeather.innerText += `It's really hot `;
			} else if (weather.temperature < 30 && weather.temperature >= 25) {
				cityWeather.innerText += `It's hot `;
			} else if (weather.temperature < 25 && weather.temperature >= 20) {
				cityWeather.innerText += `It's kind of hot `;
			} else if (weather.temperature < 20 && weather.temperature >= 15) {
				cityWeather.innerText += `It's warm `;
			} else if (weather.temperature < 15 && weather.temperature >= 10) {
				cityWeather.innerText += `It's a little chilly, you probably want a jacket `;
			} else if (weather.temperature < 10 && weather.temperature >= 0) {
				cityWeather.innerText += `It's cold `;
			} else if (weather.temperature < 0 && weather.temperature >= -10) {
				cityWeather.innerText += `It's literally freezing `;
			} else if (weather.temperature < -10 && weather.temperature >= -20) {
				cityWeather.innerText += `It's way too cold `
			} else if (weather.temperature < -20) {
				cityWeather.innerText += `You live on Hoth `
			}

			//Humidity
			//Summary
			if (weather.summary === "Clear" || weather.summary === "Partly Cloudy" || weather.summary === "Mostly Cloudy") {
				cityWeather.innerText += ` and the skies are ` + weather.summary.toLowerCase()
			} else if (weather.summary === "Rain" || weather.summary === "Snow") {
				cityWeather.innerText += ` and it's ` + weather.summary.toLowerCase() + "ing";
			} else if (weather.summary === "Overcast" || weather.summary === "Dry") {
				cityWeather.innerText += ` and it's ` + weather.summary.toLowerCase();
			} else if (weather.summary === "Drizzle") {
				cityWeather.innerText += ` and it's ` + weather.summary.toLowerCase() + "y";
			} else if (weather.summary === "Light Rain") {
				cityWeather.innerText += ` and it's raining a little.`;
			} else {
				cityWeather.innerText = ``;
			}

			//Background color automation
			var colorObj = {
				1: '#B4FFA2',
				2: '#B4FFA2',
				3: '#FFF09D',
				4: '#FFF09D',
				5: '#FFF09D',
				6: '#FFC3A0',
				7: '#FFC3A0',
				8: '#FFC3A0',
				8: '#FFA09D',
				9: '#FFA09D',
				10: '#FDB0F8',
				11: '#FDB0F8'
			}

			var body = document.querySelector('body');

			body.style.background = colorObj[weather.uvIndex];

		});
	});
	function initialize() {

		var input = document.getElementById('searchTextField');
		var autocomplete = new google.maps.places.Autocomplete(input);
	}

	google.maps.event.addDomListener(window, 'load', initialize);
})(); //IFFE
