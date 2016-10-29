import React from 'react';
import {connect} from 'react-redux';
import {fetchCurrentUserGyms} from '../../../actions/current_user_actions'
class CurrentUserPage extends React.Component {

    componentWillMount() {
        this.props.fetchCurrentUserGyms();
    }

    renderCurrentUserCard() {
        if (this.props.current_user) {
            return (
                <div>
                    <div>{this.props.current_user.name}</div>
                    <div>{this.props.current_user.email}</div>
                </div>
            )
        }
    }

    renderCurrentUserGyms() {
        if (this.props.current_user_gyms) {
            console.log(this.props.current_user_gyms);
        }
    }

    render() {
        return (
            <div>
                {this.renderCurrentUserCard()}
                {this.renderCurrentUserGyms()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        current_user: state.current_user.user,
        current_user_gyms: state.current_user.gyms
    }
}

export default connect(mapStateToProps, {fetchCurrentUserGyms})(CurrentUserPage);