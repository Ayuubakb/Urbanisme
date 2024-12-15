import { GET_REGION_FAIL, GET_REGION_SUCCES, GET_VILLE_FAIL, GET_VILLE_SUCCES, GET_ZONES_FAIL, GET_ZONES_SUCCES } from "../Actions/types"


const initialState={
    villes:[],
    regions:[],
    zones:[],
    err:false,
    isLoading:false
}

const GeographyReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_REGION_SUCCES:
            return{
                ...state,
                regions:action.payload,
                err:false,
                isLoading:false
            }
        case GET_VILLE_SUCCES:
            return{
                ...state,
                villes:action.payload,
                err:false,
                isLoading:false
            }
        case GET_ZONES_SUCCES:
            return{
                ...state,
                zones:action.payload,
                err:false,
                isLoading:false
            }
        case GET_REGION_FAIL:
            return{
                ...state,
                regions:[],
                err:true,
                isLoading:false
            }
        case GET_VILLE_FAIL:
            return{
                ...state,
                villes:[],
                err:true,
                isLoading:false
            }
        case GET_ZONES_FAIL:
            return{
                ...state,
                zones:[],
                err:true,
                isLoading:false
            }
        default:
            return state
    }
}

export default GeographyReducer