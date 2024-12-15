import { GET_USER_FAIL, GET_USER_SUCCESS } from "../Actions/types"


const initialState={
    user:{},
    err:false,
    isLoading:false
}

const AuthenticationReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_USER_FAIL :
            return{
                ...state,
                user:{},
                err:true,
                isLoading:false
            }
        case GET_USER_SUCCESS :
            return{
                ...state,
                user:action.payload,
                err:false,
                isLoading:false
            }
        default:
            return state;
    }
}

export default AuthenticationReducer;