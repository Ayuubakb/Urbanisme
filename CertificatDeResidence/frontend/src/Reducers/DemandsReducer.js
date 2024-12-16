import { ADD_DEMANDS_FAIL, ADD_DEMANDS_SUCCESS, GET_DEMANDS_FAIL, GET_DEMANDS_SUCCESS } from "../Actions/types"


const initialState={
    demands:[],
    err:false,
    isLoading:false
}
const DemandsReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_DEMANDS_SUCCESS:
            return{
                ...state,
                demands:action.payload,
                err:false,
            }
        case GET_DEMANDS_FAIL:
            return{
                ...state,
                demands:[],
                err:true,
            }
        case ADD_DEMANDS_SUCCESS:
            return{
                ...state
            }
        case ADD_DEMANDS_FAIL:
            return{
                ...state
            }
        default:
            return state
    }
}

export default DemandsReducer