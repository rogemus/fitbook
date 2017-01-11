import React from 'react';
import {connect} from 'react-redux';

import {becomeTrainer, stopBeingTrainer} from '../../actions/currentUserActions';
import {joinGym, leaveGym} from '../../actions/gymsActions';
import _ from 'lodash';

class ActionButton extends React.Component {
	constructor(props) {
		super(props);

		this.onButtonClick = this.onButtonClick.bind(this);
		this.onButtonClickLeave = this.onButtonClickLeave.bind(this);
		this.onButtonStopClick = this.onButtonStopClick.bind(this);
	}

	onButtonClick(e) {
		e.preventDefault();

		switch (this.props.type) {
			case 'user':
				this.props.becomeTrainer(this.props.id);
				break;
			case 'gym':
				this.props.joinGym(this.props.id);
				break;
		}
	}

	onButtonClickLeave(e) {
		e.preventDefault();
		this.props.leaveGym(this.props.id);
	}

	onButtonStopClick(e) {
		e.preventDefault();

		this.props.stopBeingTrainer(this.props.id);
	}

	isTrainerInGym() {
		const isTrainer = _.find(this.props.gym_trainers, (user) => {
			return user.id === this.props.current_user.id;
		});

		return !isTrainer;
	}

	renderBtn(user) {
		if (this.props.authenticated) {
			if (this.props.current_user) {
				switch (this.props.type) {
					case 'user':
						if (user.id === this.props.current_user.id) {
							if (this.props.current_user.is_trainer !== true) {
								return (
									<div className="btn2">
										<span onClick={this.onButtonClick}
											  className="btn-action">{this.props.title}</span>
									</div>
								);
							} else {
								return (
									<div className="btn2">
										<span onClick={this.onButtonStopClick}
											  className="btn-action">Stop being trainer</span>
									</div>
								);
							}
						}

						break;
					case 'gym':
						if (this.props.current_user.is_trainer === true) {
							if (this.props.gym_trainers) {
								if (this.isTrainerInGym()) {
									return (
										<div className="btn2">
										<span onClick={this.onButtonClick}
											  className="btn-action">{this.props.title}</span>
										</div>
									);
								} else {
									return (
										<div className="btn2">
										<span onClick={this.onButtonClickLeave}
											  className="btn-action">Leave gym</span>
										</div>
									);
								}
							}
						}
						break;
				}
			}
		}
	}

	render() {
		return (
			<div>{this.renderBtn(this.props.user)}</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		current_user: state.current_user.user,
		gym_trainers: state.gym.gym_trainers,
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps, {joinGym, leaveGym, becomeTrainer, stopBeingTrainer})(ActionButton);