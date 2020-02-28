import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types';

export const getCurrentProfile = (id) => dispatch => {
    dispatch(setProfileLoading());
    console.log("id", id);
    axios('/getStudentProfile',
    {
        method:'get',
        params: {"id":id}
    })
    .then(res=>
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    );
}

//Profile Loading 
export const setProfileLoading = () => {
    return{
        type: PROFILE_LOADING
    }
}

//clear profile
export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

export const createProfile = (profileData, history) => dispatch => {
    axios.post('/updateStudentBasic', profileData)
    .then(res => history.push('/viewStudentProfile'))
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}
export const addEducationRecord = (educationData, history) => dispatch => {
    axios.post('/updateStudentEducation', educationData)
    .then(res => history.push('/viewStudentProfile'))
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const addExperienceRecord = (experienceData, history) => dispatch => {
    axios.post('/updateStudentWorkExp', experienceData)
    .then(res => history.push('/viewStudentProfile'))
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}
