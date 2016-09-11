import React, {Component} from 'react';
import FacebookLoginButton from './signInButton'
import * as actions from '../../../../actions';
import {connect} from 'react-redux';

class Signin extends Component {
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