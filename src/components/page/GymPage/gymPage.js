import React from 'react';
import {connect} from 'react-redux';
import {fetchGym} from '../../../actions/gyms_actions';
import GymCard from '../../common/gymCard';

class GymPage extends React.Component {

    componentDidMount() {
        this.props.fetchGym(this.props.params.id);
    }

    renderGym() {
        if (this.props.gym) {
            return <GymCard gym={this.props.gym}/>
        }
    }

    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    {this.renderGym()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {gym: state.gym.gym}
}


export default connect(mapStateToProps, {fetchGym})(GymPage);