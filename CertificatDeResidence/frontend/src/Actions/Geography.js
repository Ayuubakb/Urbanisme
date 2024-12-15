import { GET_REGION_SUCCES, GET_REGION_FAIL, GET_VILLE_FAIL, GET_VILLE_SUCCES, GET_ZONES_FAIL, GET_ZONES_SUCCES } from "./types"

export const getRegions=()=>async dispatch=>{
    const response=await fetch(`${process.env.REACT_APP_SERVER_URI}geography/region/get/all`,{
            method:'GET',
            credentials:'include'
        })
    if(!response.ok){
        dispatch({
            type:GET_REGION_FAIL
        })
        return {isFetched:false,err:"Une Erreur est survenu"}
    }
    const data=await response.json();
    console.log(data);
    
    dispatch({
        type:GET_REGION_SUCCES,
        payload:data
    })
    return {isFetched:true}
}
export const getVillesParRegion=(id)=>async dispatch=>{
    const response=await fetch(`${process.env.REACT_APP_SERVER_URI}geography/city/getByRegion/${id}`,{
            method:'GET',
            credentials:'include'
        })
    if(!response.ok){
        dispatch({
            type:GET_VILLE_FAIL
        })
        return {isFetched:false,err:"Une Erreur est survenu"}
    }
    const data=await response.json();
    console.log(data);
    
    dispatch({
        type:GET_VILLE_SUCCES,
        payload:data
    })
    return {isFetched:true}
}
export const getZonesParVilles=(id)=>async dispatch=>{
    const response=await fetch(`${process.env.REACT_APP_SERVER_URI}geography/zone/getByVille/${id}`,{
            method:'GET',
            credentials:'include'
        })
    if(!response.ok){
        dispatch({
            type:GET_ZONES_FAIL
        })
        return {isFetched:false,err:"Une Erreur est survenu"}
    }
    const data=await response.json();
    console.log(data);
    
    dispatch({
        type:GET_ZONES_SUCCES,
        payload:data
    })
    return {isFetched:true}
}