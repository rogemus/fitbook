import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/current_user_actions';

class UserPage extends React.Component {
    componentWillMount() {
        this.props.fetchCurrentUser();
    }

    render() {
        return (
            <div>{this.props.current_user}</div>
        )
    }
}

function mapStateToProps(state) {
    return {current_user: state.user.current_user}
}

export default connect(mapStateToProps, actions)(UserPage);