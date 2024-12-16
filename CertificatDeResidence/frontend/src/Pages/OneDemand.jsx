import React, { useEffect, useState } from 'react'
import { FaLeftLong, FaRightLong } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatus, changeStatusAndMotif, getDemandById, getZonesDemands } from '../Actions/Demands'
import Waiting from '../Components/Waiting'
import { Enquête_en_cours, Envoyer_au_Caïd, Refuser_par_le_Caïd } from '../Utils/Status'

const OneDemand = () => {
  const dispatch=useDispatch()
  const demand=useSelector((state)=>state.DemandReducer.demand)
  const [files,setFiles]=useState([])
  const [curent,setCurrent]=useState(0)
  const [isFetched,setIsFetched]=useState(null)
  const [isMilitary,setIsMilitary]=useState(null)
  const [isRefused,setIsRefused]=useState(false)
  const [motif,setMotif]=useState('')
  const getDemand=async()=>{
    const url=new URL(window.location.href).pathname
    const id_demand=url.split('/')[3]
    const res=await dispatch(getDemandById(id_demand))
    setIsFetched(res.isFetched)
  }
  useEffect(()=>{
    getDemand()
  },[])
  useEffect(()=>{
    if(isFetched){
      const filesTmp=demand.file
      setFiles([
        {
          name:"Facture d'électricite",
          src:filesTmp.facture_electricite,
          type:filesTmp.fe_contenttype
        },
        {
          name:"Certfifcat de Propriété",
          src:filesTmp.certif_priorite,
          type:filesTmp.cpr_contenttype
        },
        {
          name:"Document d'emploie",
          src:filesTmp.document_emploie,
          type:filesTmp.de_contenttype
        },
      ])
      if(filesTmp.certif_presence!=null){
        setFiles((prev)=>{return [...prev,{
          name:"Certificat de Présence",
          src:filesTmp.certif_presence,
          type:filesTmp.cp_contenttype
        }]})
        setIsMilitary(true)
      }else
        setIsMilitary(false)
    }
  },[isFetched])
  const handleRefuse=()=>{
    setIsRefused(true)
  }
  const handleCancel=()=>{
    setIsRefused(false)
  }
  const handleAccept=async()=>{
    const url=new URL(window.location.href).pathname
    const id_demand=url.split('/')[3]
    const res=await dispatch(changeStatus(Enquête_en_cours,id_demand))
    if(res.isUpdated){
      setIsFetched(null)
      getDemand()
      await dispatch(getZonesDemands())
    }
  }
  const handleConfirmRefuse=async()=>{
    const url=new URL(window.location.href).pathname
    const id_demand=url.split('/')[3]
    const res=await dispatch(changeStatusAndMotif(Refuser_par_le_Caïd,id_demand,motif))
    if(res.isUpdated){
      setIsFetched(null)
      getDemand()
      await dispatch(getZonesDemands())
    }
  }
  const handleNext=()=>{
    if(curent!==files.length - 1)
      setCurrent((prev)=>prev+1)
  }
  const handlePrev=()=>{
    if(curent!==0)
      setCurrent((prev)=>prev-1)
  }
  const genereateStatus=(status)=>{
    let tag;
    switch(status){
      case "Envoyer_au_Caïd":
        tag=<h1 style={{borderRadius:'10px',padding:'10px',marginTop:'55px',color:"white",backgroundColor:'gray'}}>En Attente</h1>
        break;
      case "Refuser_par_le_Caïd":
        tag=<h1 style={{borderRadius:'10px',padding:'10px',marginTop:'55px',color:"white",backgroundColor:'red'}}>Refus(1ère étape)</h1>
        break;
      case "Enquête_en_cours":
        tag=<h1 style={{borderRadius:'10px',padding:'10px',marginTop:'55px',color:"white",backgroundColor:'black'}}>Enquête en cours</h1>
        break;
      case "Refuser_par_Mqadem":
        tag=<h1 style={{borderRadius:'10px',padding:'10px',marginTop:'55px',color:"white",backgroundColor:'read'}}>Refus(2éme étape)</h1>
        break;
      case "Générer":
        tag=<h1 style={{borderRadius:'10px',padding:'10px',marginTop:'55px',color:"white",backgroundColor:'green'}}>Envoyée</h1>
        break;
      default :
        tag=<h1 style={{borderRadius:'10px',padding:'10px',marginTop:'55px',color:"white",backgroundColor:'green'}}>Envoyée</h1>
        break ;
    }
    return tag;
  }
  if(isFetched===null || isMilitary===null)
    return  <section className='outlet oneDemand'><Waiting/></section>
  return (
   <section className='outlet oneDemand'>
      <div className='container'>
        <div className='citoyenInputs'>
          <h1>Données entrées par le citoyen : </h1>
          <div>
            <label>Nom :</label>
            <p>{demand.nom_emetteur}</p>
          </div>
          <div>
            <label>Prénom :</label>
            <p>{demand.prenom_emetteur}</p>
          </div>
          <div>
            <label>Addresse :</label>
            <p>{demand.address}</p>
          </div>
          <div>
            <label>CIN :</label>
            <p>{demand.cin}</p>
          </div>
          <div>
            <label>Réference de payement :</label>
            <p>{demand.payment_reference}</p>
          </div>
          {
            demand.status!==Envoyer_au_Caïd?
              <>{genereateStatus(demand.status)}</>:
            !isRefused?
            <div className='btnContainer'>
              <button style={{backgroundColor:'red'}} onClick={handleRefuse}>Refuser</button>
              <button style={{backgroundColor:'rgb(201, 172, 70)'}} onClick={handleAccept}>Affecter Au Mqadem</button>
            </div>:
            <div className='motif'>
              <textarea value={motif} onChange={(e)=>setMotif(e.target.value)}>

              </textarea>
              <button onClick={handleConfirmRefuse}>
                Confirmer
              </button>
              <button style={{backgroundColor:"gray"}} onClick={handleCancel}>
                Annuler
              </button>
            </div>
          }
        </div>  
        <div className='docs'>
          <div className='ctn'>
            <div className='arrow left' onClick={handlePrev}>
              <FaLeftLong size="35px" className='icon'/>
            </div>
            <div className="slides-container">
              {files.map((file, index) => (
                <div
                  className={index === curent ? 'slide active' : 'slide'}
                  key={index}
                  style={{ transform: `translateX(-${curent * 100}%)` }}
                >
                  <embed
                    className="file-preview"
                    id="doc"
                    type={file.type}
                    src={`data:${file.type};base64,${file.src}`}
                  />
                </div>
              ))}
            </div>
            <div  className='arrow right' onClick={handleNext}>
              <FaRightLong size="35px" className='icon'/>
            </div>
          </div>
          <div className='docName'>
           <h1>{files[curent].name}</h1> 
          </div>
        </div>
      </div>
    </section>
  )
}

export default OneDemand