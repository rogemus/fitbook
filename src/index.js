import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {AUTH_USER, FETCH_CURRENT_USER} from './actions/types';

import App from './components/app';
import SignIn from './components/pages/auth/signIn/signIn';
import SignOut from './components/pages/auth/signOut/signOut';
import Home from './components/pages/homePage/home';
import requireAuth from './components/pages/auth/requireAuth';
import CurrentUserPage from './components/pages/currentUserPage/currentUserPage';
import CreateGymsPage from './components/pages/createGymsPage/createGymsPage';
import CreatePostPage from './components/pages/createPostPage/createPostPage';
import PostPage from './components/pages/postPage/postPage';
import GymPage from './components/pages/gymPage/gymPage';
import UserPage from './components/pages/userPage/userPage';
import E404 from './components/pages/errros/e404';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
const current_user = localStorage.getItem('current_user');

if (token) {
	store.dispatch({type: AUTH_USER});
	store.dispatch({
		type: FETCH_CURRENT_USER,
		payload: JSON.parse(current_user)
	});
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home}/>
				<Route path="signin" component={SignIn}/>
				<Route path="signout" component={SignOut}/>
				<Route path="gyms/:id" component={GymPage}/>
				<Route path="posts/:id" component={PostPage}/>
				<Route path="users/:id" component={UserPage}/>
				<Route path="createpost" component={requireAuth(CreatePostPage)}/>
				<Route path="me" component={requireAuth(CurrentUserPage)}>
					<Route path="creategym" component={requireAuth(CreateGymsPage)}/>
				</Route>
				<Route path="*" component={E404}/>
			</Route>
		</Router>
	</Provider>
	, document.querySelector('.app')
);