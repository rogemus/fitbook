import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchCurrentUser} from '../../actions/current_user_actions';

class Sidebar extends React.Component {

    componentWillMount() {
        if (this.props.authenticated) {
            this.props.fetchCurrentUser();
        }
    }

    renderCurrentUserName() {
        if (this.props.current_user) {
            return this.props.current_user.name;
        }
    }

    renderUser() {
        if (this.props.current_user && this.props.authenticated) {
            return (
                <div className="user">
                    <div className="photo">
                        <Link to="/me">
                            <img src="assets/img/faces/face-2.jpg"/>
                        </Link>
                    </div>
                    <div className="info" key={1}>
                        <Link to="/me">{this.renderCurrentUserName()}</Link>
                    </div>
                </div>
            )
        }
    }

    renderLinks() {
        if (this.props.authenticated) {
            return [
                <li key={1}>
                    <Link to="/">
                        <i className="fa fa-home"></i>
                        <p>Home</p>
                    </Link>
                </li>,
                <li key={2}>
                    <Link to="/creategym">
                        <i className="fa fa-plus"></i>
                        <p>Create Gym</p>
                    </Link>
                </li>,
                <li key={3}>
                    <Link to="/signout">
                        <i className="fa fa-sign-out"></i>
                        <p>Sign Out</p>
                    </Link>
                </li>
            ]
        } else {
            return [
                <li key={1}>
                    <Link to="/">
                        <i className="fa fa-home"></i>
                        <p>Home</p>
                    </Link>
                </li>,
                <li key={2}>
                    <Link to="/signin">
                        <i className="fa fa-sign-in"></i>
                        <p>Sign In</p>
                    </Link>
                </li>

            ]
        }
    }

    render() {
        return (
            <div className="sidebar">
                <div className="logo">
                    <a href="http://www.creative-tim.com">
                        Fitbook
                    </a>
                </div>
                <div className="logo logo-mini">
                    <a href="http://www.creative-tim.com">
                        FitB
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    {this.renderUser()}
                    <ul className="nav">
                        {this.renderLinks()}
                    </ul>
                    <div className="navbar-minimize">
                        <button id="minimizeSidebar" className="btn btn-fill btn-icon">
                            <i className="fa fa-ellipsis-h"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        current_user: state.current_user.user,
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps, {fetchCurrentUser})(Sidebar);