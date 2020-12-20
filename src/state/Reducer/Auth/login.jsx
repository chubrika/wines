import {
    LOG_IN_STARTED,
    LOG_IN_SUCCESS,
    LOG_IN_FILED
  } from './../../actionTypes';
  
  const initialState = {
    loading: false,
    errors: [],
    data: {}
  }
  
  export default (state = initialState, action) => {
    switch (action.type) { 
        case LOG_IN_STARTED: {
            return {
                loading: true,
                errors: [],
                data: {}
            };
        }
        case LOG_IN_SUCCESS: {
            return {
                loading: false,
                errors: [],
                data: action.payload
            };
        }
        case LOG_IN_FILED:
            return {
                loading: false,
                errors: action.payload.response,
                data: {}
            };
    }
    return state;
  };