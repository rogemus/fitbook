import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Header extends React.Component {

	renderUser() {
		if (this.props.current_user && this.props.authenticated) {
			return (
				<div className="current-user">
					<div className="current-user-image">
						<Link to={`/users/${this.props.current_user.id}`}>
							<img src={this.props.current_user.images.picture}/>
						</Link>
					</div>
					<div className="current-user-name">
						<Link to={`/users/${this.props.current_user.id}`}>
							{this.props.current_user.name}
						</Link>
					</div>
				</div>
			);
		}
	}

	renderTrUserMenu() {
		if (this.props.current_user) {
			if (this.props.current_user.is_trainer === true) {
				return [
					<li key={1} className="nav-item">
						<Link to="/trainers" activeClassName="active">
							Trainers
						</Link>
					</li>,
					<li key={2} className="nav-item">
						<Link to="/creategym" activeClassName="active">
							Import Gym
						</Link>
					</li>,
					<li key={3} className="nav-item">
						<Link to="/createpost" activeClassName="active">
							Create Post
						</Link>
					</li>,
					<li key={4} className="nav-item">
						<Link to="/signout">
							Sign Out
						</Link>
					</li>
				];
			} else {
				return [
					<li key={1} className="nav-item">
						<Link to="/trainers" activeClassName="active">
							Trainers
						</Link>
					</li>,
					<li key={2} className="nav-item">
						<Link to="/creategym" activeClassName="active">
							Import Gym
						</Link>
					</li>,
					<li key={3} className="nav-item">
						<Link to="/signout">
							Sign Out
						</Link>
					</li>
				];
			}
		}
	}

	renderLinks() {
		if (this.props.authenticated) {
			return this.renderTrUserMenu();
		} else {
			return [
				<li key={1} className="nav-item">
					<Link to="/trainers" activeClassName="active">
						Trainers
					</Link>
				</li>,
				<li key={2} className="nav-item">
					<Link to="/signin">
						Sign In
					</Link>
				</li>
			];
		}
	}

	render() {
		return (
			<header className="top-nav">
				<div className="top-nav-wrapper">
					<div className="row">
						<div className="col col-1-5">
							<div className="logo">
								<Link to="/">
									<span>Fit</span>book
								</Link>
							</div>
						</div>
						<div className="col col-3-5">
							<nav className="nav">
								<ul className="nav-list">
									{this.renderLinks()}
								</ul>
							</nav>
						</div>
						<div className="col col-1-5">
							{this.renderUser()}
						</div>
					</div>
				</div>
			</header>
		);
	}
}
function mapStateToProps(state) {
	return {
		current_user: state.current_user.user,
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps)(Header);