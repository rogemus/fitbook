import React from 'react';
import {Link} from 'react-router';
import GoogleMap from '../googleMap';

const MARGIN = {
	'margin': '35px 0 15px'
};

const WORD_BREAK = {
	'wordBreak': 'break-all'
};

function renderMap(gym) {
	if (gym.location !== null && gym.location !== undefined) {
		return <GoogleMap lat={gym.location.latitude} lon={gym.location.longitude}/>;
	}
}

function renderLocation(gym) {
	if (gym.location !== null && gym.location !== undefined) {
		return (
			<h6 style={MARGIN}>
				{gym.location.street},&nbsp;
				{gym.location.city}
			</h6>
		);
	} else {
		return (
			<p style={MARGIN} className="text-muted">
				<small>Siłownia nie ma przypisanego adresu.</small>
			</p>
		);
	}
}

export default({gym}) => (
	<div className="col-lg-3">
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
				</div>
				<div className="row">
					<div className="col-lg-4 text-left"><p className="description"><strong>About</strong></p></div>
					<div className="col-lg-8 text-right"><p className="description">{gym.about}</p></div>
				</div>
				<hr/>
				<div className="row">
					<div className="col-lg-4 text-left"><p className="description">Our Site</p></div>
					<div className="col-lg-8 text-right"><p className="description" style={WORD_BREAK}>{gym.website}</p>
					</div>
				</div>
				<hr />
				<div className="find-gym__result__gym__location">
					{renderMap(gym)}
				</div>
				<div className="row">
					<div className="col-lg-5">
						<h4>Our address:</h4>
					</div>
					<div className="col-lg-7 text-right">
						{renderLocation(gym)}
					</div>
				</div>
			</div>
		</div>
	</div>
);