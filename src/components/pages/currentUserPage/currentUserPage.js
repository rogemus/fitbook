import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchCurrentUserGyms, becomeTrainer} from '../../../actions/current_user_actions'

import GymCard from '../../common/cards/gymCard';
import UserCard from '../../common/cards/userCard';
import UserMenu from '../../common/userMenu';
import TrainerGyms from '../../common/trainerGyms';

class CurrentUserPage extends React.Component {

	constructor(props) {
		super(props);

		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	componentDidMount() {
		this.props.fetchCurrentUserGyms();
	}

	renderCurrentUserCard() {
		if (this.props.current_user) {
			return (
				<UserCard user={this.props.current_user}/>
			)
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
				)
			}
		}
	}

	renderCurrentUserGyms() {
		if (this.props.current_user_gyms) {
			return (
				<div className="content">
					<div className="container-fluid">
						<h4 className="title">My gyms</h4>
						<div className="row">
							{this.props.current_user_gyms.map(gym => {
								return (
									<GymCard key={gym.id} gym={gym}/>
								);
							})}
						</div>
					</div>
				</div>
			)
		}
	}

	renderCurrentUserTrainerGyms() {
		if (this.props.current_user) {
			return (
				<TrainerGyms user={this.props.current_user}/>
			)
		}
	}

	renderCurrentUserMenu() {
		if (this.props.current_user) {
			return <UserMenu user={this.props.current_user}/>
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
								{this.props.children}
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
		current_user_gyms: state.current_user.gyms
	}
}

export default connect(mapStateToProps, {fetchCurrentUserGyms, becomeTrainer})(CurrentUserPage);