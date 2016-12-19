import React from 'react';
import {Link} from 'react-router';

export default({post}) => (
	<div className="col-lg-3" >
		<div className="card">
			<div className="content">
				<Link to={`/posts/${post.id}`}>
					<h3>{post.content.title}</h3>
				</Link>
				<Link to={`/users/${post.author.id}`}>
					<span>{post.author.name}</span>
				</Link>
				<hr/>
				<p className="description">
					{post.content.heading}
				</p>
				<hr/>
				<div className="card-footer date">
					<div className="stats text-right">
						<small>{post.created_at}</small>
					</div>
				</div>
			</div>
		</div>
	</div>
);