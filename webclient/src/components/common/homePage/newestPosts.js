import React from 'react';
import {Link} from 'react-router';
import {renderDate} from '../../../helpers/functions';

function renderPost(post) {
	return (
		<li key={post.id} className="newest-posts-item">
			<div className="newest-posts-item-title">
				<Link to={`/posts/${post.id}`}>
					{post.content.title}
				</Link>
			</div>
			<div className="newest-posts-item-date">{renderDate(post.created_at)}</div>
			<div className="newest-posts-item-author">
				<Link to={`/users/${post.author.id}`}>
					<div className="newest-posts-item-author-img">
						<img src={post.author.images.picture} alt={post.author.name}/>
					</div>
				</Link>
			</div>
		</li>
	);
}

export default ({posts}) => {
	return (
		<section className="newest-posts">
			<div className="newest-posts-title">
				<h1>Newest posts</h1>
			</div>
			<ul className="newest-posts-list">
				{posts.map(post => {
					return renderPost(post);
				})}
			</ul>
		</section>
	);
};