import React,{useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUser } from '../Actions/Authentication'
import { getZonesDemands } from '../Actions/Demands'
import CaidSideBar from '../Components/CaidSideBar'

const CaidLayout = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const getData=async()=>{
    const res=await dispatch(getUser())
    if(res.err)
      navigate("/login")
    else{
      const resDemand=await dispatch(getZonesDemands("Caïd"))
      if(resDemand.zoneNull)
        navigate("/")
    }
  }
  useEffect(()=>{
    const role=localStorage.getItem("role")
    if(role!=null && role==="Caïd")
      getData() 
    else
      navigate("/")
  },[])
  return (
    <section className='layout'>
      <CaidSideBar role={"Caïd"}/>
      <Outlet/>
    </section>
  )
}

export default CaidLayout