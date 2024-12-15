import { GET_USERS_FAIL, GET_USERS_SUCCESS } from "../Actions/types"

const initialState={
    employes:[],
    err:false,
    isLoading:false
}

const EmployeesReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_USERS_SUCCESS:
            return{
                ...state,
                state:action.payload,
                err:false,
                isLoading:false
            }
        case GET_USERS_FAIL:
            return{
                ...state,
                state:[],
                err:true,
                isLoading:false
            }
        default: 
            return state
    }
}

export default EmployeesReducer;