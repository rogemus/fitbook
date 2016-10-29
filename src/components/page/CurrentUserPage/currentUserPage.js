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
            return this.props.current_user_gyms.map(gym => {
                return (
                    <span key={gym.id}>{gym.name}</span>
                );
            });
        }
    }

    render() {
        return (
            <div>
                <div><h1>User info</h1>
                    {this.renderCurrentUserCard()}
                </div>
                <div>
                    <h2>User Gyms</h2>
                    {this.renderCurrentUserGyms()}
                </div>
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