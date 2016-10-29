import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {AUTH_USER} from './actions/types';

import App from './components/app';
import SignIn from './components/page/Auth/SignIn/signIn';
import SignOut from './components/page/Auth/SignOut/signOut';
import Feature from './components/page/FeaturePage/feature';
import Home from './components/page/HomePage/home';
import RequireAuth from './components/page/Auth/require_auth';
import CurrentUserPage from './components/page/CurrentUserPage/currentUserPage';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
    store.dispatch({type: AUTH_USER});
}


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="signin" component={SignIn}/>
                <Route path="signout" component={SignOut}/>
                <Route path="me" component={RequireAuth(CurrentUserPage)} />
                <Route path="feature" component={RequireAuth(Feature)}/>
            </Route>
        </Router>
    </Provider>
    , document.querySelector('.container')
);
