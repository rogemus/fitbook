import React from 'react';
import {connect} from 'react-redux';
import {fetchNewestGyms} from '../../actions/gymsActions';
import {fetchNewestPosts} from '../../actions/postActions';

import NewestGyms from '../../components/common/homePage/newestGyms';
import NewestPost from '../../components/common/homePage/newestPosts';
import MobileApps from '../../components/common/homePage/mobileApps';
import FindGyms from '../../components/common/homePage/findGyms';

class HomePage extends React.Component {

	componentDidMount() {
		this.props.fetchNewestGyms();
		this.props.fetchNewestPosts();
	}

	renderNewestGyms() {
		if (this.props.newest_gyms) {
			return <NewestGyms gyms={this.props.newest_gyms.slice(0, 5)}/>;
		}
	}

	renderNewestPosts() {
		if (this.props.newest_posts) {
			return <NewestPost posts={this.props.newest_posts.slice(0, 6)}/>;
		}
	}

	render() {
		return (
			<div className="find-gym">
				<FindGyms/>
				{this.renderNewestPosts()}
				<MobileApps/>
				{this.renderNewestGyms()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		newest_gyms: state.gym.newest_gyms,
		newest_posts: state.posts.newest_posts
	};
}

export default connect(mapStateToProps, {fetchNewestGyms, fetchNewestPosts})(HomePage);