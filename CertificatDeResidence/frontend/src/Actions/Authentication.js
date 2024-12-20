import { GET_DEMAND_FAIL, GET_DEMANDS_FAIL, GET_USER_FAIL, GET_USER_SUCCESS, GET_USERS_FAIL } from "./types"

export const login=(loginInputs)=>async dispatch=>{
    const response=await fetch(`${process.env.REACT_APP_SERVER_URI}authenticate/login`,{
        method:'POST',
        body:JSON.stringify(loginInputs),
        credentials:"include",
        headers:{
            'Content-type':'application/json'
        }
    })
   
    if(!response.ok){
        dispatch({
            type:GET_USER_FAIL,
        })
        return {err:"Données Invalides"}
    }
    const data=await response.json();
    localStorage.setItem("userId",data.id_employe);
    localStorage.setItem("id_zone",data.id_zone);
    localStorage.setItem("role",data.type_employe)
    dispatch({
        type:GET_USER_SUCCESS,
        payload:data
    })
    return {isLogged:true,userRole:data.type_employe}
}
export const logout=()=>dispatch=>{
    localStorage.setItem("userId",null);
    localStorage.setItem("id_zone",null);
    localStorage.setItem("role",null)
    localStorage.clear()
    dispatch({
        type:GET_USER_FAIL,
    })
    dispatch({
        type:GET_DEMANDS_FAIL,
    })
    dispatch({
        type:GET_DEMAND_FAIL,
    })
    return true;
}
export const getUser=()=>async dispatch=>{
    const userId=localStorage.getItem("userId")
    if(userId!=null){
        const response=await fetch(`${process.env.REACT_APP_SERVER_URI}user/get/${userId}`,{
            method:'GET',
            credentials:"include"
        })
    
        if(!response.ok){
            dispatch({
                type:GET_USER_FAIL,
            })
            return {err:true,UserFound:false}
        }
        const data=await response.json();
        dispatch({
            type:GET_USER_SUCCESS,
            payload:data
        })
        return {err:false}
    }
    return {err:true,isAuthenticated:false}
}