import  { GET_EVENT, EVENT_LOADING } from '../actions/types'

const initialState = {
    companyevents:{},
    event_loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case EVENT_LOADING:
            return {
                ...state,
                event_loading: true
            
            }
        case GET_EVENT:
            return {
                ...state,
                companyevents: action.payload,
                event_loading: false
            }
        default:
            return state;
        
    }
}