import React from 'react';

export default ({gym}) => (
	<li key={gym.id}>
		<div className="row">
			<div className="col-xs-3">
				<div className="avatar">
					<img src={gym.gym.images.picture} alt={gym.gym.name}
						 className="img-circle img-no-padding img-responsive"/>
				</div>
			</div>
			<div className="col-xs-9">
				{gym.gym.name}
				<br />
				<span className="text-muted"><small>{gym.gym.location.street}, {gym.gym.location.city} {gym.gym.location.country}</small></span>
			</div>
		</div>
	</li>
);