import React from 'react'

const ButtonSecondary = ({fct,text,className,type}) => {
  return (
    <button className={className} type={type} onClick={fct}>
        {text}
    </button>
  )
}

export default ButtonSecondary