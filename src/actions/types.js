/* Auth types */
export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';

/* GYMS Types */
/* GET */
export const FETCH_GYM_COMMENTS = 'fetch_gym_comments';
export const FETCH_GYM_TRAINERS = 'fetch_gym_trainers';
export const FETCH_GYM = 'fetch_gym';
export const FETCH_NEWEST_GYMS = 'fetch_newest_gyms';
/* POST */
export const FIND_GYMS = 'find_gyms';
export const CREATE_GYM_COMMENTS = 'create_gym_comments';
export const CREATE_GYM_RATING = 'create_gym_rating';

/* Current User Types*/
/* GET */
export const FETCH_CURRENT_USER = 'fetch_current_user';
export const FETCH_CURRENT_USER_AVAILABLE_GYMS = 'fetch_current_user_available_gyms';

/* POST */
export const CREATE_GYM = 'create_gym';
export const CREATE_POST = 'create_post';
export const JOIN_GYM = 'join_gym';
/* PUT */
export const BECOME_TRAINER = 'become_trainer';

/* POSTS Types*/
/* GET */
export const FETCH_NEWEST_POST = 'fetch_newest_post';
export const FETCH_POST = 'fetch_post';
export const LOADING = 'loading';

/* USERS Types */
/* GET */
export const FETCH_USER = 'fetch_user';
export const FETCH_USER_COMMENTS = 'fetch_user_comments';
export const FETCH_USER_POSTS = 'fetch_user_posts';
/* POSTS */
export const CREATE_USER_COMMENTS = 'create_user_comments';
export const CREATE_USER_RATING = 'create_user_rating';

/* ERRORS */
export const ERROR = 'error';