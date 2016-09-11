import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/gyms_actions';

class GymPage extends React.Component {
    componentWillMount() {
        this.props.fetchGym();
    }

    render() {
        return (
            <div>{this.props.gym}</div>
        )
    }
}

function mapStateToProps(state) {
    return {gym: state.gyms.gym}
}

export default connect(mapStateToProps, actions)(GymPage);