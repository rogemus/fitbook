import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {AUTH_USER, FETCH_CURRENT_USER} from './actions/types';
import {refreshToken} from './actions/authActions';

import requireAuth from './components/common/auth/requireAuth';
import App from './containers/app';
import SignIn from './containers/signIn/signIn';
import SignOut from './containers/signOut/signOut';
import Home from './containers/homePage/home';
import CreateGymsPage from './containers/createGymsPage/createGymsPage';
import CreatePostPage from './containers/createPostPage/createPostPage';
import UpdatePostPage from './containers/updatePostPage/updatePostPage';
import PostPage from './containers/postPage/postPage';
import GymPage from './containers/gymPage/gymPage';
import UserPage from './containers/userPage/userPage';
import E404 from './containers/errorsPage/e404';
import TrainersListPage from './containers/trainersListPage/trainersListPage';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
const current_user = localStorage.getItem('current_user');

if (token) {
	store.dispatch({type: AUTH_USER});
	refreshToken(token);
	store.dispatch({
		type: FETCH_CURRENT_USER,
		payload: JSON.parse(current_user)
	});
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
			<Route path="/" component={App}>
				<IndexRoute component={Home}/>
				<Route path="signin" component={SignIn}/>
				<Route path="signout" component={SignOut}/>
				<Route path="gyms/:id" component={GymPage}/>
				<Route path="posts/:id" component={PostPage}/>
				<Route path="users/:id" component={UserPage}/>
				<Route path="createpost" component={requireAuth(CreatePostPage)}/>
				<Route path="updatepost/:id" component={requireAuth(UpdatePostPage)}/>
				<Route path="creategym" component={requireAuth(CreateGymsPage)}/>
				<Route path="trainers" components={TrainersListPage}/>
				<Route path="*" component={E404}/>
			</Route>
		</Router>
	</Provider>
	, document.querySelector('.app')
);