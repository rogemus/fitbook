import React from 'react';
import {Link} from 'react-router';

function renderLink(user) {
	if (user.is_trainer) {
		return [
			<li key={1}>
				<Link to="/creategym">
					<p>Import Gym</p>
				</Link>
			</li>,
			<li key={2}>
				<Link to="/createpost">
					<p>Create Post</p>
				</Link>
			</li>
		];
	} else {
		return [
			<li key={1}>
				<Link to="/creategym">
					<p>Import Gym</p>
				</Link>
			</li>
		];
	}
}

export default({user}) => (
	<nav className="navbar">
		<div className="container-fluid">
			<ul className="nav navbar-nav navbar-right">
				{renderLink(user)}
			</ul>
		</div>
	</nav>
);