import {
    GET_USER_COUNTS_STARTED,
    GET_USER_COUNTS_SUCCESS,
    GET_USER_COUNTS_FILED,
    GET_USER_COUNTS_CLEAR
  } from '../../actionTypes';
  import { Host } from '../../Api';
  import { RSAA } from 'redux-api-middleware';

  export function setCunt(data) {
    return function (dispatch) {
        dispatch({
            type: GET_USER_COUNTS_SUCCESS,
            payload: data
        })
    }
}


  export function clearCount() {
    return function (dispatch) {
        dispatch({
            type: GET_USER_COUNTS_CLEAR
        })
    }
}

  