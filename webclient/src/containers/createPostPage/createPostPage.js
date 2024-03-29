import React from 'react';
import {connect} from 'react-redux';
import TinyMCE from 'react-tinymce';
import {createPost} from '../../actions/postActions';

class CreateGymsPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			editor: {
				initText: 'Put your post here :)',
				titleInit: 'Put title here',
				headingInit: 'Put heading here',
				tagsInit: 'Put tags here ex. "sport, gym, fat"',
				plugins: 'link image code',
				toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
			},

			postTitle: '',
			postBody: '',
			postHeading: '',
			postTags: []
		};

		this.handleBodyChange = this.handleBodyChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleTagsChange = this.handleTagsChange.bind(this);
		this.handleHeadingChange = this.handleHeadingChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	handleBodyChange(e) {
		this.setState({
			postBody: e.target.getContent()
		});
	}

	handleTitleChange(e) {
		this.setState({
			postTitle: e.target.value
		});
	}

	handleHeadingChange(e) {
		this.setState({
			postHeading: e.target.value
		});
	}

	handleTagsChange(e) {
		const tagsArr = e.target.value.split(',');

		this.setState({
			postTags: tagsArr
		});
	}

	onFormSubmit(e) {
		e.preventDefault();

		const post = {
			title: this.state.postTitle,
			heading: this.state.postHeading,
			body: this.state.postBody,
			tags: this.state.postTags
		};

		this.props.createPost(post);
	}

	render() {
		return (
			<div className="create-post">
				<div className="create-post-wrapper">
					<div className="create-post-title">
						<h1>Create Post</h1>
					</div>
					<form ref="form" onSubmit={this.onFormSubmit}>
						<div className="form-group">
							<label htmlFor="postTitle">Title (max 55 characters)</label>
							<input
								id="postTitle"
								placeholder={this.state.editor.titleInit}
								className="form-control"
								value={this.state.postTitle}
								onChange={this.handleTitleChange}/>
						</div>

						<div className="form-group">
							<label htmlFor="postHeading">Heading (max 255 characters)</label>
							<input
								id="postHeading"
								placeholder={this.state.editor.headingInit}
								className="form-control"
								value={this.state.postHeading}
								onChange={this.handleHeadingChange}/>
						</div>

						<div className="form-group">
							<TinyMCE
								content={this.state.editor.initText}
								config={{
									plugins: this.state.editor.plugins,
									toolbar: this.state.editor.toolbar
								}}
								onChange={this.handleBodyChange}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="postTags">Tags</label>
							<input
								id="postTags"
								placeholder={this.state.editor.tagsInit}
								className="form-control"
								value={this.state.postTags}
								onChange={this.handleTagsChange}/>
						</div>

						<button type="submit" className="btn btn-primary">Create Post</button>
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		current_user: state.current_user.user
	};
}

export default connect(mapStateToProps, {createPost})(CreateGymsPage);