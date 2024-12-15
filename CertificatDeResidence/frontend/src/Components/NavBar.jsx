import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ButtonSecondary from './ButtonSecondary'

const NavBar = ({handleOpen}) => {
  const navigate=useNavigate()
  return (
    <div className='navbar'>
      <div className='logoContainer' style={{cursor:"pointer"}} onClick={()=>navigate('/')}>
        <img className="img" src={`${process.env.REACT_APP_CLIENT_URI}Assets/fr.svg`}/>
      </div>
      <div className='container_btn_paths'>
        <div className='pathsContainer'>
          <div>
            <Link className='link' to='/Reclamation'>Reclamer</Link>
          </div>
          <div>
            <Link className='link' to='/demand'>Demander</Link>
          </div>
          <div>
            <p className='link' style={{cursor:"pointer"}} onClick={handleOpen}>Suivre la demande</p>
          </div>
        </div>
        <div className='buttonContainer'>
          <ButtonSecondary className={"buttonSecondary"} fct={()=>navigate('/login')} text="S'authentifier"/>
        </div>
      </div>
    </div>
  )
}

export default NavBar