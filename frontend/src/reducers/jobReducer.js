import  { GET_JOB, JOB_LOADING } from '../actions/types'

const initialState = {
    companyjobs:{},
    job_loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case JOB_LOADING:
            return {
                ...state,
                job_loading: true
            
            }

        case GET_JOB:
            return {
                ...state,
                companyjobs: action.payload,
                job_loading: false
            }
            
        default:
            return state;
        
    }
}