import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, } from 'react-router-dom';
import { Provider, } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers, } from 'redux';
import authReducer from './redux/reducers/auth';
// import vacationsReducer from './redux/reducers/vacations';
import thunk from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
  // vacation: vacationsReducer,
});

const store = createStore(rootReducers, composeEnhancers(
  applyMiddleware(thunk),
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);

serviceWorker.unregister();
