import {
    SET_NEW_LANGUAGE
} from '../../actionTypes';

export function language(choosenLanguage) {
    return function (dispatch) {
        dispatch({
            type: SET_NEW_LANGUAGE,
            payload: choosenLanguage
        })
    }
}