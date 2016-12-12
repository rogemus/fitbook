import React from 'react';
import {Link} from 'react-router';
import GoogleMap from '../googleMap';

export default({gym}) => (
	<div className="col-md-3">
		<div className="card find-gym__result__gym">
			<div className="content">
				<div className="find-gym__result__gym__image text-center icon-big">
					<img className="avatar border-white" src={gym.images.picture}
						 alt={gym.name}/>
				</div>
				<div className="find-gym__result__gym__desc text-center">
					<Link to={`/gyms/${gym.id}`}>
						<h2>{gym.name}</h2>
					</Link>
					<hr />
					<p className="description">{gym.about}</p>
					<hr/>
					<p className="description">{gym.description}</p>
				</div>
				<div className="find-gym__result__gym__location">
					<hr />
					<GoogleMap lat={gym.location.latitude} lon={gym.location.longitude}/>
				</div>
			</div>
		</div>
	</div>
);