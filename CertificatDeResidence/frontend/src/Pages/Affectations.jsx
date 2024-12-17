import React ,{useEffect, useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DemandsFilter from '../Components/DemandsFilter'
import { FaCheck, FaEye } from 'react-icons/fa'
import { Envoyer_au_Caïd, Générer, Refuser_par_Mqadem } from '../Utils/Status'
import Waiting from '../Components/Waiting'
import { useNavigate } from 'react-router-dom'
import NoDemands from '../Components/NoDemands'
import { FaX } from 'react-icons/fa6'
import { changeStatus,getZonesDemands,changeStatusAndMotif, sendMail } from '../Actions/Demands'
import Refusbanner from '../Components/Refusbanner'


const Affectation = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const userInfos=useSelector(state=>state.AuthenticationReducer.user)
  const demands=useSelector(state=>state.DemandsReducer.demands)
  const [demandsState,setDemandsState]=useState(null)
  const [filters,setFilters]=useState({nom:"",sort:"Desc"})
  const [isClicked,setIsClicked]=useState(true)
  const [isClosed,setIsClosed]=useState(true)
  const [demandToRefuse,setDemandToRefuse]=useState(null)
  const [motif,setMotif]=useState("")
  const [isGenerating,setIsGenerating]=useState(false)

  useEffect(()=>{
    if(demands){
      let tmp=demands
      if(filters.nom!==""){
        const regex=new RegExp(filters.nom,'i')
        tmp=tmp.filter((d)=> regex.test(d.prenom_emetteur) || regex.test(d.nom_emetteur))
      }
      if(filters.sort==="Desc")
        tmp.sort((a,b)=> new Date(b.date_demande).getTime() - new Date(a.date_demande).getTime())
      if(filters.sort==="Asc")
        tmp.sort((a,b)=> new Date(a.date_demande).getTime() - new Date(b.date_demande).getTime())
      let idT=setTimeout(()=>{
        setDemandsState(tmp)
      },1500)
      return ()=>clearTimeout(idT)
    }
  },[isClicked,demands])
  const genereateStatus=(status)=>{
    let tag;
    switch(status){
      case "Envoyer_au_Caïd":
        tag=<td style={{borderRadius:'10px',color:"white",backgroundColor:'gray'}}>En Attente</td>
        break;
      case "Refuser_par_le_Caïd":
        tag=<td style={{borderRadius:'10px',color:"white",backgroundColor:'red'}}>Refus(1ère étape)</td>
        break;
      case "Enquête_en_cours":
        tag=<td style={{borderRadius:'10px',color:"white",backgroundColor:'black'}}>Enquête en cours</td>
        break;
      case "Refuser_par_Mqadem":
        tag=<td style={{borderRadius:'10px',color:"white",backgroundColor:'read'}}>Refus(2éme étape)</td>
        break;
      case "Générer":
        tag=<td style={{borderRadius:'10px',color:"white",backgroundColor:'green'}}>Envoyée</td>
        break;
      default :
        tag=<td style={{borderRadius:'10px',color:"white",backgroundColor:'green'}}>Envoyée</td>
        break ;
    }
    return tag;
  }

  const handleAccept=async(id_demande)=>{
      setIsGenerating(true)
      let resFetch=null
      const res1=await dispatch(sendMail(id_demande))
      if(res1.isSend){
        const res2=await dispatch(changeStatus(Générer,id_demande))
        if(res2.isUpdated)
          resFetch=await dispatch(getZonesDemands("Mqadem"))
        if(res2.isUpdated!=null && resFetch!=null)
          setIsGenerating(false)
      }
  }
  const handleRefuse=(id_demand)=>{
    setDemandToRefuse(id_demand)
    setIsClosed(false)
  }
  const handleConfirmRefuse=async()=>{
    setIsClosed(true)
    const res=await dispatch(changeStatusAndMotif(Refuser_par_Mqadem,demandToRefuse,motif))
    if(res.isUpdated){
      await dispatch(getZonesDemands("Mqadem"))
    }
    setMotif("")
    setDemandToRefuse(null)
  }
  const generateDate=(date)=>{
    date=new Date(date)
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
  }

  if(demandsState===null || isGenerating)
    return(
      <section className='demands outlet'><Waiting/></section>
    )
  return (
    <section className='demands outlet'>
      {
        !isClosed?<Refusbanner setMotif={setMotif} motif={motif} fct={handleConfirmRefuse} setIsClosed={setIsClosed}/>:null
      }
      <div className='header'>
        <h1>Demandes à traiter du zone : <span>{userInfos?.zone}</span></h1>
        <DemandsFilter
          filters={filters}
          setFilters={setFilters}
          setIsClicked={setIsClicked}
        />
      </div>
      {
        demandsState.length!==0?
        <table className='tableDemande'>
          <thead>
          <td>Nom</td> 
          <td>Prénom</td> 
          <td>Addresse</td> 
          <td>Status</td>
          <td>Date demande</td>
          <td></td>
          </thead>
          <tbody>
            {
              demandsState.map((d)=>{
                return(
                  <tr>
                    <td>{d.nom_emetteur}</td>
                    <td>{d.prenom_emetteur}</td>
                    <td>{d.address}</td>
                    <td>{genereateStatus(d.status)}</td>
                    <td>{generateDate(d.date_demande)}</td>
                    <td>
                      <FaCheck  className='checkRefuse' color='green' onClick={()=>handleAccept(d.id_demande)}/>
                      <FaX onClick={()=>handleRefuse(d.id_demande)} color='red'/>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>:<NoDemands/>
      }
    </section>
  )
}

export default Affectation