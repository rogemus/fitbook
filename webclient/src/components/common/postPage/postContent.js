import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {renderDate} from '../../../helpers/functions';
import {deletePost} from '../../../actions/postActions';

class PostContent extends React.Component {
	constructor(props) {
		super(props);

		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	renderEditButton(post, user) {
		if (this.props.authenticated) {
			if (user.id === post.author.id) {
				return (
					<Link to={`/updatepost/${post.id}`} className="btn">
						Update post
					</Link>
				);
			}
		}
	}

	renderDeleteButton(post, user) {
		if (this.props.authenticated) {
			if (user.id === post.author.id) {
				return (
					<span className="btn btn-red" onClick={this.handleButtonClick}>
						Delete post
					</span>
				);
			}
		}
	}

	handleButtonClick(e) {
		e.preventDefault();

		this.props.deletePost(this.props.id);
	}

	render() {
		return (
			<section className="blog-post">
				<div className="blog-post-date">
					<span>{renderDate(this.props.post.created_at)}</span>
				</div>
				<div className="blog-post-title">
					<h1>
						{this.props.post.content.title}
					</h1>
				</div>
				<div className="blog-post-by-author">
					by &nbsp;
					<span className="author">
					<Link to={`/users/${this.props.post.author.id}`}>
						{this.props.post.author.name}
					</Link>
				</span>
				</div>
				<div className="blog-post-heading">
					<h2>
						{this.props.post.content.heading}
					</h2>
				</div>
				<div className="blog-post-content" dangerouslySetInnerHTML={{__html: this.props.post.content.body}}>
				</div>
				<div className="blog-post-edit">
					{this.renderEditButton(this.props.post, this.props.current_user)}
					{this.renderDeleteButton(this.props.post, this.props.current_user)}
				</div>
				<div className="blog-post-author">
					<div className="row">
						<div className="col col-1-5">
							<div className="blog-post-author-image">
								<Link to={`/users/${this.props.post.author.id}`}>
									<img src={this.props.post.author.images.picture} alt=""/>
								</Link>
							</div>
							<div className="blog-post-author-name">
								<Link to={`/users/${this.props.post.author.id}`}>
									{this.props.post.author.name}
								</Link>
							</div>
						</div>
						<div className="col col-4-5">
							<div className="blog-post-author-desc">
								{this.props.post.author.about}
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}


export default connect(mapStateToProps, {deletePost})(PostContent);