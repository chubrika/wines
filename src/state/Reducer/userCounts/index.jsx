import {
    GET_USER_COUNTS_STARTED,
    GET_USER_COUNTS_SUCCESS,
    GET_USER_COUNTS_FILED,
    GET_USER_COUNTS_CLEAR
  } from './../../actionTypes';
  
  const initialState = {
    loading: false,
    errors: [],
    data: {}
  }
  
  export default (state = initialState, action) => {
    switch (action.type) { 
        case GET_USER_COUNTS_STARTED: {
            return {
                loading: true,
                errors: [],
                data: {}
            };
        }
        case GET_USER_COUNTS_SUCCESS: {
            return {
                loading: false,
                errors: [],
                data: action.payload
            };
        }
        case GET_USER_COUNTS_FILED:
            return {
                loading: false,
                errors: action.payload,
                data: {}
            };
        case GET_USER_COUNTS_CLEAR:
            return {
                loading: false,
                errors: [],
                data: state.data
            };
    }
    return state;
  };