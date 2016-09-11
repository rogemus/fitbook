import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Header extends Component {

    renderLinks() {
        if (this.props.authenticated) {
            return <li className="nav-item">
                <Link className="nav-link" to="/signout">Sign Out</Link>
            </li>
        } else {
            return [
                <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/signin" refresh="true">Sign In</Link>
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
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(Header);