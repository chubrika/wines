import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { configureStore } from './app_config/configureStore';
import apiError from './app_config/apiError';
import apiMiddleware from './app_config/apiMiddleware';
import * as globalReducer from './state/Reducer/index'
import Routes from './root/Routes';
import * as i18n from 'i18n-js';
import { isEmpty } from 'lodash';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/global.scss';
import { ka, en, ru } from './assets/lang';
i18n.fallbacks = true;
i18n.translations = { ka, en, ru };

const reducer = { ...globalReducer };
let enchancer = applyMiddleware(thunkMiddleware, apiMiddleware, apiError);
let store = configureStore(reducer, enchancer);



const value = localStorage.getItem('LANG');
let item = JSON.parse(value);

if (!isEmpty(item)) {
  i18n.locale = item.lang.name;
}
else {
  i18n.locale = 'ka';
  let langItem = { lang: { name: 'ka' } };
  localStorage.setItem("LANG", JSON.stringify(langItem));
}

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>, 
document.getElementById('wine'));
serviceWorker.unregister();
