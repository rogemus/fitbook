import React from 'react';
import {connect} from 'react-redux';
import {signOutUser} from '../../../../actions/auth_actions';

class SignOut extends React.Component {
    componentDidMount() {
        this.props.signOutUser();
    }

    render() {
        return <div>Sorry to see you go...</div>;
    }
}

export default connect(null, {signOutUser})(SignOut);