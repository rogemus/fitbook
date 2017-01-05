import React from 'react';
import {Link} from 'react-router';

function renderTrainerOddRow(user) {
	return (
		<li key={user.id} className="gyms-trainers-item">
			<div className="gyms-trainers-item-image">
				<Link to={`/users/${user.id}`}>
					<img src={user.images.picture} alt={user.name}/>
				</Link>
			</div>
			<div className="gyms-trainers-item-content">
				<div className="gyms-trainers-item-name">
					<Link to={`/users/${user.id}`}>
						{user.name}
					</Link>
				</div>
				<div className="gyms-trainers-item-about">
					{user.about}
				</div>
			</div>
		</li>
	);
}

function renderTrainerEvenRow(user) {
	return (
		<li key={user.id} className="gyms-trainers-item">
			<div className="gyms-trainers-item-content">
				<div className="gyms-trainers-item-name">
					<Link to={`/users/${user.id}`}>
						{user.name}
					</Link>
				</div>
				<div className="gyms-trainers-item-about">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias consequatur dolore doloribus non
					nulla odio porro possimus? Eveniet, quasi rerum! Ea necessitatibus nesciunt porro quibusdam vel?
					Error, minima, sed.
				</div>
			</div>
			<div className="gyms-trainers-item-image">
				<Link to={`/users/${user.id}`}>
					<img src={user.images.picture} alt={user.name}/>
				</Link>
			</div>
		</li>
	);
}

function renderUsers(users) {
	return users.map((user, i) => {
		if (i + 1 % 3 === 0 || i + 1 % 4 === 0) {
			return renderTrainerEvenRow(user);
		} else {
			return renderTrainerOddRow(user);
		}
	});
}

function renderUsersList(users) {
	if (users.length > 0) {
		return (
			<section className="gyms-trainers">
				<div className="gyms-trainers-title">
					<h1>Trainers</h1>
				</div>
				<ul className="gyms-trainers-list">
					{renderUsers(users)}
				</ul>
			</section>
		);
	} else {
		return <div></div>;
	}
}

export default ({users}) => {
	return renderUsersList(users);
};