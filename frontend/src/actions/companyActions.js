import axios from 'axios';
import { GET_JOB, GET_EVENT, JOB_LOADING, EVENT_LOADING, GET_JOB_STUDENT, 
    GET_EVENT_STUDENT, JOB_STUDENT_LOADING, EVENT_STUDENT_LOADING } from './types';

export const getCompanyJobs = (id) => dispatch => {
    dispatch(setJobLoading());
    console.log("id", id);
    axios('/getJobDetails', 
        {
            method: 'get',
            params: { "id": id }
        })
        .then(res =>
            dispatch({
                type: GET_JOB,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_JOB,
                payload: {}
            })
        );
}

export const getCompanyEvents = (id) => dispatch => {
    dispatch(setEventLoading());
    console.log("id", id);
    axios('/getEventDetails',
        {
            method: 'get',
            params: { "id": id }
        })
        .then(res =>
            dispatch({
                type: GET_EVENT,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_EVENT,
                payload: {}
            })
        );
}

export const getStudentsForJob = (job_id) => dispatch => {
    dispatch(setJobStudentLoading());
    console.log("id", job_id);
    axios('getStudentDetailsForJob', {
        method: 'get',
        params:{"job_id": job_id}
        })
        .then(res =>
            dispatch({
                type: GET_JOB_STUDENT,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_JOB_STUDENT,
                payload: {}
            })
        );
}

export const getStudentsForEvent = (event_id) => dispatch => {
    dispatch(setEventStudentLoading());
    console.log("id", event_id);
    axios('api/eventPosts/getStudentDetails', {
        method: 'get',
        params:{"event_id": event_id}
        })
        .then(res =>
            dispatch({
                type: GET_EVENT_STUDENT,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_EVENT_STUDENT,
                payload: {}
            })
        );
}

export const setJobStudentLoading = () => {
    return {
        type: JOB_STUDENT_LOADING
    }
}

export const setEventStudentLoading = () => {
    return {
        type: EVENT_STUDENT_LOADING
    }
}

//Loading company jobs
export const setJobLoading = () => {
    return {
        type: JOB_LOADING
    }
}

//Loading company events
export const setEventLoading = () => {
    return {
        type: EVENT_LOADING
    }
}