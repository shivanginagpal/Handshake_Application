import  { GET_JOB_STUDENT, JOB_STUDENT_LOADING } from '../actions/types'

const initialState = {
    jobstudents:{},
    jobstudent_loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case JOB_STUDENT_LOADING:
            return {
                ...state,
                jobstudent_loading: true
            
            }
        case GET_JOB_STUDENT:
            return {
                ...state,
                jobstudents: action.payload,
                jobstudent_loading: false
            }
        default:
            return state;
        
    }
}