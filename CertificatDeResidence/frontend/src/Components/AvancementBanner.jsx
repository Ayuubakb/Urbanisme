import React, { useState } from 'react'
import Input from './Input'
import ButtonSecondary from './ButtonSecondary'
import { FaXmark } from 'react-icons/fa6'

const AvancementBanner = ({handleClose}) => {
    const [code,setCode]=useState("")
    const handleSuivre=()=>{
        if(code!==""){
            handleClose()
            window.location.href=`${process.env.REACT_APP_CLIENT_URI}suivie/${code}`
        }
    }
  return (
    <div className='avBanner'>
        <div style={{position:"relative"}}>
        <FaXmark size={"22px"} className='xmark' onClick={handleClose}/>
        <h1>Service Suivie</h1>
        <h2>Entrer le code de votre demande :</h2>
        <Input
            type="text"
            fct={(e)=>setCode(e.target.value)}
            value={code}
            name={"code"}
        />
        <div>
            <ButtonSecondary
                fct={handleSuivre}
                text="Consulter"
                className={"buttonSecondary"}
            />
        </div>
        </div>
    </div>
  )
}

export default AvancementBanner