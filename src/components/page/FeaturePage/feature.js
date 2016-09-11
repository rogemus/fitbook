import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';

class Feature extends Component {
    render() {
        return (
            <div>super text, który widać tylko jeśli jesteś zalogowany</div>
        )
    }
}

export default connect(null, actions)(Feature);