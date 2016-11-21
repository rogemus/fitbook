import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchCurrentUserGyms} from '../../../actions/current_user_actions'

import GymCard from '../../common/gymCard';
import UserCard from '../../common/userCard';
import UserMenu from '../../common/userMenu';
import TrainerGyms from '../../common/trainerGyms';

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
                <div className="content">
                    <div className="container-fluid">
                        <h4 className="title">My gyms</h4>
                        <div className="row">

                            {this.props.current_user_gyms.map(gym => {
                                return (
                                    <GymCard key={gym.id} gym={gym}/>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderCurrentUserTrainerGyms() {
        if (this.props.current_user) {
            return (
                <TrainerGyms user={this.props.current_user}/>
            )
        }
    }

    renderCurrentUserMenu() {
        return <UserMenu />
    }

    render() {
        return (
            <div className="">
                {this.renderCurrentUserMenu()}

                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-4 col-md-5">
                                {this.renderCurrentUserCard()}

                                {this.renderCurrentUserTrainerGyms()}
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