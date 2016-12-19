import React from 'react';
import {connect} from 'react-redux';
import {signOutUser} from '../../../../actions/authActions';

const FONT = {
	'fontSize': '5em'
};

const FONT2 = {
	'fontSize': '3em'
};

class SignOut extends React.Component {
	componentDidMount() {
		this.props.signOutUser();
	}

	render() {
		return (
			<div className="text-center">
				<h1 style={FONT}>Sorry to see you go... :(</h1>

				<h2 style={FONT2}>Come back later :)</h2>
			</div>
		);
	}
}

export default connect(null, {signOutUser})(SignOut);