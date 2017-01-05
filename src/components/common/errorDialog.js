import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {clearError} from '../../actions/errorAction';

class ErrorDialog extends React.Component {

	constructor(props) {
		super(props);

		this.onButtonClick = this.onButtonClick.bind(this);
	}

	getErrors(errors) {
		const errorsArr = [];

		_.forEach(errors, (errorArr) => {
			if (errorArr.constructor === Array) {
				errorArr.map((error) => {
					errorsArr.push(error);
				});
			} else {
				errorsArr.push(errorArr);
			}
		});

		return errorsArr;
	}

	onButtonClick() {
		this.props.clearError();
	}

	renderErrors(errors) {
		const errorsArr = this.getErrors(errors);

		if (errorsArr.length > 0) {
			return errorsArr.map((error, i) => {
				return <li key={i}>{error}</li>;
			});
		}
	}

	render() {
		return (
			<div className="error-dialog-bg">
				<div className="error-dialog">
					<div className="error-dialog-wrapper">
						<div className="error-dialog-title">
							<h1>Errors</h1>
						</div>
						<div className="error-dialog-errors">
							<ul>
								{this.renderErrors(this.props.errors)}
							</ul>
						</div>
						<div className="error-dialog-buttons">
							<span className="error-dialog-button" onClick={this.onButtonClick}>Close</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, {clearError})(ErrorDialog);