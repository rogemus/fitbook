import React from 'react';
import {connect} from 'react-redux';

import {becomeTrainer} from '../../actions/currentUserActions';
import {joinGym} from '../../actions/gymsActions';

class ActionButton extends React.Component {
	constructor(props) {
		super(props);

		this.onButtonClick = this.onButtonClick.bind(this);
	}

	onButtonClick(e) {
		e.preventDefault();

		switch (this.props.type) {
			case 'user':
				this.props.becomeTrainer();
				break;
			case 'gym':
				this.props.joinGym(this.props.id);
				break;
		}
	}

	renderBtn(user) {
		if (this.props.current_user) {
			switch (this.props.type) {
				case 'user':
					if (user.id === this.props.current_user.id) {
						return (
							<div className="btn">
								<span onClick={this.onButtonClick} className="btn-action">{this.props.title}</span>
							</div>
						);
					}

					break;
				case 'gym':
					if (this.props.current_user.is_trainer === true) {
						return (
							<div className="btn">
								<span onClick={this.onButtonClick} className="btn-action">{this.props.title}</span>
							</div>
						);
					}
					break;
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
		current_user: state.current_user.user
	};
}

export default connect(mapStateToProps, {joinGym, becomeTrainer})(ActionButton);