import axios from 'axios';

import {
    FETCH_GYM,
    FETCH_GYMS
} from './types';

const ROOT_URL = 'http://localhost:3030';

export function fetchGyms() {
    return function (dispatch) {
        axios.get(ROOT_URL + '/api/v1/gyms', {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(response => {
            dispatch({
                type: FETCH_GYMS,
                payload: response.data.message
            });
        });
    }
}

export function fetchGym() {
    return function (dispatch) {
        axios.get(ROOT_URL + '/api/v1/gym', {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(response => {
            dispatch({
                type: FETCH_GYM,
                payload: response.data.message
            });
        });
    }
}


