import  { GET_EDUCATION, EDU_LOADING } from '../actions/types'

const initialState = {
    education: {},
    eduLoading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case EDU_LOADING:
            return {
                ...state,
                eduLoading: true
            
            }
        
        case GET_EDUCATION:
            return {
                ...state,
                education: action.payload,
                eduLoading: false
            }
        
        default:
            return state;
        
    }
}