import React, { useEffect } from 'react'
import { getUser } from '../Actions/Authentication'
import { Outlet, useNavigate } from 'react-router-dom'
import CaidSideBar from '../Components/CaidSideBar'
import { useDispatch } from 'react-redux'
import { getZonesDemands } from '../Actions/Demands'

const MqademLayout = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const getData=async()=>{
    const res=await dispatch(getUser())
    if(res.err)
      navigate("/login")
    else{
      const resDemand=await dispatch(getZonesDemands("Mqadem"))
      if(resDemand.zoneNull)
        navigate("/")
    }
  }
  useEffect(()=>{
    const role=localStorage.getItem("role")
    if(role!=null && role==="Mqadem")
      getData() 
    else
      navigate("/")
  },[])
  return (
    <section className='layout'>
      <CaidSideBar/>
      <Outlet/>
    </section>
  )
}

export default MqademLayout