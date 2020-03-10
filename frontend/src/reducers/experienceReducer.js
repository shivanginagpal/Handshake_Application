import  { GET_EXPERIENCE, EXP_LOADING } from '../actions/types'

const initialState = {
    experience: {},
    expLoading: false,
};

export default function(state = initialState, action){
    switch(action.type){
        case EXP_LOADING:
            return {
                ...state,
                expLoading: true
            }
        
        case GET_EXPERIENCE:
            return {
            ...state,
            experience: action.payload,
            expLoading: false
        }
        
        default:
            return state;
        
    }
}