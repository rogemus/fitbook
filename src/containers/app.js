import React from 'react';
import {connect} from 'react-redux';
import Footer from '../components/common/footer';
import Header from '../components/common/header';
import ErrorsDialog from '../components/common/errorDialog';

class App extends React.Component {
	renderErrors() {
		if (this.props.errors) {
			return <ErrorsDialog errors={this.props.errors}/>;
		}
	}

	render() {
		return (
			<main>
				{this.renderErrors()}
				<Header/>
				{this.props.children}
				<Footer/>
			</main>
		);
	}
}

function mapStateToProps(state) {
	return {
		errors: state.errors.error
	};
}

export default connect(mapStateToProps, null)(App);