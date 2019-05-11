import React from 'react';
import {GoogleMapLoader, GoogleMap} from 'react-google-maps';


function map(position) {
	return (
		<GoogleMapLoader
			containerElement={ <div style={{height: '500px'}}/> }
			googleMapElement={
				<GoogleMap
					defaultZoom={16}
					defaultCenter={{lat: position.coords.latitude, lng: position.coords.longitude}}
					options={{scrollwheel: false}}
				/>
			}
		/>
	);
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(renderGoogleMap);
	} else {
		console.log('Geolocation is not supported by this browser.');
	}
}

function renderGoogleMap(position) {
	console.log(position);
	return (
		<GoogleMapLoader
			containerElement={ <div style={{height: '500px'}}/> }
			googleMapElement={
				<GoogleMap
					defaultZoom={16}
					defaultCenter={{lat: position.coords.latitude, lng: position.coords.longitude}}
					options={{scrollwheel: false}}
				/>
			}
		/>
	)
}

export default () => {
	return (
		<section>
			dupa
			{getLocation()}
		</section>
	);
};