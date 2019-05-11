import React from 'react';
import {Link} from 'react-router';
import {renderCover} from '../../../helpers/functions';

function renderGym(gym) {
	return (
		<li key={gym.gym.id} className="user-gyms-item">
			<div className="user-gyms-item-header">
				<div className="user-gyms-item-cover">
					{renderCover(gym.gym.images.cover, gym.gym.name)}
				</div>
				<div className="user-gyms-item-profile">
					<Link to={`/gyms/${gym.gym.id}`}>
						<img src={gym.gym.images.picture} alt={gym.gym.name}/>
					</Link>
				</div>
			</div>
			<div className="user-gyms-item-footer">
				<div className="user-gyms-item-title">
					<Link to={`/gyms/${gym.gym.id}`}>{gym.gym.name}</Link>
				</div>
				<div className="user-gyms-item-about">{gym.gym.about}</div>
			</div>
		</li>
	);
}

export default({gyms}) => {
	return (
		<section className="user-gyms">
			<div className="user-gyms-title">
				<h1>My gyms</h1>
			</div>
			<ul className="user-gyms-list">
				{gyms.map(gym => {
					return renderGym(gym);
				})}
			</ul>
		</section>
	);
};