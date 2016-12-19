import React from 'react';
import {Link} from 'react-router';

function renderCover(cover) {
	if (cover !== null) {
		return (<img src={cover} alt="..."/>);
	} else {
		return <img src="../../assets/img/background.jpg" alt="..."/>;
	}
}

export default({user}) => (
	<div className="card card-user">
		<div className="image">
			{renderCover(user.images.cover)}
		</div>
		<div className="content">
			<div className="author">
				<Link to={`/users/${user.id}`}>
					<img className="avatar border-white" src={user.images.picture} alt={user.name}/>
				</Link>
				<Link to={`/users/${user.id}`}>
					<h4 className="title">{user.name}</h4>
				</Link>
			</div>
			<p className="description text-center">
				{user.email}
			</p>
			<hr/>
			<p className="description text-center">

			</p>
		</div>
	</div>
);