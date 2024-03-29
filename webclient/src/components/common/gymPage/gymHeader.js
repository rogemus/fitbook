import React from 'react';
import ActionButton from '../actionButton';
import {renderRating} from '../../../helpers/functions';

export default({gym}) => {
	return (
		<header className="user-header gym-header">
			<div className="user-header-content">
				<div className="row">
					<div className="col col-3-5">
						<div className="user-header-name">{gym.name}</div>
						<div className="user-header-about">{gym.about}</div>
						<div className="user-header-desc">{gym.description}</div>
					</div>
					<div className="col col-2-5">
						<div className="user-header-image">
							<div className="user-header-image-content">
								<img src={gym.images.picture} alt=""/>
							</div>
						</div>
						<div className="user-header-rating">
							<h2 className="user-header-rating-title">
								How people rate as:
							</h2>
							<span>
								{renderRating(gym)}
                    		</span>
						</div>
						<ActionButton type={'gym'} title={'Join gym'} id={gym.id}/>
					</div>
				</div>
			</div>
		</header>
	);
};