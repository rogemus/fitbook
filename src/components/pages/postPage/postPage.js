import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchPosts} from '../../../actions/postActions';

class HomePage extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchPosts(this.props.params.id);
	}

	renderPost() {
		if (this.props.post) {
			return (
				<div className="card">
					<div className="content">
						<Link to={`/posts/${this.props.post.id}`}>
							<h3>{this.props.post.content.title}</h3>
						</Link>
						<Link to={`/users/${this.props.post.author.id}`}>
							<span>{this.props.post.author.name}</span>
						</Link>
						<hr/>
						<p className="description">
							{this.props.post.content.heading}
						</p>
						<hr/>
						<div className="post-body">
							<p className="description" dangerouslySetInnerHTML={{__html: this.props.post.content.body}}></p>
						</div>

						<div className="card-footer date">
							<div className="stats text-right">
								<small>{this.props.post.created_at}</small>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				{this.renderPost()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		post: state.posts.public_post
	};
}

export default connect(mapStateToProps, {fetchPosts})(HomePage);