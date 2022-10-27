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
