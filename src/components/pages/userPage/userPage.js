import React from 'react';
import {connect} from 'react-redux';
import UserCard from '../../common/cards/userCard';
import PostCard from '../../common/cards/postCard';
import TrainerGyms from '../../common/trainerGyms';
import {Link} from 'react-router';
import {
	fetchUser,
	fetchUserComments,
	createUserComment,
	createRating,
	fetchUserPosts
} from '../../../actions/userActions';

class UserPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			commentBody: ''
		};

		this.onCommentFormSubmit = this.onCommentFormSubmit.bind(this);
		this.handleCommentBodyChange = this.handleCommentBodyChange.bind(this);
		this.onRatingSelectFormSubmit = this.onRatingSelectFormSubmit.bind(this);
	}

	componentDidMount() {
		this.props.fetchUser(this.props.params.id);
		this.props.fetchUserComments(this.props.params.id);
		this.props.fetchUserPosts(this.props.params.id);
	}


	handleCommentBodyChange(e) {
		this.setState({
			commentBody: e.target.value
		});
	}

	onRatingSelectFormSubmit(e) {
		e.preventDefault();
		this.props.createRating(this.props.params.id, parseInt(this.refs.formRating.ratingSelect.value));
	}

	onCommentFormSubmit(e) {
		e.preventDefault();

		this.props.createUserComment(this.props.params.id, this.state.commentBody);
	}

	renderUserCard() {
		if (this.props.public_user) {
			return <UserCard user={this.props.public_user}/>;
		}
	}

	renderCommentForm() {
		return (
			<form ref="form" onSubmit={this.onCommentFormSubmit} className="comment">
				<input
					id="commentBody"
					placeholder="Type here!"
					className="form-control textarea"
					value={this.state.commentBody}
					onChange={this.handleCommentBodyChange}
				/>
				<div className="send-button">
					<button type="submit" className="btn btn-primary btn-fill">Send</button>
				</div>
			</form>
		);
	}

	renderRatingForm() {
		return (
			<form ref="formRating" onSubmit={this.onRatingSelectFormSubmit} className="comment">
				<select name="ratingSelect" className="form-control">
					<option key="5" value="5">5</option>
					<option key="4" value="4">4</option>
					<option key="3" value="3">3</option>
					<option key="2" value="2">2</option>
					<option key="1" value="1">1</option>
				</select>
				<div className="send-button">
					<button type="submit" className="btn btn-primary btn-fill">Send</button>
				</div>
			</form>
		);
	}

	renderNumber(number) {
		if (isNaN(number)) {
			return 0;
		} else {
			return number;
		}
	}

	renderRating() {
		if (this.props.public_user) {
			if (this.props.public_user.is_trainer === true) {
				return (
					<div className="card">
						<div className="content">
							<div className="row">
								<div className="col-xs-5">
									<div className="icon-big icon-danger">
										<p>Rating</p>
										<i className="fa fa-star"></i>
									</div>
								</div>
								<div className="col-xs-7">
									<div className="numbers">
										<p>People voted: {this.props.public_user.rating.count}</p>
										<h5>
											{this.renderNumber(
												Number((this.props.public_user.rating.rating / this.props.public_user.rating.count).toFixed(1))
											)}
										</h5>
									</div>
								</div>
							</div>
						</div>
						<div className="card-footer">
							<hr/>
							{this.renderRatingForm()}
						</div>
					</div>
				);
			}
		}
	}

	renderComment(comment) {
		return (
			<li key={comment.id} className="other">
				<div className="avatar">
					<Link to={`/users/${comment.author.id}`}>
						<img src={comment.author.images.picture} alt="crash"/>
					</Link>
				</div>
				<div className="msg">
					<p>
						{comment.body}
					</p>
					<div className="card-footer">
						<h6>{comment.created_at}</h6>
					</div>
				</div>
			</li>
		);
	}

	renderUserComments() {
		if (this.props.public_user_comments) {
			if (this.props.public_user) {
				if (this.props.public_user.is_trainer === true) {
					return (
						<div className="card card-chat">
							<div className="header">
								<h4 className="title">Comments</h4>
							</div>
							<div className="content">
								<ol className="chat">
									{this.props.public_user_comments.map(comment => {
										return this.renderComment(comment);
									})}
								</ol>
								<hr/>
								<div className="send-message">
									{this.renderCommentForm()}
								</div>
							</div>
						</div>
					);
				}
			}
		}
	}

	renderUserPosts() {
		if (this.props.public_user_posts) {
			if (this.props.public_user) {
				if (this.props.public_user.is_trainer === true && this.props.public_user_posts.posts.length > 0) {
					return (
						<div>
							{this.props.public_user_posts.posts.reverse().map(post => {
								return <PostCard key={post.id} post={post}/>;
							})}
						</div>
					);
				} else if (this.props.public_user.is_trainer === true && this.props.public_user_posts.posts.length <= 0) {
					return (
						<div className="text-center">
							<h1>Sorry this user don't have any posts yet. Please come later.</h1>
						</div>
					);
				}
			}
		}
	}

	renderUserGyms() {
		if (this.props.public_user) {
			if (this.props.public_user.trained_gyms > 0) {
				return (
					<div className="card">
						<div className="header">
							<h4 className="title">Whare you can find me: </h4>
							<div className="content">
								<ul className="list-unstyled team-members">
									{this.props.public_user.trained_gyms.map((gym) => {
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

	render() {
		return (
			<div className="">
				<div className="content">
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-4 col-md-5">
								{this.renderUserCard()}
								{this.renderUserGyms()}
								{this.renderRating()}
								{this.renderUserComments()}
							</div>
							<div className="col-lg-8 col-md-7">
								{this.renderUserPosts()}
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
		public_user: state.public_user.public_user,
		public_user_comments: state.public_user.public_user_comments,
		public_user_posts: state.public_user.public_user_posts
	};
}

export default connect(mapStateToProps, {
	fetchUser,
	fetchUserComments,
	fetchUserPosts,
	createUserComment,
	createRating
})(UserPage);