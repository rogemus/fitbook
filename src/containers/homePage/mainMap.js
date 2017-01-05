import React from 'react';
import {connect} from 'react-redux';
import {findGyms} from '../../actions/gymsActions';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

class MainMap extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			center: null,
			content: 'You',
			markers: [],
			map: null,
			bounds: null,
			zoom: 15,
			userPos: null
		};

		this.getLocation = this.getLocation.bind(this);
		this.handleOnIdle = this.handleOnIdle.bind(this);
		this.handleSearchResults = this.handleSearchResults.bind(this);
	}

	getLocation() {
		navigator.geolocation.getCurrentPosition((position) => {
			if (this.isUnmounted) {
				return;
			}
			this.setState({
				center: {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				},
				userPos: {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				}
			});
		}, (reason) => {
			if (this.isUnmounted) {
				return;
			}
			this.setState({
				center: {
					lat: 52.4064,
					lng: 16.9252
				}
			});
		});
	}

	handleOnIdle() {
		const bounds = this.refs.map.getBounds();

		const viewBox = {
			top_left: {
				latitude: bounds.getNorthEast().lat(),
				longitude: bounds.getSouthWest().lng()
			},
			bottom_right: {
				latitude: bounds.getSouthWest().lat(),
				longitude: bounds.getNorthEast().lng()
			}
		};

		this.props.findGyms(viewBox);
		setTimeout(() => {
			this.handleSearchResults();
		}, 500);
	}

	handleSearchResults() {
		if (this.props.search_result) {
			const gyms = this.props.search_result.map((gym) => {
				return {
					position: {
						lat: gym.location.latitude,
						lng: gym.location.longitude
					},
					key: gym.id * 2,
					title: gym.name,
					infoContent: (
						<div>{gym.name}</div>
					)
				};
			});
			return this.setState({
				markers: gyms
			});
		}
	}

	renderMap() {
		if (this.state.center) {
			return (
				<GoogleMapLoader
					containerElement={ <div style={{height: '500px'}}/> }
					googleMapElement={
						<GoogleMap
							ref="map"
							defaultZoom={15}
							onIdle={this.handleOnIdle}
							defaultCenter={{lat: this.state.center.lat, lng: this.state.center.lng}}
							options={{scrollwheel: false}}
						>
							{this.state.markers.map((marker) => {
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
		}
	}


	render() {
		return (
			<div className="main-map">
				{this.getLocation()}
				{this.renderMap()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		search_result: state.gym.search_gyms
	};
}

export default connect(mapStateToProps, {findGyms})(MainMap);