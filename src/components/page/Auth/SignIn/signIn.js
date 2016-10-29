import React from 'react';
import {signInUser} from '../../../../actions/auth_actions';
import FacebookLogin from 'react-facebook-login';

import {connect} from 'react-redux';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
    };

    responseFacebook = (response) => {
        this.props.signInUser(response);
    };

    render() {
        return (
            <div>
                <FacebookLogin
                    appId="986848648068958"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                />
            </div>
        )
    }
}
export default connect(null, {signInUser})(SignIn);