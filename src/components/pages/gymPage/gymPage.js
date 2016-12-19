import React from 'react';
import {connect} from 'react-redux';
import {
	fetchGym,
	fetchGymComments,
	fetchGymTrainers,
	createGymComment,
	createGymRating
} from '../../../actions/gymsActions';
import {joinGym} from '../../../actions/currentUserActions';
import GymCard from '../../common/cards/gymCard';
import SmallTrainerCard from '../../common/cards/smallTrainerCard';
import GoogleMap from '../../common/googleMap';
import {Link} from 'react-router';

const margin = {
	'margin': '35px 0 15px'
};

class GymPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			commentBody: ''
		};

		this.renderJoinGymButton = this.renderJoinGymButton.bind(this);
		this.onCommentFormSubmit = this.onCommentFormSubmit.bind(this);
		this.onJoinGymFormSubmit = this.onJoinGymFormSubmit.bind(this);
		this.onRatingSelectFormSubmit = this.onRatingSelectFormSubmit.bind(this);
		this.handleCommentBodyChange = this.handleCommentBodyChange.bind(this);
	}

	componentDidMount() {
		this.props.fetchGym(this.props.params.id);
		this.props.fetchGymComments(this.props.params.id);
		this.props.fetchGymTrainers(this.props.params.id);
	}

	handleCommentBodyChange(e) {
		this.setState({
			commentBody: e.target.value
		});
	}

	onRatingSelectFormSubmit(e) {
		e.preventDefault();
		this.props.createGymRating(this.props.params.id, parseInt(this.refs.formRating.ratingSelect.value));
	}

	onCommentFormSubmit(e) {
		e.preventDefault();

		this.props.createGymComment(this.props.params.id, this.state.commentBody);
	}

	onJoinGymFormSubmit(e) {
		e.preventDefault();
		this.props.joinGym(this.props.params.id);
	}

	renderGym() {
		if (this.props.gym) {
			return <GymCard gym={this.props.gym}/>;
		}
	}

	renderJoinGymButton() {
		if (this.props.current_user) {
			if (this.props.current_user.is_trainer) {
				return (
					<div className="card card-join-gym">
						<div className="content">
							<h3>Join gym</h3>
							<form ref="form" onSubmit={this.onJoinGymFormSubmit}>
								<button type="submit" className="btn btn-primary">Become Trainer</button>
							</form>
						</div>
					</div>
				);
			}
		}
	}

	renderMap() {
		if (this.props.gym) {
			return (
				<div className="card">
					<GoogleMap lat={this.props.gym.location.latitude} lon={this.props.gym.location.longitude}/>
					<div className="content">
						<div className="row">
							<div className="col-lg-6">
								<h4>Our address:</h4>
							</div>
							<div className="col-lg-6 text-right">
								<h6 style={margin}>
									{this.props.gym.location.street},&nbsp;
									{this.props.gym.location.city}
								</h6>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}

	renderGymTrainers() {
		if (this.props.gym_trainers) {
			return (
				<div>
					<div>
						<h3>Our Staff</h3>
					</div>
					{this.props.gym_trainers.map((user) => {
						return (
							<div className="col-lg-6">
								<SmallTrainerCard key={user.id} user={user}/>
							</div>
						);
					})}
				</div>
			);
		}
	}

	renderGymCommentForm() {
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


	renderGymRatingForm() {
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

	renderGymRating() {
		if (this.props.gym) {
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
									<p>People voted: {this.props.gym.rating.count}</p>
									<h5>{this.props.gym.rating.rating / this.props.gym.rating.count}</h5>
								</div>
							</div>
						</div>
					</div>
					<div className="card-footer">
						<hr/>
						{this.renderGymRatingForm()}
					</div>
				</div>
			);
		}
	}

	renderGymComment(comment) {
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

	renderComments() {
		if (this.props.gym_comments.length > 0) {
			return (
				<ol className="chat">
					{this.props.gym_comments.map(comment => {
						return this.renderGymComment(comment);
					})}
				</ol>
			);
		} else {
			return <h4>Be first to add comment :)</h4>;
		}
	}

	renderGymComments() {
		if (this.props.gym_comments) {
			return (
				<div className="card card-chat">
					<div className="header">
						<h4 className="title">Comments</h4>
					</div>
					<div className="content">
						{this.renderComments()}
						<hr/>
						<div className="send-message">
							{this.renderGymCommentForm()}
						</div>
					</div>
				</div>
			);
		}
	}

	render() {
		return (
			<div className="">
				<div className="content">
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-12">
								{this.renderGym()}
							</div>
						</div>
						<div className="row">
							<div className="col-lg-4 col-md-6">
								{this.renderJoinGymButton()}
								{this.renderMap()}
								{this.renderGymRating()}
								{this.renderGymComments()}
							</div>
							<div className="col-lg-8 col-md-6">
								{this.renderGymTrainers()}
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
		gym: state.gym.gym,
		gym_comments: state.gym.gym_comments,
		gym_trainers: state.gym.gym_trainers,
		current_user: state.current_user.user
	};
}

export default connect(mapStateToProps, {
	fetchGym,
	joinGym,
	fetchGymComments,
	fetchGymTrainers,
	createGymComment,
	createGymRating
})(GymPage);