import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import educationReducer from './educationReducer';
import experienceReducer from './experienceReducer';
import jobReducer from './jobReducer';
import eventReducer from './eventReducer';
import studentJobReducer from './studentJobReducer';
import studentEventReducer from './studentEventReducer';

export default combineReducers({
    auth : authReducer,
    errors: errorReducer,
    profile: profileReducer,
    education: educationReducer,
    experience: experienceReducer,
    companyjobs: jobReducer,
    companyevents: eventReducer, 
    jobstudents: studentJobReducer,
    eventstudents: studentEventReducer
});