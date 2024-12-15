import React, { useState } from 'react'
import Input from '../Components/Input'
import ButtonSecondary from '../Components/ButtonSecondary'
import { FaLock } from 'react-icons/fa'
import { login } from '../Actions/Authentication'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [logInputs,setLogInput]=useState({num_immatriculation:"",password:""})
  const handleChange=(e)=>{
    setLogInput((prev)=>{return {...prev,[e.target.name]:e.target.value}})
  }
  const [err,setErr]=useState("")
  const handleSubmit=async(e)=>{
    e.preventDefault()
    setErr("")
    if(logInputs.num_immatriculation==="" || logInputs.password==="")
      setErr("Remplis Tous Les Champs")
    else{
      const res=await dispatch(login(logInputs))
      if(res.isLogged){
        if(res.userRole==="Caïd")
          navigate('/Caid/Demands')
        else
          navigate('/Mqadem/Tasks')
      }
      else
        setErr(res.err)
    }
  }
  return (
    <section className='login'>
      <div className='container'>
        <div className='lock'>
          <FaLock size={"35px"} />
        </div>
        <form onSubmit={handleSubmit}>
          <p style={{color:"red", fontWeight:"bold", textAlign:"center",height:"25px"}}>{err!==""?err:null}</p>
          <Input
            label="N° d'immatriculation : "
            type="text"
            value={logInputs.num_immatriculation}
            fct={handleChange}
            name="num_immatriculation"
          />
          <Input
            label="Mot de passe"
            type="password"
            value={logInputs.password}
            fct={handleChange}
            name="password"
          />
          <ButtonSecondary className="buttonPrimary" type="submit" text="S'authentifier"/>
        </form>
      </div>
    </section>
  )
}

export default Login