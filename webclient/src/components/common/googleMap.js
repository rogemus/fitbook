import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

export default (props) => {
	return (
		<GoogleMapLoader
			containerElement={ <div style={{height: props.size}}/> }
			googleMapElement={
				<GoogleMap
					defaultZoom={16}
					defaultCenter={{lat: props.lat, lng: props.lon}}
					options={{scrollwheel: false}}
				>
					{props.markers.map((marker) => {
						return (
							<Marker
								{...marker}
							/>
						);
					})}
				</GoogleMap>
			}
		/>
	);
};