import React ,{useEffect, useState}from 'react'
import { useSelector } from 'react-redux'
import DemandsFilter from '../Components/DemandsFilter'
import { FaEye } from 'react-icons/fa'
import { Envoyer_au_Caïd } from '../Utils/Status'
import Waiting from '../Components/Waiting'
import { useNavigate } from 'react-router-dom'
import NoDemands from '../Components/NoDemands'

const History = () => {
  const navigate=useNavigate()
  const userInfos=useSelector(state=>state.AuthenticationReducer.user)
  const demands=useSelector(state=>state.DemandsReducer.demands)
  const [statusCompatible,SetStatusCompatible]=useState(null);
  const [demandsState,setDemandsState]=useState(null)
  const [filters,setFilters]=useState({nom:"",sortDate:"Desc"})
  const [isClicked,setIsClicked]=useState(true)
  const [isEmpty,setIsEmpty]=useState(null)

  useEffect(()=>{
    if(statusCompatible){
      setDemandsState(null)
      let tmp=statusCompatible
      if(filters.nom!==""){
        const regex=new RegExp(filters.nom,'i')
        tmp=tmp.filter((d)=> regex.test(d.prenom_emetteur) || regex.test(d.nom_emetteur))
      }
      if(filters.sort==="Desc")
        tmp=tmp.sort((a,b)=> new Date(b.date_demande).getTime() - new Date(a.date_demande).getTime())
      if(filters.sort==="Asc")
        tmp=tmp.sort((a,b)=> new Date(a.date_demande).getTime() - new Date(b.date_demande).getTime())
      if(tmp.length===0)
        setIsEmpty(true)
      else
        setIsEmpty(false)
      let idT=setTimeout(()=>{
        setDemandsState(tmp)
      },750)
      return ()=>clearTimeout(idT)
    }
  },[isClicked,statusCompatible])
  const generateDate=(date)=>{
    date=new Date(date)
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
  }
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
        tag=<td style={{borderRadius:'10px',color:"white",backgroundColor:'red'}}>Refus(2éme étape)</td>
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
  useEffect(()=>{
    const tmp=demands.filter((d)=> d.status!==Envoyer_au_Caïd)
    SetStatusCompatible(tmp)
  },[demands])

  if(statusCompatible==null || demandsState==null || isEmpty==null)
    return(
      <section className='demands outlet'><Waiting/></section>
    )
  return (
    <section className='demands outlet'>
      <div className='header'>
        <h1>Historique de demandes du zone : <span>{userInfos?.zone}</span></h1>
        <DemandsFilter
          filters={filters}
          setFilters={setFilters}
          setIsClicked={setIsClicked}
        />
      </div>
      {
        !isEmpty?
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
                  <td onClick={()=>navigate(`/Caid/Demands/${d.id_demande}`)}><FaEye/></td>
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

export default History