import {
    GET_CURRENTUSER_INFO_STARTED,
    GET_CURRENTUSER_INFO_SUCCESS,
    GET_CURRENTUSER_INFO_FILED,
    GET_CURRENTUSER_INFO_CLEAR
  } from '../../actionTypes';
  import { Host } from '../../Api';
  import { RSAA } from 'redux-api-middleware';

  export function setCurrentUser(data) {
    return function (dispatch) {
        dispatch({
            type: GET_CURRENTUSER_INFO_SUCCESS,
            payload: data
        })
    }
}

  export function getCurrentUser(token) {
    return async function (dispatch, getState) {
        await dispatch({
            [RSAA]: {
                endpoint: Host.ip + '/user/getCurrentuser',
                types: [GET_CURRENTUSER_INFO_STARTED, GET_CURRENTUSER_INFO_SUCCESS, GET_CURRENTUSER_INFO_FILED],
                method: 'POST',
                headers: { 
                  'Authorization': token,
                  'Content-Type': 'application/json'
                }
            }
        })
    }
  }


  export function clearCurrentUser() {
    return function (dispatch) {
        dispatch({
            type: GET_CURRENTUSER_INFO_CLEAR
        })
    }
}

  