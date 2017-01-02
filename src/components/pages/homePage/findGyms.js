import React from 'react';
import {connect} from 'react-redux';
import Geosuggest from 'react-geosuggest';
import {findGyms} from '../../../actions/gymsActions';
import {calculateViewBox} from '../../../helpers/functions';
import SearchResults from './searchResults';

class FindGyms extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			search_result: [],
			location: null
		};

		this.onSuggestSelect = this.onSuggestSelect.bind(this);
		this.renderGymSearchResult = this.renderGymSearchResult.bind(this);
	}

	onSuggestSelect(suggest) {
		const viewBox = calculateViewBox(suggest);

		return this.props.findGyms(viewBox);
	}

	renderGymSearchResult() {
		if (this.props.search_result) {
			if (this.props.search_result.length > 0) {
				return <SearchResults gyms={this.props.search_result}/>;
			} else {
				return (
					<section className="search-results">
						<div className="search-results-title">
							<h1>Sorry! :(<br/> There are not gyms in this area</h1>
						</div>
					</section>
				);
			}
		}
	}

	render() {
		return (
			<div>
				<section className="find-gyms">
					<div className="find-gyms-wrapper">
						<div className="find-gyms-content">
							<div className="find-gyms-title">
								<h1>Find gyms in your area !</h1>
							</div>
							<div className="find-gyms-subtitle">
								<h2>some gyms maybe closer then you think</h2>
							</div>
							<Geosuggest
								placeholder="Start typing!"
								country="pl"
								types={['geocode']}
								onSuggestSelect={this.onSuggestSelect}
								location={new google.maps.LatLng()}
								radius="20"/>
						</div>
					</div>
				</section>
				{this.renderGymSearchResult()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		search_result: state.gym.search_gyms
	};
}

export default connect(mapStateToProps, {findGyms})(FindGyms);