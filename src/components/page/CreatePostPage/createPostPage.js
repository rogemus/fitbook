import React from 'react';
import {connect} from 'react-redux';
import TinyMCE from 'react-tinymce';

import {createPost} from '../../../actions/current_user_actions'
class CreateGymsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editor: {
                initText: '<p>Put your post here :) </p>',
                titleInit: 'Put title here',
                tagsInit: 'Put tags here',
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            },

            postTitle: '',
            postBody: '',
            postTags: '',
        };

        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
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

    handleTagsChange(e) {
        this.setState({
            postTags: e.target.value
        });
    }

    onFormSubmit(e) {
        e.preventDefault();

        const post = {
            title: this.state.postTitle,
            body: this.state.postBody,
            tags: this.state.postTags
        };

        this.props.createPost(post);
    }

    render() {
        return (
            <div>
                <h2>Create Post</h2>

                <form ref="form" onSubmit={this.onFormSubmit}>

                    <input
                        placeholder={this.state.editor.titleInit}
                        className="form-control"
                        value={this.state.postTitle}
                        onChange={this.handleTitleChange}/>

                    <hr/>
                    <TinyMCE
                        content={this.state.editor.initText}
                        config={{
                            plugins: this.state.editor.plugins,
                            toolbar: this.state.editor.toolbar
                        }}
                        onChange={this.handleBodyChange}
                    />
                    <hr/>
                    <input
                        placeholder={this.state.editor.tagsInit}
                        className="form-control"
                        value={this.state.postTags}
                        onChange={this.handleTagsChange}/>
                    <hr/>
                    <button type="submit" className="btn btn-primary">Create Post</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        current_user: state.current_user.user
    }
}

export default connect(mapStateToProps, {createPost})(CreateGymsPage);