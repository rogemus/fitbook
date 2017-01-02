import React from 'react';
import {Link} from 'react-router';

function renderGym(gym) {
	return (
		<li className="search-results-item">
			<div className="search-results-item-image">
				<img src={gym.images.picture} alt={gym.name}/>
			</div>
			<div className="search-results-item-title">
				<Link to={`/gyms/${gym.id}`}>
					{gym.name}
				</Link>
			</div>
			<div className="search-results-item-about">{gym.about}</div>
		</li>
	);
}

export default ({gyms}) => {
	return (
		<section className="search-results">
			<div className="search-results-title">
				<h1>Gyms in this area</h1>
			</div>
			<ul className="search-results-list">
				{gyms.map(gym => {
					return renderGym(gym);
				})}
			</ul>
		</section>
	);
};