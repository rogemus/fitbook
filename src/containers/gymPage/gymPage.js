import React from 'react';
import {connect} from 'react-redux';
import {
	fetchGym,
	fetchGymComments,
	fetchGymTrainers
} from '../../actions/gymsActions';

import GymHeader from '../../components/pages/gymPage/gymHeader';
import GymTrainers from '../../components/pages/gymPage/gymTrainers';
import GymContact from '../../components/pages/gymPage/gymContact';
import GymComments from '../../components/common/commentSection';
import GymRating from '../../components/common/ratingSection';

class GymPage extends React.Component {

	componentDidMount() {
		this.props.fetchGym(this.props.params.id);
		this.props.fetchGymComments(this.props.params.id);
		this.props.fetchGymTrainers(this.props.params.id);
	}

	renderGymHeader() {
		if (this.props.gym) {
			return <GymHeader gym={this.props.gym}/>;
		}
	}

	renderGymTrainers() {
		if (this.props.gym_trainers) {
			return <GymTrainers users={this.props.gym_trainers}/>;
		}
	}

	renderGymContact() {
		if (this.props.gym) {
			return <GymContact gym={this.props.gym}/>;
		}
	}

	renderGymRating() {
		if (this.props.gym) {
			return <GymRating type={'gym'} id={this.props.params.id} count={this.props.gym.rating.count}/>;
		}
	}

	renderGymComments() {
		if (this.props.gym_comments) {
			return (
				<GymComments
					type={'gym'}
					id={this.props.params.id}
					comments={this.props.gym_comments}
				/>
			);

		}
	}

	render() {
		return (
			<div>
				{this.renderGymHeader()}
				{this.renderGymTrainers()}
				{this.renderGymContact()}
				{this.renderGymRating()}
				{this.renderGymComments()}
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
	fetchGymComments,
	fetchGymTrainers
})(GymPage);