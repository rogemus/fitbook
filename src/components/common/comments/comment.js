import React from 'react';
import {Link} from 'react-router';
import {renderDate} from '../../../helpers/functions';

export default({comment}) => {
	return (
		<li key={comment.id} className="comments-item">
			<div className="row">
				<div className="col col-1-5">
					<div className="comments-item-author-image">
						<Link to={`/users/${comment.author.id}`}>
							<img src={comment.author.images.picture} alt={comment.author.name}/>
						</Link>
					</div>
				</div>
				<div className="col col-4-5">
					<div className="row">
						<div className="col col-3-5">
							<div className="comments-item-author-name">
								<Link to={`/users/${comment.author.id}`}>
									{comment.author.name}
								</Link>
							</div>
						</div>
						<div className="col col-2-5">
							<div className="comments-item-date">
								{renderDate(comment.created_at)}
							</div>
						</div>
					</div>
					<div className="comments-item-content">
						{comment.body}
					</div>
				</div>
			</div>
		</li>
	);
};