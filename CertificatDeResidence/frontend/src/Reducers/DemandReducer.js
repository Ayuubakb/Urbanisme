import {GET_DEMAND_SUCCESS,GET_DEMAND_FAIL} from '../Actions/types'

const initialState={
    demand:{},
    err:false,
    isLoading:false
}
const DemandReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_DEMAND_SUCCESS:
            return{
                ...state,
                demand:action.payload,
                err:false,
            }
        case GET_DEMAND_FAIL:
            return{
                ...state,
                demand:action.payload,
                err:true,
            }
        default:
            return state
    }
}
export default DemandReducer