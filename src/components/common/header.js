import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchCurrentUser} from '../../actions/current_user_actions';

class Header extends React.Component {

    componentWillMount() {
        if (this.props.authenticated) {
            this.props.fetchCurrentUser();
        }
    }

    renderCurrentUser() {
        if(this.props.current_user) {
            return this.props.current_user.name;
        }
    }

    renderLinks() {
        if (this.props.authenticated) {
            this.renderCurrentUser();
            return [
                <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/signout">Sign Out</Link>
                </li>,
                <li className="nav-item" key={2}>
                    <Link className="nav-link" to="/gyms">Gyms</Link>
                </li>,
                <li className="nav-item" key={3}>
                    <Link className="nav-link" to="/me">Me</Link>
                </li>,
                <li className="nav-item" key={4}>
                    {this.renderCurrentUser()}
                </li>

            ]
        } else {
            return [
                <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/signin">Sign In</Link>
                </li>
            ];
        }
    }

    render() {
        return (
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand">Home</Link>
                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav>
        )
    }
}
function mapStateToProps(state) {
    return {
        current_user: state.current_user.user,
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps, {fetchCurrentUser})(Header);