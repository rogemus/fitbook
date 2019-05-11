import React from 'react';
import {connect} from 'react-redux';
import {signOutUser} from '../../actions/authActions';

class SignOut extends React.Component {
	componentDidMount() {
		this.props.signOutUser();
	}

	render() {
		return (
			<div className="full-height">
				<div className="full-height-title">
					<div className="full-height-title-wrapper">
						<h1>Sorry to see you go... :(</h1>
						<h2>Come back later :)</h2>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, {signOutUser})(SignOut);