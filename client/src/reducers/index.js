import {combineReducers } from 'redux';
import posts from './Posts';
import auth from './auth';
import users from './users';

export default combineReducers({
    posts ,auth ,users
});
