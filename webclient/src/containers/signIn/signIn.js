import React from 'react';
import {connect} from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import {signInUser} from '../../actions/authActions';

class SignIn extends React.Component {

	responseFacebook = (response) => {
		this.props.signInUser(response);
	};

	render() {
		return (
			<div className="full-height full-height-login-bg">
				<div className="full-height-title full-height-login">
					<div className="full-height-title-wrapper">
						<h1>Login</h1>
					</div>
					<div className="content">
						<FacebookLogin
							appId="986848648068958"
							autoLoad={false}
							fields="name,email,picture"
							callback={this.responseFacebook}
						/>
					</div>
				</div>
			</div>
		);
	}
}
export default connect(null, {signInUser})(SignIn);