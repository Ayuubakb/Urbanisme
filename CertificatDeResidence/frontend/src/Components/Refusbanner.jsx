import React, { useState } from 'react'
import ButtonSecondary from './ButtonSecondary'
import { FaXmark } from 'react-icons/fa6'

const Refusbanner = ({motif,setMotif,fct,setIsClosed}) => {
    const handleClose=()=>{
        setIsClosed(true)
    }
  return (
    <div className='avBanner'>
        <div style={{position:"relative"}}>
        <FaXmark size={"22px"} className='xmark' onClick={handleClose}/>
        <h1>Refus de demande</h1>
        <h2>Entrer le motif de refus :</h2>
        <textarea value={motif} onChange={(e)=>{setMotif(e.target.value)}}>

        </textarea>
        <div>
            <ButtonSecondary
                fct={fct}
                text="Refuser"
                className={"buttonSecondary"}
            />
        </div>
        </div>
    </div>
  )
}

export default Refusbanner