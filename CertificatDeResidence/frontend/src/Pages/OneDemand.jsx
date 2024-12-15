import React, { useEffect, useState } from 'react'
import { FaLeftLong, FaRightLong } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { getDemandById } from '../Actions/Demands'
import Waiting from '../Components/Waiting'

const OneDemand = () => {
  const dispatch=useDispatch()
  const demand=useSelector((state)=>state.DemandReducer.demand)
  const [files,setFiles]=useState([])
  const [curent,setCurrent]=useState(0)
  const [isFetched,setIsFetched]=useState(null)
  const [isMilitary,setIsMilitary]=useState(null)
  console.log(files[curent])
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
  const showPic=()=>{
    const selectedFile=files[curent]
    return <embed id='doc' type={selectedFile.type} src={`data:${selectedFile.type};base64,${selectedFile.src}`}/>
  }
  const handleNext=()=>{
    if(curent!==files.length - 1)
      setCurrent((prev)=>prev+1)
  }
  const handlePrev=()=>{
    if(curent!==0)
      setCurrent((prev)=>prev-1)
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
          <div className='btnContainer'>
            <button style={{backgroundColor:'red'}}>Refuser</button>
            <button style={{backgroundColor:'rgb(201, 172, 70)'}}>Affecter Au Mqadem</button>
          </div>
        </div>  
        <div className='docs'>
          <div className='ctn'>
            <div className='arrow left' onClick={handlePrev}>
              <FaLeftLong size="35px" className='icon'/>
            </div>
            {showPic()}
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