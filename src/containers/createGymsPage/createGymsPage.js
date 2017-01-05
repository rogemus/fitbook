import React from 'react';
import {connect} from 'react-redux';
import {fetchCurrentUserAvailableGyms} from '../../actions/currentUserActions';
import {createGym} from '../../actions/gymsActions';

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
				<form ref="form" onSubmit={this.onFormSubmit} className="rating-form">
					<label htmlFor="gymSelect">Select Gym</label>
					<select id="gymSelect" name="gymSelect" className="form-control">
						{this.renderOptionGym()}
					</select>
					<button type="submit" className="btn button">Import</button>
				</form>
			);
		} else {
			return (
				<h2>You need to have gym page on your Facebook account to import it :)</h2>
			);
		}
	}

	render() {
		return (
			<div className="full-height">
				<div className="full-height-title">
					<div className="full-height-title-wrapper">
						<div className="import-gym">
							<div className="import-gym-wrapper">
								<div className="import-gym-title">
									<h1>Import gym</h1>
									{this.renderSelectGym()}
								</div>
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
		current_user_available_gyms: state.current_user.available_gyms
	};
}

export default connect(mapStateToProps, {fetchCurrentUserAvailableGyms, createGym})(CreateGymsPage);