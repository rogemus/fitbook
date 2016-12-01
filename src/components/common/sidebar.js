import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchCurrentUser} from '../../actions/current_user_actions';

class Sidebar extends React.Component {

    componentWillMount() {
        if (this.props.authenticated) {
            //this.props.fetchCurrentUser();
        }
    }

    renderCurrentUserName() {
        return this.props.current_user.name;
    }

    renderUser() {
        if (this.props.current_user && this.props.authenticated) {
            return (
                <div className="user">
                    <div className="photo">
                        <Link to="/me">
                            <img src={this.props.current_user.images.picture}/>
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
                    <Link to="/" activeClassName="active">
                        <i className="fa fa-home"></i>
                        <p>Home</p>
                    </Link>
                </li>,
                <li key={2}>
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
                    <Link to="/" className="simple-text">
                        Fitbook
                    </Link>
                </div>
                <div className="logo logo-mini">
                    <Link to="/">
                        FitB
                    </Link>
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

export default connect(mapStateToProps)(Sidebar);