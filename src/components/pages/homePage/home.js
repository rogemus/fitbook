import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import Geosuggest from 'react-geosuggest';
import {findGyms, fetchNewestGyms} from '../../../actions/gymsActions';
import {fetchNewestPosts} from '../../../actions/postActions';
import SearchResultsCard from '../../common/cards/searchResultsCard';
import SmallGymCard from '../../common/cards/smallGymCard';
import PostCard from '../../common/cards/postCard';

const MARGIN = {
	'margin': '35px 0px'
};

class HomePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			search_result: [],
			location: null
		};

		this.onSuggestSelect = this.onSuggestSelect.bind(this);
		this.renderGymSearchResult = this.renderGymSearchResult.bind(this);
	}

	componentDidMount() {
		this.props.fetchNewestGyms();
		this.props.fetchNewestPosts();
	}

	onSuggestSelect(suggest) {
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

		const viewBox = {
			bottom_right: {
				latitude: location.latitude - deltaLat,
				longitude: location.longitude - deltaLong
			},
			top_left: {
				latitude: location.latitude + deltaLat,
				longitude: location.longitude + deltaLong
			}
		};

		return this.props.findGyms(viewBox);
	}

	renderGymSearchResult() {
		if (this.props.search_result) {
			if (this.props.search_result.length > 0) {
				return (
					<div className="find-gym__result">
						<div className="find-gym__result__title">
							<h1 className="title text-center">Gyms in your area</h1>
						</div>
						<div className="content">
							{this.props.search_result.map(gym => {
								return (
									<SearchResultsCard key={gym.id} gym={gym}/>
								);
							})}
						</div>
					</div>
				);
			} else {
				return (
					<div className="find-gym__result">
						<div className="find-gym__result__title">
							<h1 className="title text-center">Sorry! :(<br/> There are not gyms in this area</h1>
						</div>
					</div>
				);
			}
		}
	}

	renderNewestGyms() {
		if (this.props.newest_gyms) {
			return (
				<div className="row">
					<div style={MARGIN}>
						<div className="content">
							<h1 className="title text-center">Newest gyms</h1>
							{_.shuffle(this.props.newest_gyms).slice(0, 4).map((gym) => {
								return (
									<SmallGymCard key={gym.id} gym={gym}/>
								);
							})}
						</div>
					</div>
				</div>
			);
		}
	}

	renderNewestPosts() {
		if (this.props.newest_posts) {
			return (
				<div className="row">
					<div style={MARGIN}>
						<div className="content">
							<h1 className="title text-center">Newest posts</h1>
							{_.shuffle(this.props.newest_posts).slice(0, 4).map((post) => {
								return (
									<PostCard key={post.id} post={post} colSpan={3}/>
								);
							})}
						</div>
					</div>
				</div>
			);
		}
	}

	render() {
		return (
			<div className="find-gym">
				<div className="find-gym__background">
					<div className="find-gym__title">
						<h1 className="title text-center">Find gyms in your area !</h1>
					</div>

					<Geosuggest
						placeholder="Start typing!"
						country="pl"
						types={['geocode']}
						onSuggestSelect={this.onSuggestSelect}
						location={new google.maps.LatLng()}
						radius="20"/>
				</div>

				{this.renderGymSearchResult()}

				{this.renderNewestPosts()}

				{this.renderNewestGyms()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		search_result: state.gym.search_gyms,
		newest_gyms: state.gym.newest_gyms,
		newest_posts: state.posts.newest_posts
	};
}

export default connect(mapStateToProps, {findGyms, fetchNewestGyms, fetchNewestPosts})(HomePage);