import React from 'react';
import {Link} from 'react-router';
import {renderDate} from '../../../helpers/functions';

function renderPost(post) {
	return (
		<li key={post.id} className="user-posts-item">
			<div className="user-posts-item-title">
				<Link to={`/posts/${post.id}`}>
					{post.content.title}
				</Link>
			</div>
			<div className="user-posts-item-date">{renderDate(post.created_at)}</div>
		</li>
	);
}

export default({posts}) => {
	return (
		<section className="user-posts">
			<div className="user-posts-title">
				<h1>My post</h1>
			</div>
			<ul className="user-posts-list">
				{posts.reverse().map(post => {
					return renderPost(post);
				})}
			</ul>
		</section>
	);
};