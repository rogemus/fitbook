import React from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../../actions/postActions';
import PostContent from '../../components/pages/postPage/postContent';

class HomePage extends React.Component {
	componentDidMount() {
		this.props.fetchPosts(this.props.params.id);
	}

	renderPost() {
		if (this.props.post) {
			return (
				<PostContent post={this.props.post}/>
			);
		}
	}

	render() {
		return (
			<div>
				{this.renderPost()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		post: state.posts.public_post
	};
}

export default connect(mapStateToProps, {fetchPosts})(HomePage);