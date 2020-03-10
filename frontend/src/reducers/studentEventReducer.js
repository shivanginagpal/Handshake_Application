import  { GET_EVENT_STUDENT, EVENT_STUDENT_LOADING } from '../actions/types'

const initialState = {
    eventstudents:{},
    eventstudent_loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case EVENT_STUDENT_LOADING:
            return {
                ...state,
                eventstudent_loading: true
            
            }
        case GET_EVENT_STUDENT:
            return {
                ...state,
                eventstudents: action.payload,
                eventstudent_loading: false
            }
        default:
            return state;
        
    }
}