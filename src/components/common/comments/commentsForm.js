import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {createUserComment} from '../../../actions/userActions';
import {createGymComment} from '../../../actions/gymsActions';

class CommentsForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			commentBody: ''
		};

		this.onCommentFormSubmit = this.onCommentFormSubmit.bind(this);
		this.handleCommentBodyChange = this.handleCommentBodyChange.bind(this);
	}

	handleCommentBodyChange(e) {
		this.setState({
			commentBody: e.target.value
		});
	}

	onCommentFormSubmit(e) {
		e.preventDefault();

		switch (this.props.type) {
			case 'user':
				this.props.createUserComment(this.props.id, this.state.commentBody);
				break;
			case 'gym':
				this.props.createGymComment(this.props.id, this.state.commentBody);
				break;
		}

	}

	renderUserImage() {
		if (this.props.current_user) {
			return <img src={this.props.user.images.picture} alt={this.props.user.name}/>;
		}
	}

	renderUserName() {
		if (this.props.current_user) {
			return (
				<Link to={`/users/${this.props.user.id}`}>
					{this.props.user.name}
				</Link>
			);
		}
	}

	renderCommentForm() {
		return (
			<div className="comments-form">
				<div className="row">
					<div className="col col-1-5">
						<div className="comments-item-author-image">
							{this.renderUserImage}
						</div>
					</div>
					<div className="col col-4-5">
						<div className="row">
							<div className="col col-3-5">
								<div className="comments-item-author-name">
									{this.renderUserName()}
								</div>
							</div>
						</div>
						<div className="comments-item-content">
							<form ref="form" onSubmit={this.onCommentFormSubmit} className="comment">
								<textarea
									id="commentBody"
									placeholder="Type here!"
									className="form-control textarea"
									value={this.state.commentBody}
									onChange={this.handleCommentBodyChange}
									cols="30"
									rows="10">
								</textarea>
								<button type="submit" className="btn comments-form-button">Send</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div>
				{this.renderCommentForm()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		current_user: state.current_user.user
	};
}

export default connect(mapStateToProps, {createUserComment, createGymComment})(CommentsForm);