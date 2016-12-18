import React from 'react';
import {connect} from 'react-redux';
import UserCard from '../../common/cards/userCard';
import {fetchUser} from '../../../actions/userActions';

class CurrentUserPage extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchUser(this.props.params.id);
	}

	renderUserCard() {
		if (this.props.public_user) {
			return <UserCard user={this.props.public_user}/>;
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
							</div>
							<div className="col-lg-8 col-md-7">
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
		public_user: state.public_user.public_user
	};
}

export default connect(mapStateToProps, {fetchUser})(CurrentUserPage);