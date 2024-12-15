import React ,{useEffect, useState}from 'react'
import { useSelector } from 'react-redux'
import DemandsFilter from '../Components/DemandsFilter'
import { FaEye } from 'react-icons/fa'
import { Envoyer_au_Caïd } from '../Utils/Status'
import Waiting from '../Components/Waiting'
import { useNavigate } from 'react-router-dom'

const Demands = () => {
  const navigate=useNavigate()
  const userInfos=useSelector(state=>state.AuthenticationReducer.user)
  const demands=useSelector(state=>state.DemandsReducer.demands)
  const [statusCompatible,SetStatusCompatible]=useState(null);
  const [demandsState,setDemandsState]=useState(null)
  const [filters,setFilters]=useState({nom:"",sort:"Desc"})

  useEffect(()=>{
    if(statusCompatible){
      let tmp=statusCompatible
      if(filters.nom!==""){
        const regex=new RegExp(filters.nom,'i')
        tmp=tmp.filter((d)=> regex.test(d.prenom_emetteur) || regex.test(d.nom_emetteur))
      }
      if(filters.sort==="Desc")
        tmp.sort((a,b)=> a.date_demande.getTime() - b.date_demande.getTime())
      if(filters.sort==="Asc")
        tmp.sort((a,b)=> b.date_demande.getTime() - a.date_demande.getTime())
      let idT=setTimeout(()=>{
        setDemandsState(tmp)
      },1500)
      return ()=>clearTimeout(idT)
    }
  },[filters,statusCompatible])

  useEffect(()=>{
    const tmp=demands.filter((d)=> d.status===Envoyer_au_Caïd)
    SetStatusCompatible(tmp)
  },[demands])

  const generateDate=(date)=>{
    date=new Date(date)
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
  }

  if(demandsState===null)
    return(
      <section className='demands outlet'><Waiting/></section>
    )
  return (
    <section className='demands outlet'>
      <div className='header'>
        <h1>Demandes à traiter du zone : <span>{userInfos?.zone}</span></h1>
        <DemandsFilter
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      <table className='tableDemande'>
        <thead>
         <td>Nom</td> 
         <td>Prénom</td> 
         <td>Addresse</td> 
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
                  <td>{generateDate(d.date_demande)}</td>
                  <td onClick={()=>navigate(`${d.id_demande}`)}><FaEye/></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </section>
  )
}

export default Demands