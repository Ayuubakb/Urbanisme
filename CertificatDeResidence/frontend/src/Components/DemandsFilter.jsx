import React, { useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import ButtonSecondary from './ButtonSecondary'

const DemandsFilter = ({setFilters,filters}) => {
  const handleChange=(e)=>{
    setFilters((prev)=>{return {...prev,[e.target.name]:e.target.value}})
  }
  return (
    <div className='filterDemande'>
      <div> 
        <FaFilter color=''/>
      </div>
      <div>
        <label>Nom/Prénom :</label>
        <input
          type='text'
          name='nom'
          value={filters.nom}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Trie par date:</label>
        <select name='sort' onChange={handleChange}>
          <option value={"Desc"} selected>Plus récent d'abord</option>
          <option value={"Asc"}>Plus ancien d'abord</option>
        </select>
      </div>
      <div>
        <ButtonSecondary
          text={"Chercher"}
          className={"buttonPrimary"}
        />
      </div>
    </div>
  )
}

export default DemandsFilter