import axios from 'axios';

import {
    FETCH_GYM,
    FIND_GYMS
} from './types';

const ROOT_URL = 'http://fitbook-api.herokuapp.com/api/v1';

export function findGyms(data) {
    console.log(data);

    return function (dispatch) {
        axios.post(ROOT_URL + '/gyms/find', {
                location: {
                    top_left: data.top_left,
                    bottom_right: data.bottom_right
                }
            }
        ).then(response => {
                dispatch({
                    type: FIND_GYMS,
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


