export function renderDate(date) {
	const d = new Date(date);
	const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	return (
		<span>{d.getDay() + 1} {month[d.getMonth()]} {d.getFullYear()}</span>
	);
}

export function renderCover(cover, name) {
	if (cover !== null) {
		return (<img src={cover} alt={name}/>);
	} else {
		return <img src="/img/background.jpg" alt="..."/>;
	}
}

export function calculateViewBox(suggest) {
	const distanceInMeters = 2000;

	const location = {
		latitude: suggest.location.lat,
		longitude: suggest.location.lng
	};

	const latRadian = location.latitude * Math.PI / 180;
	const degLatKm = 110.574235;
	const degLongKm = 110.572833 * Math.cos(latRadian);
	const deltaLat = distanceInMeters / 1000 / degLatKm;
	const deltaLong = distanceInMeters / 1000 / degLongKm;

	return {
		bottom_right: {
			latitude: location.latitude - deltaLat,
			longitude: location.longitude - deltaLong
		},
		top_left: {
			latitude: location.latitude + deltaLat,
			longitude: location.longitude + deltaLong
		}
	};
}


export function isNumber(number) {
	if (isNaN(number)) {
		return 0;
	} else {
		return number;
	}
}

export function renderRating(user) {
	return isNumber(Number((user.rating.rating / user.rating.count).toFixed(1)));
}
