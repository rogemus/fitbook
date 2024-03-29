import React from 'react';
import ActionButton from '../actionButton';
import {renderRating} from '../../../helpers/functions';

export default({user, id}) => {
	return (
		<header className="user-header">
			<div className="user-header-content">
				<div className="row">
					<div className="col col-3-5">
						<div className="user-header-name">{user.name}</div>
						<div className="user-header-about">{user.about}</div>
					</div>
					<div className="col col-2-5">
						<div className="user-header-image">
							<div className="user-header-image-content">
								<img src={user.images.picture} alt=""/>
							</div>
						</div>
						<div className="user-header-rating">
							<h2 className="user-header-rating-title">
								How people rate me:
							</h2>
							<span>
								{renderRating(user)}
                    		</span>
						</div>
						<ActionButton type={'user'} title={'Join as trainer'} user={user} id={user.id}/>
					</div>
				</div>
			</div>
		</header>
	);
};