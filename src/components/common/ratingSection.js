import React from 'react';
import {connect} from 'react-redux';

import {createRating} from '../../actions/userActions';
import {createGymRating} from '../../actions/gymsActions';

class RatingSection extends React.Component {
	constructor(props) {
		super(props);

		this.handleSelectRating = this.handleSelectRating.bind(this);
	}

	handleSelectRating() {
		switch (this.props.type) {
			case 'user':
				this.props.createRating(this.props.id, parseInt(this.refs.formRating.ratingSelect.value));
				break;
			case 'gym':
				this.props.createGymRating(this.props.id, parseInt(this.refs.formRating.ratingSelect.value));
				break;
		}
	}

	renderRating() {
		if (this.props.current_user) {
			return (
				<section className="rating">
					<div className="rating-wrapper">
						<div className="row">
							<div className="col col-1-2">
								<div className="rating-title">
									<h1>Rate as just like <span className="rating-counter">{this.props.count}</span> people did</h1>
								</div>
							</div>
							<div className="col col-1-2">
								<form className="formRating rating-form" onSubmit={this.handleSelectRating}>
									<label htmlFor="ratingSelect">Pick your rating</label>
									<select name="ratingSelect" id="ratingSelect" onChange={this.handleSelectRating}>
										<option value="5">5</option>
										<option value="4">4</option>
										<option value="3">3</option>
										<option value="2">2</option>
										<option value="1">1</option>
									</select>
								</form>
							</div>
						</div>
					</div>
				</section>
			);
		}
	}

	render() {
		return (
			<div>{this.renderRating()}</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		current_user: state.current_user.user
	};
}

export default connect(mapStateToProps, {createRating, createGymRating})(RatingSection);