import React from 'react'
import { FaFile, FaHistory, FaPowerOff } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CaidSideBar = () => {
  const navigate=useNavigate()
  const infos=useSelector(state=>state.AuthenticationReducer.user)
  const CaidLinks=[
    {
      logo:<FaFile size={"22px"} color='rgb(201, 172, 70)'/>,
      text:"Demandes",
      dir:"/Caid/Demands"
    },
    {
      logo:<FaHistory size={"22px"} color='rgb(201, 172, 70)'/>,
      text:"Historique",
      dir:"/Caid/History"
    },
    {
      logo:<FaFile size={"22px"} color='rgb(201, 172, 70)'/>,
      text:"Reclamation",
      dir:"/Caid/Reclamations"
    },
  ]
  return (
    <div className='SideBar'>
      <div className='infos'>
        <h1>Bienvenu, <br/>{infos.nom} {infos.prenom}</h1>
        <div>
          <p><span>{infos.type_employe}</span></p>
          <p>du zone <span>{infos.zone}</span></p>
        </div>
      </div>
      <div className='paths'>
        {
          infos?.type_employe && CaidLinks.map((l)=>{
            return(
              <div class="path" onClick={()=>navigate(l.dir)}>
                <div>
                 {l.logo} 
                </div>
                <div>
                  <p>{l.text}</p>
                </div>
              </div>
            )
          })
        }
      </div> 
      <div className='offButton'>
        <div>
          <FaPowerOff className='btn' color='white' size={"40px"}/>
        </div>
      </div>
    </div>
  )
}

export default CaidSideBar