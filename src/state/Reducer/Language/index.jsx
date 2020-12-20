import {
    SET_NEW_LANGUAGE
} from '../../actionTypes';

const initialState = null;

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_NEW_LANGUAGE: {
            console.log(action);
            return action.payload
        }
    }
    return state;
};