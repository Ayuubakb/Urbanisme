import React, { useEffect, useState } from 'react'
import ProgressionLine from '../Components/ProgressionLine'
import { useDispatch } from 'react-redux'
import { getDemandStatus } from '../Actions/Demands'
import Waiting from '../Components/Waiting'
import { useNavigate } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import { FaX } from 'react-icons/fa6'

const Avancement = () => {
  const navigate=useNavigate()
  const [steps,setSteps]=useState([]);
  const dispatch=useDispatch()
  const [data,setData]=useState({
    nom:"",
    prenom:"",
    status:"",
    motifRefus:""
  })
  const [codeFound,SetCodeFound]=useState(null)
  const [err,setErr]=useState("")
  const [isFetched,SetIsFetched]=useState(null)
  const [isLoading,SetIsLoading]=useState(true)

  const getData=async()=>{
    const url= new URL(window.location.href).pathname;
    const code=url.split('/')[2]
    const id_demand=code.split('-')[3]
    if(!id_demand || id_demand===undefined || code.split('-').length !== 4){
      SetCodeFound(false)
      SetIsLoading(false)
    }else{
      const res=await dispatch(getDemandStatus(id_demand))
      if(res.isFetched)
        setData(res.data)
      else
        setErr(res.err)
      SetIsFetched(res.isFetched)
      setTimeout(()=>{
        SetIsLoading(false)
      },2000)
    }
  }
  useEffect(()=>{
    switch(data.status){
      case "Envoyer_au_Caïd":
        setSteps(["Envoyer au Caïd","Enquête en cours","Générer"])
        setData(prev=>{return {...prev,status:1}})
        break;
      case "Refuser_par_le_Caïd":
        setSteps(["Envoyer au Caïd","Refuser par le Caïd"])
        setData(prev=>{return {...prev,status:2}})  
        break;
      case "Enquête_en_cours":
        setSteps(["Envoyer au Caïd","Enquête en cours","Générer"])
        setData(prev=>{return {...prev,status:2}})  
        break;
      case "Refuser_par_Mqadem":
        setSteps(["Envoyer au Caïd","Enquête en cours","Refuser par Mqadem"])
        setData(prev=>{return {...prev,status:3}})  
        break;
      case "Générer":
        setSteps(["Envoyer au Caïd","Enquête en cours","Générer"])
        setData(prev=>{return {...prev,status:3}})  
        break;
    }
  },[data])
  useEffect(()=>{
      getData()
  },[])

  if(isLoading)
    return <section className="avancement"> <Waiting/></section>
  if(err!=="" && err==="Cette demande n'existe pas")
    return (
      <section className="avancement">
        <div className='errContainer ntfound'>
          <h1>404</h1>
          <h2>{err}</h2>
          <p>Veuillez verifier le code de demande insérer</p>
        </div>
      </section>
    )
  if(codeFound===false)
    return(
      <section className="avancement"> 
        <div className='errContainer format'>
          <div className='Xmark'>
            <FaX className="icon" size={"65px"} color='red' />
          </div>
          <h1>Le code entrer est de format incorrecte</h1>
          <p>http://localhost:3000/suivie/<span>Zx-Dy-zzz</span></p>
        </div>
      </section>
    )
  return (
    <section className="avancement">
      <div className='container'>
        <div className='status'>
          <h1>Bonjour, <span>{data.nom} {data.prenom}</span></h1>
          <p>Votre demande de certfifcat de résidence est :</p>
          <ProgressionLine
              currentStep={data.status}
              steps={steps}
          />          
        {
          data.motifRefus!=="" &&
            <div className='motif_refus'>
              <h2>Pour la cause suivante:</h2>
              <p>{data.motifRefus}</p>
            </div>
        }
        </div>
        <div className='reclamatioContainer'>
          <p>Pour toute réclamation : <span style={{cursor:"pointer"}} onClick={()=>navigate(`/Reclamation`)}>Vers page de reclamations</span></p>
        </div>
      </div>
    </section>
  )
}

export default Avancement