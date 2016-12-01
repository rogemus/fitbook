import React from 'react';
import {GoogleMapLoader, GoogleMap} from 'react-google-maps';

export default (props) => {
    return (
        <GoogleMapLoader
            containerElement={ <div style={{height: '300px'}} /> }
            googleMapElement={
                <GoogleMap defaultZoom={16} defaultCenter={{lat: props.lat, lng: props.lon}} />
            }
        />
    );
}