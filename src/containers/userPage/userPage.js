import React from 'react';
import {connect} from 'react-redux';
import UserHeader from '../../components/pages/userPage/userHeader';
import UserPosts from '../../components/pages/userPage/userPosts';
import UserGyms from '../../components/pages/userPage/userGyms';
import UserRating from '../../components/common/ratingSection';
import UserComments from '../../components/common/commentSection';

import {
	fetchUser,
	fetchUserComments,
	fetchUserPosts
} from '../../actions/userActions';

class UserPage extends React.Component {

	componentDidMount() {
		this.props.fetchUser(this.props.params.id);
		this.props.fetchUserComments(this.props.params.id);
		this.props.fetchUserPosts(this.props.params.id);
	}

	componentDidUpdate(prevProps) {
		const oldId = prevProps.params.id;
		const newId = this.props.params.id;

		if (newId !== oldId) {
			this.props.fetchUser(this.props.params.id);
			this.props.fetchUserComments(this.props.params.id);
			this.props.fetchUserPosts(this.props.params.id);
		}
	}

	renderUserHeader() {
		if (this.props.public_user) {
			return <UserHeader user={this.props.public_user}/>;
		}
	}

	renderUserComments() {
		if (this.props.public_user_comments) {
			if (this.props.public_user) {
				if (this.props.public_user.is_trainer === true) {
					return (
						<UserComments
							type={'user'}
							id={this.props.params.id}
							comments={this.props.public_user_comments}
						/>
					);
				}
			}
		}
	}

	renderUserGyms() {
		if (this.props.public_user) {
			if (this.props.public_user.is_trainer === true) {
				return (
					<UserGyms gyms={this.props.public_user.trained_gyms}/>
				);
			}
		}
	}

	renderUserPosts() {
		if (this.props.public_user_posts) {
			if (this.props.public_user) {
				if (this.props.public_user.is_trainer === true) {
					return (
						<UserPosts posts={this.props.public_user_posts.posts}/>
					);
				}
			}
		}
	}

	renderGymRating() {
		if (this.props.public_user) {
			if (this.props.public_user.is_trainer === true) {
				return <UserRating type={'user'} id={this.props.params.id}
								   count={this.props.public_user.rating.count}/>;
			}
		}
	}

	render() {
		return (
			<div>
				{this.renderUserHeader()}
				{this.renderUserGyms()}
				{this.renderUserPosts()}
				{this.renderGymRating()}
				{this.renderUserComments()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		current_user: state.current_user.user,
		public_user: state.public_user.public_user,
		public_user_comments: state.public_user.public_user_comments,
		public_user_posts: state.public_user.public_user_posts
	};
}

export default connect(mapStateToProps, {
	fetchUser,
	fetchUserComments,
	fetchUserPosts
})(UserPage);