import {
    GET_CURRENTUSER_INFO_STARTED,
    GET_CURRENTUSER_INFO_SUCCESS,
    GET_CURRENTUSER_INFO_FILED
  } from './../../actionTypes';
  
  const initialState = {
    loading: false,
    errors: [],
    data: {}
  }
  
  export default (state = initialState, action) => {
    switch (action.type) { 
        case GET_CURRENTUSER_INFO_STARTED: {
            return {
                loading: true,
                errors: [],
                data: {}
            };
        }
        case GET_CURRENTUSER_INFO_SUCCESS: {
            return {
                loading: false,
                errors: [],
                data: action.payload.info
            };
        }
        case GET_CURRENTUSER_INFO_FILED:
            return {
                loading: false,
                errors: action.payload,
                data: {}
            };
    }
    return state;
  };