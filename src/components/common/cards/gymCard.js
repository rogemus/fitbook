import React from 'react';
import {Link} from 'react-router';

function renderCover(cover) {
	if (cover !== null) {
		return (<img src={cover} alt="..."/>);
	} else {
		return <img src="../../assets/img/background.jpg" alt="..."/>;
	}
}

export default({gym}) => (
	<div className="card card-user">
		<div className="image">
			{renderCover(gym.images.cover)}
		</div>
		<div className="content">
			<div className="row">
				<div className="col-xs-5">
					<div className="icon-big icon-success text-center">
						<img className="avatar border-white" src={gym.images.picture} alt={gym.name}/>
					</div>
				</div>
				<div className="col-xs-7">
					<Link to={`/gyms/${gym.id}`}>
						<h2>{gym.name}</h2>
					</Link>
					<hr/>
					<p className="description">
						{gym.about}
					</p>
					<hr/>
					<p className="description">
						{gym.description}
					</p>
				</div>
			</div>
		</div>
	</div>
);