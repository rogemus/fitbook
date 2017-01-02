import React from 'react';
import GoogleMap from '../../common/googleMap';

function renderGoogleMap(gym) {
	const markers = [{
		position: {
			lat: gym.location.latitude,
			lng: gym.location.longitude
		},
		key: gym.location.street
	}];

	return <GoogleMap lat={gym.location.latitude} lon={gym.location.longitude} markers={markers}/>;
}

function renderLocation(gym) {
	return (
		<div className="gyms-contact-location-address">
			{gym.location.street}<br />
			{gym.location.city}
		</div>
	);
}

function renderContact(gym) {
	if (gym.location !== null && gym.location !== undefined) {
		return (
			<section className="gyms-contact">
				<div className="gyms-contact-wrapper">
					<div className="gyms-contact-location">
						<div className="gyms-contact-location-wrapper">
							<div className="gyms-contact-location-title">
								Come visit as
							</div>
							{renderLocation(gym)}
						</div>
					</div>
					<div className="gyms-contact-map">
						{renderGoogleMap(gym)}
					</div>
				</div>
			</section>
		);
	} else {
		return <div></div>;
	}
}

export default ({gym}) => {
	return renderContact(gym);
};