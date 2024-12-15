import React, { useEffect } from 'react'
import { getUser } from '../Actions/Authentication'
import { Outlet, useNavigate } from 'react-router-dom'
import MqademSideBar from '../Components/MqademSideBar'
import { useDispatch } from 'react-redux'

const MqademLayout = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const getData=async()=>{
    const res=await dispatch(getUser())
    if(res.err)
      navigate("/login")
  }
  useEffect(()=>{
    const role=localStorage.getItem("role")
    if(role!=null && role==="Mqadem")
      getData() 
    else
      navigate("/")
  },[])
  return (
    <section className='mqademLayout'>
      <MqademSideBar/>
      <Outlet/>
    </section>
  )
}

export default MqademLayout