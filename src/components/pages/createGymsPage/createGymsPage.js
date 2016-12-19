import React from 'react';
import {connect} from 'react-redux';
import {fetchCurrentUserAvailableGyms, createGym} from '../../../actions/currentUserActions';

class CreateGymsPage extends React.Component {

	constructor(props) {
		super(props);

		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	componentDidMount() {
		this.props.fetchCurrentUserAvailableGyms();
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.props.createGym(parseInt(this.refs.form.gymSelect.value));
	}

	renderOptionGym() {
		return (this.props.current_user_available_gyms.map(gym => {
			return (<option key={gym.id} value={gym.id}>{gym.name}</option>);
		}));
	}

	renderSelectGym() {
		if (this.props.current_user_available_gyms) {
			return (
				<form ref="form" onSubmit={this.onFormSubmit} className="input-group">
					<select name="gymSelect" className="form-control">
						{this.renderOptionGym()}
					</select>
					<button type="submit" className="btn btn-primary">Create</button>
				</form>
			);
		} else {
			return (
				<div className="text-center">
					<h2>You need to have gym page on your Facebook account to import it :)</h2>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				{this.renderSelectGym()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		current_user: state.current_user.user,
		current_user_available_gyms: state.current_user.available_gyms
	};
}

export default connect(mapStateToProps, {fetchCurrentUserAvailableGyms, createGym})(CreateGymsPage);