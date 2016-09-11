import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/gyms_actions';

class GymsPage extends React.Component {
    componentWillMount() {
        this.props.fetchGyms();
    }

    render() {
        return (
            <div>{this.props.gyms}</div>
        )
    }
}

function mapStateToProps(state) {
    return {gyms: state.gyms.gyms}
}

export default connect(mapStateToProps, actions)(GymsPage);