import React from 'react';
import {connect} from 'react-redux';
import {findGyms} from '../../actions/gymsActions';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import _ from 'lodash';

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
		this.handleMarkerClick = this.handleMarkerClick.bind(this);
		this.handleMarkerClose = this.handleMarkerClose.bind(this);
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
		}, 850);
	}

	handleSearchResults() {
		if (this.props.search_result) {
			let fullMarkerArr;

			const userCenter = {
				position: this.state.userPos,
				key: 9999999,
				title: 'You',
				showInfo: true,
				infoContent: (
					<div>You</div>
				)
			};

			const gyms = this.props.search_result.map((gym) => {
				return {
					position: {
						lat: gym.location.latitude,
						lng: gym.location.longitude
					},
					key: gym.id * 2,
					title: gym.name,
					showInfo: false,
					infoContent: (
						<div className="row">
							<div className="col col-2-5">
								<div className="tooltip-img">
									<img src={gym.images.picture}/>
								</div>
							</div>
							<div className="col col-3-5">
								<div>
									<a href={`/gyms/${gym.id}`}>{gym.name}</a>
								</div>
								<div className="tooltip-about">{gym.about}</div>
								<div>{gym.location.street}, {gym.location.city}</div>
							</div>
						</div>
					)
				};
			});

			if (typeof _.find(gyms, userCenter) === 'undefined') {
				fullMarkerArr = _.concat(gyms, userCenter);
			}

			return this.setState({
				markers: fullMarkerArr
			});
		}
	}

	handleMarkerClose(targetMarker) {
		this.setState({
			markers: this.state.markers.map(marker => {
				if (marker === targetMarker) {
					return {
						...marker,
						showInfo: false
					};
				}
				return marker;
			})
		});
	}

	handleMarkerClick(targetMarker) {
		this.setState({
			markers: this.state.markers.map(marker => {
				if (marker === targetMarker) {
					return {
						...marker,
						showInfo: true
					};
				}
				return marker;
			})
		});
	}


	renderMap() {
		if (this.state.center) {
			return (
				<GoogleMapLoader
					containerElement={<div style={{height: '500px'}}/>}
					googleMapElement={
						<GoogleMap
							ref="map"
							defaultZoom={15}
							onIdle={this.handleOnIdle}
							onPlacesChanged={this.handleSearchResults}
							defaultCenter={{lat: this.state.center.lat, lng: this.state.center.lng}}
							options={{scrollwheel: false}}
						>
							{this.state.markers.map((marker, index) => {
								return (
									<Marker
										key={index}
										position={marker.position}
										onClick={() => this.handleMarkerClick(marker)}
									>
										{marker.showInfo && (
											<InfoWindow onCloseClick={() => this.handleMarkerClose(marker)}>
												<div>{marker.infoContent}</div>
											</InfoWindow>
										)}
									</Marker>
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