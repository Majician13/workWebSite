const currentDate = new Date();
const month = currentDate.getMonth() + 1;
const currentHour = currentDate.getHours();
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
	new Date().getDay()
];

// SHOW CURRENT DATE MM/DD/YYYY
$('#today').text(month + '/' + currentDate.getDate() + '/' + currentDate.getFullYear());

// FIND CURRENT TIME AND SHOW APPROPRIATE GREETING
if (currentHour < 12) {
	$('#timeOfDay').text('Good Morning');
} else if (currentHour < 18) {
	$('#timeOfDay').text('Good Afternoon');
} else if (currentHour < 6) {
	$('#timeOfDay').text('Good Night');
} else {
	$('#timeOfDay').text('Good Evening');
}

// SHOW DAY OF WEEK
$('#dayOfWeek').text(weekday);

// SHOW WEATHER BASED ON LOCATION
const api = 'eb1f831bf429ebedd8f293d1a515952d';
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');
const tempMax = document.querySelector('#tempMax');
const tempMin = document.querySelector('#tempMin');

window.addEventListener('load', () => {
	let long;
	let lat;

	// Accessing Geolocation of User
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			//Storing Longitude and Latitude in variables
			long = position.coords.longitude;
			lat = position.coords.latitude;
			console.log(long);
			console.log(lat);

			// GET INFO FROM API
			const base =
				'https://api.openweathermap.org/data/2.5/weather?lat=' +
				lat +
				'&lon=' +
				long +
				'&appid=' +
				api;
			console.log(base);

			// FETCH INFO FROM API TO JSON AND GET INFO FROM JSON
			fetch(base)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					console.log(data);
					const { temp, temp_max, temp_min } = data.main;
					const place = data.name;
					const { description, icon } = data.weather[0];
					const { sunrise, sunset } = data.sys;

					const iconUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
					const fahrenheit = (temp - 273.15) * (9 / 5) + 32;
					const tempMaxF = (temp_max - 273.15) * (9 / 5) + 32;
					const tempMinF = (temp_min - 273.15) * (9 / 5) + 32;

					// CONVERTING EPOCH(UNIX) TIME TO GMT
					const sunriseGMT = new Date(sunrise * 1000);
					const sunsetGMT = new Date(sunset * 1000);

					// INTERACTING WITH DOM TO SHOW DATA
					iconImg.src = iconUrl;
					loc.textContent = `${place}`;
					desc.textContent = `${description}`;
					tempF.textContent = `Current temp: ${fahrenheit.toFixed(0)} °F`;
					tempMax.textContent = `High: ${tempMaxF.toFixed(0)} °F`;
					tempMin.textContent = `Low: ${tempMinF.toFixed(0)} °F`;
				});
		});
	}
});

// CLOCK
setInterval(showTime, 15000);
function showTime() {
	let time = new Date();
	let hour = time.getHours();
	let min = time.getMinutes();
	let sec = time.getSeconds();
	var am_pm = 'AM';

	if (hour >= 12) {
		am_pm = 'PM';
	}

	if (hour > 12) {
		hour -= 12;
	}

	if (hour === 0) {
		hour = 12;
		am_pm = 'AM';
	}

	hour = hour < 10 ? '0' + hour : hour;
	min = min < 10 ? '0' + min : min;

	let currentTime = hour + ':' + min + ' ' + am_pm;

	$('#clock').text(currentTime);
}

showTime();
