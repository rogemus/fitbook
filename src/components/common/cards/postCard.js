import React from 'react';
import {Link} from 'react-router';

export default({post}) => (
	<div className="col-md-12">
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
				<p className="description" dangerouslySetInnerHTML={{__html: post.content.body}}></p>
				<div className="card-footer date">
					<div className="stats text-right">
						{post.created_at}
					</div>
				</div>
			</div>
		</div>
	</div>
)