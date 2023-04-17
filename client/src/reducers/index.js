import {combineReducers } from 'redux';
import posts from './Posts';
import auth from './auth';
import userProfile from './userProfile';
import users from './users';
import alert from './alert'

export default combineReducers({
    posts ,auth ,userProfile,users,alert
});
