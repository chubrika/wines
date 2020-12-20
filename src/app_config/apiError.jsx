import { RSAA } from 'redux-api-middleware';
import * as Cookies from "js-cookie";
import {
    LOG_IN_FILED,
    //REFRESH_TOKEN_FAILED
} from '../state/actionTypes';
//import { refreshToken } from '../state/actions/User/getCurrentUser';

export default (store) => (next) => async (action) => {
    if (action && action.payload && action.payload.name === 'RequestError' && !action.payload.checked) {
        action.payload.status = 500;

        action.payload.checked = true;
        store.dispatch({
            type: action.type,
            payload: [action.payload]
        })
    }
    else if (action && action.payload && action.payload.name === 'ApiError' && !action.payload.checked) {
        return (async () => {
            if(action.payload.response) {
                let errorArray = action.payload.response ? action.payload.response.errors : action.payload;
                if (Array.isArray(action.payload.response.errors)) {
                    action.payload = errorArray.map((error) => {
                        error.status = action.payload.status;
                        return error;
                    })
                }
            }
            if (action.payload && (action.payload.status === 401 || ( action.payload[0] && action.payload[0].status === 401))) {
                let token = await Cookies.get('token');
                let refresh_token = await Cookies.get('refresh_token');
                if (token && refresh_token) {
                    document.location.replace('/');
                    await Cookies.remove('token');
                    await Cookies.remove('refresh_token');
                }
            }
            // else if (action.payload && action.payload.status === 401 && action.type !== LOG_IN_FILED) {
            //     let refresh_token = Cookies.get('refresh_token');
            //     if (refresh_token) {
            //         await refreshToken({
            //                 action: typeof action.meta === 'function' ? action.meta : { ...action.meta }
            //             })(store.dispatch, store.getState);
                    
            //         return null;
            //     }
            // }

            action.payload.checked = true;
            store.dispatch({
                type: action.type,
                payload: action.payload
            })
        })();
    } else {
        // So the middleware doesn't get applied to every single action
        return next(action)
    }
}