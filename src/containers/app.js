import React from 'react';
import {connect} from 'react-redux';
import Footer from '../components/common/footer';
import Header from '../components/common/header';
import ErrorsDialog from '../components/common/errorDialog';
import Spinner from '../components/common/spinner';

class App extends React.Component {
	renderErrors() {
		if (this.props.errors) {
			return <ErrorsDialog errors={this.props.errors}/>;
		}
	}

	renderSpinner() {
		if (this.props.loading.loading === true) {
			return <Spinner />;
		}
	}

	render() {
		return (
			<main>
				{this.renderErrors()}
				{this.renderSpinner()}
				<Header/>
				{this.props.children}
				<Footer/>
			</main>
		);
	}
}

function mapStateToProps(state) {
	return {
		errors: state.errors.error,
		loading: state.loading
	};
}

export default connect(mapStateToProps, null)(App);