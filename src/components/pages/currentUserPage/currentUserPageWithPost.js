import React from 'react';
import {connect} from 'react-redux';
import UserCard from '../../common/cards/userCard';
import PostCard from '../../common/cards/postCard';
import {fetchCurrentUserPosts} from '../../../actions/currentUserActions';

class CurrentUserPage extends React.Component {

	componentDidMount() {
		this.props.fetchCurrentUserPosts();
	}

	renderCurrentUserCard() {
		if (this.props.current_user) {
			return <UserCard user={this.props.current_user}/>;
		}
	}

	renderCurrentUserPosts() {
		if (this.props.current_user_posts) {
			return (
				<div className="content">
					<div className="container-fluid">
						<h4 className="title">My posts</h4>
						<div className="row">
							{this.props.current_user_posts.reverse().map(post => {
								return <PostCard key={post.id} post={post}/>;
							})}
						</div>
					</div>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				{this.renderCurrentUserPosts()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		current_user: state.current_user.user,
		current_user_posts: state.current_user.posts
	};
}

export default connect(mapStateToProps, {fetchCurrentUserPosts})(CurrentUserPage);