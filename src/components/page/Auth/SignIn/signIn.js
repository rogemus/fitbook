import React from 'react';
import * as actions from '../../../../actions/auth_actions';
import FacebookLogin from 'react-facebook-login';

import {connect} from 'react-redux';

class Signin extends React.Component {

    constructor(props) {
        super(props);
    };

    responseFacebook = (response) => {
        console.log(response);
        this.props.signInUserv2(response);
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
export default connect(null, actions)(Signin);