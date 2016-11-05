import axios from 'axios';

import {
    FETCH_GYM,
    FETCH_GYMS
} from './types';

const ROOT_URL = 'http://fitbook-api.herokuapp.com/api/v1';

export function fetchGyms() {
    return function (dispatch) {
        axios.get(ROOT_URL + '/gyms')
            .then(response => {
                console.log(response.data);
                dispatch({
                    type: FETCH_GYMS,
                    payload: response.data
                });
            });
    }
}

export function fetchGym(id) {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/gyms/${id}`)
            .then(response => {
                dispatch({
                    type: FETCH_GYM,
                    payload: response.data
                });
            });
    }
}


