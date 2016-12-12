import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {AUTH_USER} from './actions/types';

import App from './components/app';
import SignIn from './components/pages/auth/signIn/signIn';
import SignOut from './components/pages/auth/signOut/signOut';
import Home from './components/pages/homePage/home';
import RequireAuth from './components/pages/auth/require_auth';
import CurrentUserPage from './components/pages/currentUserPage/currentUserPage';
import CurrentUserPageWithPost from './components/pages/currentUserPage/currentUserPageWithPost';
import CurrentUserPageWithGyms from './components/pages/currentUserPage/currentUserPageWithGyms';
import CreateGymsPage from './components/pages/createGymsPage/createGymsPage';
import CreatePostPage from './components/pages/createPostPage/createPostPage';
import GymPage from './components/pages/gymPage/gymPage';

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
				<Route path="gyms/:id" component={GymPage}/>
				<Route path="createpost" component={RequireAuth(CreatePostPage)}/>
				<Route path="me" component={RequireAuth(CurrentUserPage)}>
					<Route path="posts" component={RequireAuth(CurrentUserPageWithPost)}/>
					<Route path="gyms" component={RequireAuth(CurrentUserPageWithGyms)}/>
					<Route path="creategym" component={RequireAuth(CreateGymsPage)}/>
				</Route>
				<Route path="*" component={Home}/>
			</Route>
		</Router>
	</Provider>
	, document.querySelector('.app')
);
