import React from 'react';
import {Link} from 'react-router';

function renderCover(cover) {
	if (cover !== null) {
		return (<img src={cover} alt="..."/>);
	} else {
		return <img src="../../assets/img/background.jpg" alt="..."/>;
	}
}

function renderNumber(number) {
	if (isNaN(number)) {
		return 0;
	} else {
		return number;
	}
}

export default({user}) => (
	<div className="col-lg-6">
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
				<hr/>
				<div className="row">
					<div className="col-lg-6">
						<h4>Rating</h4>
						<h6>People voted: {user.rating.count}</h6>
					</div>
					<div className="col-lg-6 text-right">
						<h3>{renderNumber(Number((user.rating.rating / user.rating.count).toFixed(1)))}</h3>
					</div>
				</div>
			</div>
		</div>
	</div>
);