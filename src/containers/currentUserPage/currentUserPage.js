import React from 'react';
import {connect} from 'react-redux';
import UserCard from '../../components/common/cards/userCard';
import UserMenu from '../../components/pages/currentUserPage/userMenu';
import TrainerGyms from '../../components/pages/currentUserPage/trainerGyms';
import PostCard from '../../components/common/cards/widePostCard';
import {fetchCurrentUserPosts} from '../../actions/currentUserActions';
import {fetchCurrentUserGyms, becomeTrainer} from '../../actions/currentUserActions';

class CurrentUserPage extends React.Component {

	constructor(props) {
		super(props);

		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	componentDidMount() {
		this.props.fetchCurrentUserGyms();
		this.props.fetchCurrentUserPosts();
	}

	renderCurrentUserCard() {
		if (this.props.current_user) {
			return <UserCard user={this.props.current_user}/>;
		}
	}

	renderBecomeTrainerButton() {
		if (this.props.current_user) {
			if (!this.props.current_user.is_trainer) {
				return (
					<div className="card card-become-trainer">
						<div className="content">
							<h2>Become Trainer :D</h2>

							<form ref="form" onSubmit={this.onFormSubmit}>
								<button type="submit" className="btn btn-primary">Become Trainer</button>
							</form>
						</div>
					</div>
				);
			}
		}
	}

	renderCurrentUserPosts() {
		if (this.props.current_user_posts) {
			if (this.props.current_user_posts.length > 0) {
				return (
					<div className="content">
						<div className="container-fluid">
							<h4 className="title">My posts</h4>
							<div className="row">
								{this.props.current_user_posts.reverse().map(post => {
									return <PostCard key={post.id} post={post} colSpan={6}/>;
								})}
							</div>
						</div>
					</div>
				);
			} else {
				return (
					<div className="content">
						<div className="container-fluid">
							<h4 className="title">My posts</h4>
							<div className="row">
								<h4 className="title">You don't have post, please add one.</h4>
							</div>
						</div>
					</div>
				);
			}
		}
	}

	renderCurrentUserTrainerGyms() {
		if (this.props.current_user_gyms) {
			if (this.props.current_user_gyms.length > 0) {
				return (
					<div className="card">
						<div className="header">
							<h4 className="title">Whare you can find me: </h4>
							<div className="content">
								<ul className="list-unstyled team-members">
									{this.props.current_user_gyms.map((gym) => {
										return <TrainerGyms key={gym.id} gym={gym}/>;
									})}
								</ul>
							</div>
						</div>
					</div>
				);
			} else {
				return (
					<div className="card">
						<div className="header">
							<h4 className="title">Whare you can find me: </h4>
							<div className="content">
								<ul className="list-unstyled team-members">
									<li>
										<div className="row">
										<span className="text-muted">
											I don't have job :)
										</span>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				);
			}
		}
	}

	renderCurrentUserMenu() {
		if (this.props.current_user) {
			return <UserMenu user={this.props.current_user}/>;
		}
	}

	onFormSubmit(e) {
		e.preventDefault();
		this.props.becomeTrainer();
	}

	render() {
		return (
			<div className="">
				{this.renderCurrentUserMenu()}
				<div className="content">
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-4 col-md-5">
								{this.renderCurrentUserCard()}
								{this.renderBecomeTrainerButton()}
								{this.renderCurrentUserTrainerGyms()}
							</div>
							<div className="col-lg-8 col-md-7">
								{this.renderCurrentUserPosts()}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		current_user: state.current_user.user,
		current_user_gyms: state.current_user.gyms,
		current_user_posts: state.current_user.posts
	};
}

export default connect(mapStateToProps, {fetchCurrentUserGyms, fetchCurrentUserPosts, becomeTrainer})(CurrentUserPage);