import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../actions/auth_actions';
class SignInButton extends React.Component {

    constructor(props) {
        super(props);
        this.FB = props.fb;
    }

    componentDidMount() {
        this.FB.Event.subscribe('auth.statusChange',
            this.onStatusChange.bind(this));
    }

    onStatusChange(response) {
        console.log(response);
        this.props.signInUser(response);
    }

    render() {
        return (
            <div>
                <div
                    className="fb-login-button"
                    data-max-rows="1"
                    data-size="medium"
                    data-show-faces="false"
                    data-auto-logout-link="false"
                >
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(SignInButton);
