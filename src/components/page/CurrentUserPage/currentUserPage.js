import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchCurrentUserGyms} from '../../../actions/current_user_actions'
import GymCard from '../../common/gymCard';
import UserCard from '../../common/userCard';

const marginTop = {
    margin: "50px 0"
};


class CurrentUserPage extends React.Component {

    componentDidMount() {
        this.props.fetchCurrentUserGyms();
    }

    renderCurrentUserCard() {
        if (this.props.current_user) {
            return (
                <UserCard user={this.props.current_user}/>
            )
        }
    }

    renderCurrentUserGyms() {
        if (this.props.current_user_gyms) {
            return (
                <div>
                    <h4 className="title">My gyms</h4>
                    {this.props.current_user_gyms.map(gym => {
                        return (
                            <GymCard key={gym.id} gym={gym}/>
                        );
                    })}
                </div>
            )
        }
    }

    render() {
        return (
            <div style={marginTop}>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-4 col-md-5">
                                {this.renderCurrentUserCard()}
                            </div>
                            <div className="col-lg-8 col-md-7">
                                {this.renderCurrentUserGyms()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        current_user: state.current_user.user,
        current_user_gyms: state.current_user.gyms
    }
}

export default connect(mapStateToProps, {fetchCurrentUserGyms})(CurrentUserPage);