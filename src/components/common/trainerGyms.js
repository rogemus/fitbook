import React from 'react';
import {Link} from 'react-router';

export default ({gym}) => (
	<li key={gym.id}>
		<div className="row">
			<div className="col-xs-3">
				<div className="avatar">
					<Link to={`/gyms/${gym.id}`}>
						<img src={gym.gym.images.picture} alt={gym.gym.name}
							 className="img-circle img-no-padding img-responsive"/>
					</Link>
				</div>
			</div>
			<div className="col-xs-9">
				<Link to={`/gyms/${gym.id}`}>
					{gym.gym.name}
				</Link>
				<br />
				<span className="text-muted"><small>{gym.gym.location.street}, {gym.gym.location.city} {gym.gym.location.country}</small></span>
			</div>
		</div>
	</li>
);