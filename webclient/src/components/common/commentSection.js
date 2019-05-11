import React from 'react';
import CommentsList from './comments/commentsList';
import CommentsForm from './comments/commentsForm';
export default({comments, user, id, type}) => {
	return (
		<section className="comments">
			<div className="comments-title">
				<div className="comments-title-content">
					<h1 className="title">comments</h1><span className="comments-counter">{comments.length}</span>
				</div>
			</div>

			<CommentsList comments={comments}/>
			<CommentsForm user={user} id={id} type={type}/>
		</section>
	);
};