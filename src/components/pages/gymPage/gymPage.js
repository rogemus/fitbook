import React from 'react';
import {connect} from 'react-redux';
import {fetchGym, fetchGymComments} from '../../../actions/gymsActions';
import {joinGym} from '../../../actions/currentUserActions';
import GymCard from '../../common/cards/gymCard';

class GymPage extends React.Component {

	constructor(props) {
		super(props);

		this.renderJoinGymButton = this.renderJoinGymButton.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	componentDidMount() {
		this.props.fetchGym(this.props.params.id);
		this.props.fetchGymComments(this.props.params.id);
	}

	renderGym() {
		if (this.props.gym) {
			return <GymCard gym={this.props.gym}/>;
		}
	}

	renderGymComments() {
		if (this.props.gym_comments) {
			console.log(this.props.gym_comments);
		}
	}

	renderJoinGymButton() {
		if (this.props.current_user) {
			if (this.props.current_user.is_trainer) {
				return (
					<div className="card card-join-gym">
						<div className="content">
							<h3>Join gym</h3>

							<form ref="form" onSubmit={this.onFormSubmit}>
								<button type="submit" className="btn btn-primary">Become Trainer</button>
							</form>
						</div>
					</div>
				);
			}
		}
	}

	onFormSubmit(e) {
		e.preventDefault();
		this.props.joinGym(this.props.params.id);
	}

	render() {
		return (
			<div className="content">
				<div className="container-fluid">
					{this.renderJoinGymButton()}

					{this.renderGym()}

					{this.renderGymComments()}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		gym: state.gym.gym,
		gym_comments: state.gym.gym_comments,
		current_user: state.current_user.user
	};
}

export default connect(mapStateToProps, {fetchGym, joinGym, fetchGymComments})(GymPage);