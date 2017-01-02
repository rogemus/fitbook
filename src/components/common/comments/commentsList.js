import React from 'react';
import Comment from './comment';

export default({comments}) => {
	return (
		<ul className="comments-list">
			{comments.map(comment => {
				return <Comment comment={comment}/>;
			})}
		</ul>
	);
};