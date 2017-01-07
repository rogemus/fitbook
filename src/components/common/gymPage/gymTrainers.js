import React from 'react';
import {Link} from 'react-router';
import {renderRating} from '../../../helpers/functions';

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
				<div className="gyms-trainers-item-rating">
					{renderRating(user)}
				</div>
			</div>
		</li>
	);
}

function renderUsers(users) {
	return users.map((user) => {
		return renderTrainerOddRow(user);
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