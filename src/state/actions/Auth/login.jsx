import {
    LOG_IN_STARTED,
    LOG_IN_SUCCESS,
    LOG_IN_FILED
  } from '../../actionTypes';
  import { Host } from '../../Api';
  import { RSAA } from 'redux-api-middleware';
  import { isEmpty } from 'lodash';
  export function login(data) {

    return async function (dispatch, getState) {
        let d = await localStorage.getItem('LANG');
        let item = JSON.parse(d);
        let lang = !isEmpty(item) ? item.lang.name : 'ka';
        await dispatch({
            [RSAA]: {
                endpoint: Host.ip + '/guest/login',
                types: [LOG_IN_STARTED, LOG_IN_SUCCESS, LOG_IN_FILED],
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json'
                },
                body: {
                  email: data.email,
                  password: data.password,
                  lang: lang
              }
            }
        })
    }
  }