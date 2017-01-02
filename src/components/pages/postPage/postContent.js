import React from 'react';
import {Link} from 'react-router';

function renderDate(date) {
	const d = new Date(date);
	const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	return (
		<span>{d.getDay()} {month[d.getMonth()]} {d.getFullYear()}</span>
	);
}

export default({post}) => {
	return (
		<section className="blog-post">
			<div className="blog-post-date">
				<span>{renderDate(post.created_at)}</span>
			</div>
			<div className="blog-post-title">
				<h1>
					{post.content.title}
				</h1>
			</div>
			<div className="blog-post-by-author">
				by &nbsp;
				<span className="author">
					<Link to={`/users/${post.author.id}`}>
						{post.author.name}
					</Link>
				</span>
			</div>
			<div className="blog-post-heading">
				<h2>
					{post.content.heading}
				</h2>
			</div>
			<div className="blog-post-content" dangerouslySetInnerHTML={{__html: post.content.body}}>
			</div>
			<div className="blog-post-author">
				<div className="row">
					<div className="col col-1-5">
						<div className="blog-post-author-image">
							<img src={post.author.images.picture} alt=""/>
						</div>
						<div className="blog-post-author-name">
							<Link to={`/users/${post.author.id}`}>
								{post.author.name}
							</Link>
						</div>
					</div>
					<div className="col col-4-5">
						<div className="blog-post-author-desc">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet consequatur cum
							cupiditate debitis dolor ea, error fugiat harum hic labore minima porro quis quos,
							reiciendis soluta tempore vero vitae voluptates.
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};