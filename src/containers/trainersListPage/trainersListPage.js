import React from 'react';
import {connect} from 'react-redux';
import {fetchTrainers} from '../../actions/trainersActions';
import {renderRating} from '../../helpers/functions';
import {Link} from 'react-router';

class TrainersListPage extends React.Component {
	componentDidMount() {
		this.props.fetchTrainers();
	}

	renderTrainersList() {
		if (this.props.trainersList) {
			return this.props.trainersList.map((user) => {
				return this.renderTrainer(user);
			});
		}
	}

	renderTrainer(user) {
		return (
			<li className="search-results-item">
				<div className="search-results-item-image">
					<img src={user.images.picture} alt={user.name}/>
				</div>
				<div className="search-results-item-title">
					<Link to={`/users/${user.id}`}>
						{user.name}
					</Link>
				</div>
				<div className="search-results-item-title">
					{renderRating(user)}
				</div>
				<div className="search-results-item-about">{user.about}</div>
			</li>
		);
	}

	render() {
		return (
			<section className="search-results">
				<div className="search-results-title">
					<h1>Trainers</h1>
				</div>
				<ul className="search-results-list">
					{this.renderTrainersList()}
				</ul>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		trainersList: state.trainers.trainers
	};
}

export default connect(mapStateToProps, {fetchTrainers})(TrainersListPage);