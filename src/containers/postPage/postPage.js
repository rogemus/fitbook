import React from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../../actions/postActions';
import PostContent from '../../components/common/postPage/postContent';

class PostPage extends React.Component {
	componentDidMount() {
		this.props.fetchPosts(this.props.params.id);
	}

	renderPost() {
		if (this.props.post) {
			return (
				<PostContent post={this.props.post} current_user={this.props.current_user} id={this.props.params.id}/>
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
		post: state.posts.public_post,
		current_user: state.current_user.user
	};
}

export default connect(mapStateToProps, {fetchPosts})(PostPage);