import React from 'react';
import {connect} from 'react-redux';
import {findGyms} from '../../actions/gymsActions';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow, SearchBox} from 'react-google-maps';
import {setCenter, setBounds, setMarkers} from '../../actions/mapActions';

const INPUT_STYLE = {
	border: '1px solid transparent',
	borderRadius: '1px',
	boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
	boxSizing: 'border-box',
	MozBoxSizing: 'border-box',
	fontSize: '14px',
	height: '32px',
	marginTop: '27px',
	outline: 'none',
	padding: '0 12px',
	textOverflow: 'ellipses',
	width: '400px'
};

class MainMap extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			center: null,
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
		this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
		this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
		this.processGeolocation = this.processGeolocation.bind(this);
		this.geolocationError = this.geolocationError.bind(this);
	}

	componentDidMount() {
		this.getLocation();
	}

	processGeolocation(position) {
		const userPos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};

		this.setState({
			center: {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			},
			userPos: userPos
		});

		this.props.setCenter(userPos);
	}

	geolocationError(reason) {
		const userPos = {
			lat: 52.4064,
			lng: 16.9252
		};

		this.setState({
			center: {
				lat: 52.4064,
				lng: 16.9252
			},
			userPos: {
				lat: 52.4064,
				lng: 16.9252
			}
		});

		this.props.setCenter(userPos);
	}

	getLocation() {
		const options = {
			enableHighAccuracy: true,
			maximumAge: 0,
			timeout: Infinity
		};

		navigator.geolocation.getCurrentPosition(this.processGeolocation, this.geolocationError, options);
	}


	handleOnIdle() {
		const bounds = this.state.bounds;

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

			const img = 'https://cdn4.iconfinder.com/data/icons/dot/256/man_person_mens_room.png';

			const userCenter = {
				position: this.props.center,
				key: 9999999,
				title: 'You',
				showInfo: true,
				icon: img,
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
						<div className="tooltip">
							<div className="row">
								<div className="col col-2-5">
									<div className="tooltip-img">
										<img src={gym.images.picture}/>
									</div>
								</div>
								<div className="col col-3-5">
									<div className="tooltip-title">
										<a href={`/gyms/${gym.id}`}>{gym.name}</a>
									</div>
									<div className="tooltip-about">{gym.about}</div>
									<div>{gym.location.street}, {gym.location.city}</div>
								</div>
							</div>
						</div>
					)
				};
			});

			if (!gyms.includes(userCenter)) {
				fullMarkerArr = gyms.concat(userCenter);
				this.props.setMarkers(fullMarkerArr);
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

	handlePlacesChanged() {
		const places = this.refs.searchBox.getPlaces();

		const markers = places.map(place => ({
			position: place.geometry.location
		}));

		let mapCenter;

		if (this.state.center) {
			mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
		} else {
			mapCenter = markers.length > 0 ? markers[0].position : this.props.center;
		}


		this.setState({
			center: {
				lat: mapCenter.lat(),
				lng: mapCenter.lng()
			},
			userPos: {
				lat: mapCenter.lat(),
				lng: mapCenter.lng()
			}
		});

		this.props.setCenter(mapCenter);
		this.refs.map.panTo(mapCenter);
	}

	handleBoundsChanged() {
		if (this.refs.map.getBounds()) {
			this.setState({
				bounds: this.refs.map.getBounds()
			});
			this.props.setBounds(this.refs.map.getBounds());
		}

	}

	renderMap() {
		if (this.state.center || this.props.center) {
			let mapCenter;
			if (this.state.center) {
				mapCenter = this.state.center;
			} else {
				mapCenter = this.props.center;
			}

			return (
				<GoogleMapLoader
					containerElement={<div style={{height: '500px'}}/>}
					googleMapElement={
						<GoogleMap
							ref="map"
							defaultZoom={13}
							onIdle={this.handleOnIdle}
							onBoundsChanged={this.handleBoundsChanged}
							defaultCenter={{lat: mapCenter.lat, lng: mapCenter.lng}}
							options={{scrollwheel: false}}
						>
							<SearchBox
								ref="searchBox"
								bounds={this.state.bounds}
								controlPosition={google.maps.ControlPosition.TOP_CENTER}
								onPlacesChanged={this.handlePlacesChanged}
								placeholder="Search"
								style={INPUT_STYLE}
							/>

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
				{this.renderMap()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		search_result: state.gym.search_gyms,
		center: state.maps.center,
		bounds: state.maps.bounds
	};
}

export default connect(mapStateToProps, {findGyms, setCenter, setBounds, setMarkers})(MainMap);