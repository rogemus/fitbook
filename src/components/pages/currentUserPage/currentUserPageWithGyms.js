import React from 'react';
import {connect} from 'react-redux';
import {fetchCurrentUserGyms, becomeTrainer} from '../../../actions/current_user_actions'

import GymCard from '../../common/cards/gymCard';
import UserCard from '../../common/cards/userCard';


class CurrentUserPage extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchCurrentUserGyms();
	}

	renderCurrentUserCard() {
		if (this.props.current_user) {
			return <UserCard user={this.props.current_user}/>
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

	render() {
		return (
			<div>
				{this.renderCurrentUserGyms()}
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