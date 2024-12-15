import { ADD_DEMANDS_FAIL, ADD_DEMANDS_SUCCESS, GET_DEMANDS_FAIL, GET_DEMANDS_SUCCESS,GET_DEMAND_FAIL, GET_DEMAND_SUCCESS } from "./types"

export const getZonesDemands=()=>async dispatch=>{
    const zone_id=localStorage.getItem("id_zone")
    if(zone_id!=null){
        const response=await fetch(`${process.env.REACT_APP_SERVER_URI}demands/get_zone/${zone_id}`,{
            method:'GET',
            credentials:'include'
        })
        if(!response.ok){
            dispatch({
                type:GET_DEMANDS_FAIL
            })
            return {isFetched:false,err:"Une Erreur est survenu"}
        }
        const data=await response.json();
        dispatch({
            type:GET_DEMANDS_SUCCESS,
            payload:data
        })
        return {isFetched:true}
    }
    return {isFetched:false,zoneNull:true}
}

export const addDemandFiles=(isMilitary,inputs)=>async dispatch=>{
    const formData=new FormData()
    formData.append("facture_electricite",inputs.facture_electricite)
    formData.append("document_emploie",inputs.document_emploie)
    formData.append("certif_priorite",inputs.certif_priorite)
    if(!isMilitary)
        formData.append("certif_presence",inputs.certif_presence)
    const response=await fetch(`${process.env.REACT_APP_SERVER_URI}demands/addFiles/${isMilitary}`,{
        method:'POST',
        body:formData,
        credentials:'include'
    })
    if(!response.ok)
        return {isAdded:false,err:"Une Erreur lors de traitement des fichiers"}
    const data=await response.text();
    return {isAdded:true,id_file:data}
}

export const addDemandApi=(id_file,inputs)=>async dispatch=>{
    id_file=parseInt(id_file)
    const demand={
        id_zone:inputs.id_zone,
        nom_emetteur:inputs.nom_emetteur,
        prenom_emetteur:inputs.prenom_emetteur,
        address:inputs.address,
        cin:inputs.cin,
        telephone:inputs.telephone,
        email:inputs.email,
        payment_reference:inputs.payment_reference,
    }
    console.log(demand);
    const response=await fetch(`${process.env.REACT_APP_SERVER_URI}demands/add/${id_file}`,{
        method:'POST',
        body:JSON.stringify(demand),
        credentials:'include',
        headers:{
            'Content-type':'application/json'
        }
    })
    if(!response.ok)
        return {isAdded:false,err:"Une Erreur lors d'enregistrelent du demande"}
    const data=await response.text();
    return {isAdded:true,code:data}
}

export const getDemandStatus=(id_demand)=>async dispatch=>{
    const response=await fetch(`${process.env.REACT_APP_SERVER_URI}demands/getStatus/${parseInt(id_demand)}`,{
        method:'GET',
        credentials:'include'
    })
    if(!response.ok){
        switch(response.status){
            case 500:
                return {isFetched:false,err:"Une Erreur de notre part est survenue"}
            case 404:
                return {isFetched:false,err:"Cette demande n'existe pas"}
            default:
                return {isFetched:false,err:"Une Erreur de notre part est survenues"}
        }
    }
    const data=await response.json();
    return {isFetched:true, data:data}
}
export const getDemandById=(id_demand)=>async dispatch=>{
    const response=await fetch(`${process.env.REACT_APP_SERVER_URI}demands/get_id/${id_demand}`,{
        method:'GET',
        credentials:'include'
    })
    if(!response.ok){
        dispatch({
            type:GET_DEMAND_FAIL
        })
        return {isFetched:false,err:"Une Erreur est survenu"}
    }
    const data=await response.json();
    dispatch({
        type:GET_DEMAND_SUCCESS,
        payload:data
    })
    return {isFetched:true}
}