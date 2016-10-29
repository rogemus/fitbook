import React from 'react';
import {connect} from 'react-redux';
import {fetchCurrentUserAvailableGyms} from '../../../actions/current_user_actions'
class CreateGymsPage extends React.Component {

    constructor(props) {
        super(props);


        this.onFormSubmit = this.onFormSubmit.bind(this);
    }


    componentWillMount() {
        this.props.fetchCurrentUserAvailableGyms();
    }

    onFormSubmit(event) {
        event.preventDefault();
        console.log(this.refs.form.gymSelect.value);

    }

    renderSelectGym() {
        if (this.props.current_user_available_gyms) {

            return (
                this.props.current_user_available_gyms.map(gym => {
                    return (<option key={gym.id} value={gym.name}>{gym.id}</option>)
                })
            )
        }
    }

    render() {
        return (
            <form ref="form" onSubmit={this.onFormSubmit} className="input-group">
                <select name="gymSelect" className="form-control">
                    {this.renderSelectGym()}
                </select>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>


        )
    }
}

function mapStateToProps(state) {
    return {
        current_user: state.current_user.user,
        current_user_available_gyms: state.current_user.available_gyms
    }
}

export default connect(mapStateToProps, {fetchCurrentUserAvailableGyms})(CreateGymsPage);