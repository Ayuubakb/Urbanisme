import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import AvancementBanner from '../Components/AvancementBanner'

const CitizenLayout = () => {
    const [isOpen,setIsOpen]=useState(false)
  return (
    <section style={{position:"relative"}}>
        {
            isOpen &&   
            <AvancementBanner
                handleClose={()=>setIsOpen(false)}
            />
        }
        <NavBar
            handleOpen={()=>setIsOpen(true)}
        />
        <Outlet/>
    </section>
  )
}

export default CitizenLayout