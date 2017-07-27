
(function() {

	console.log('wapwap')

	var cityForm = app.querySelector('.city-form');
	var header = app.querySelector('h1')
	var button = cityForm.querySelector('.get-weather-button');
	var main = app.querySelector('.main-app');

	button.addEventListener('click', function(e) {
		console.log("wapwapwap")
		e.preventDefault();

		cityForm.classList.add('fadeOut');
		header.classList.add('fadeOut');

		setTimeout(function(){
			cityForm.classList.add('hide');
			header.classList.add('hide');
		}, 300)

		setTimeout(function() {
			main.classList.remove('hide');
			main.classList.add('fadeIn');
		}, 1000)
	})

})();
