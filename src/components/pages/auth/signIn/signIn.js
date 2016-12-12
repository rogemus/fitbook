import React from 'react';
import {connect} from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import {signInUser} from '../../../../actions/authActions';

class SignIn extends React.Component {

	responseFacebook = (response) => {
		this.props.signInUser(response);
	};

	render() {
		return (
			<div className="full-page login-page">
				<div className="container">
					<div className="row">
						<div className="center">
							<div className="card">
								<FacebookLogin
									appId="986848648068958"
									autoLoad={false}
									fields="name,email,picture"
									callback={this.responseFacebook}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default connect(null, {signInUser})(SignIn);