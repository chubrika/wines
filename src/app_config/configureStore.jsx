import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

export function configureStore(rootReducers, enchancer) {
    const store = createStore(createReducer(rootReducers), enchancer);
    store.reducers = rootReducers;
    return store;
}

export function createReducer(rootReducers) {
    const appReducer = combineReducers({
        form: reduxFormReducer,
        ...rootReducers
    });

    return (state, action) => {
        let tmpState = {...state};
        if (action.type === 'CLEAR_REDUX_STORE') {
            // eslint-disable-next-line
            action.payload.map((item) => {
                if (typeof item === 'object') {
                    tmpState[item.name] = item.initialState;
                }
                else {
                    tmpState[item] = undefined;
                }
            })
        }
        
        return appReducer({...tmpState}, action);
    }
}

export function injectDynamicReducer(store, name, dynamicReducer) {
    store.dynamicReducers[name] = dynamicReducer;
    store.replaceReducer(createReducer(store.reducers));
}