import React from 'react';
import {renderGoogleMap} from '../../../helpers/functions';

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
								Come visit us
							</div>
							{renderLocation(gym)}
						</div>
					</div>
					<div className="gyms-contact-map">
						{renderGoogleMap(gym, '600px')}
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