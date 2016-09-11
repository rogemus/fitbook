import React from 'react';
import FacebookLoginButton from './signInButton'
import * as actions from '../../../../actions/auth_actions';
import {connect} from 'react-redux';

class Signin extends React.Component {

    render() {
        return (
            <div>
                <div id="fb-root"></div>
                <FacebookLoginButton fb={FB}/>
            </div>
        )
    }
}
export default connect(null, actions)(Signin);