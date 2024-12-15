import React from 'react'

const Input = ({label,name,type,fct,value}) => {
  return (
    <div className='inputContainer'>
        <label>{label}</label>
        <input
            type={type}
            name={name}
            onChange={fct}
            value={value}
        />
    </div>
  )
}

export default Input