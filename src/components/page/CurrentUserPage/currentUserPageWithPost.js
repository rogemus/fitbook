import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchCurrentUserPosts} from '../../../actions/current_user_actions'

import GymCard from '../../common/gymCard';
import UserCard from '../../common/userCard';
import UserMenu from '../../common/userMenu';
import TrainerGyms from '../../common/trainerGyms';
import PostCard from '../../common/postCard';


class CurrentUserPage extends React.Component {

    componentDidMount() {
        this.props.fetchCurrentUserPosts();
    }

    renderCurrentUserCard() {
        if (this.props.current_user) {
            return (
                <UserCard user={this.props.current_user}/>
            )
        }
    }

    renderCurrentUserPosts() {
        //if (this.props.current_user.posts) {
            return (
                <div className="content">
                    <div className="container-fluid">
                        <h4 className="title">My posts</h4>
                        <div className="row">
                            <PostCard />
                        </div>
                    </div>
                </div>
            );
       // }
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
                                {this.renderCurrentUserPosts()}
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
        current_user_posts: state.current_user.posts
    }
}

export default connect(mapStateToProps, {fetchCurrentUserPosts})(CurrentUserPage);