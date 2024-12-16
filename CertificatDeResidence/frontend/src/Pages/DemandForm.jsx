import React, { useEffect, useState } from 'react'
import ProgressionLine from '../Components/ProgressionLine'
import Input from '../Components/Input'
import ButtonSecondary from '../Components/ButtonSecondary'
import { FaCheck, FaUpload } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRegions,getZonesParVilles } from '../Actions/Geography'
import { addDemandFiles,addDemandApi } from '../Actions/Demands'

const DemandForm = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const regions=useSelector((state)=>state.GeographyReducer.regions)
  const zones=useSelector((state)=>state.GeographyReducer.zones)
  const steps = ["Données Personnelles", "Documents", "Code Suivie"];
  const [currentStep,setCurrentStep]=useState(1)
  const [inputs,setInputs]=useState({
    id_zone:0,
    nom_emetteur:"",
    prenom_emetteur:"",
    address:"",
    cin:"",
    telephone:"",
    email:"",
    payment_reference:"",
    facture_electricite:null,
    certif_priorite:null,
    document_emploie:null,
    certif_presence:null,
    isMilitary:false
  })
  const [code,setCode]=useState("")
  const [localisation,setLocalistion]=useState({
    ville:0,
    region:0
  })
  const [villes,setVilles]=useState([])
  const [err,setErr]=useState("")
  const getRegionsFct=async()=>{
    const resRegion=await dispatch(getRegions());
  }
  useEffect(()=>{
    getRegionsFct()
  },[])
  useEffect(()=>{
    const regionChoisit=regions.filter((r) => r.id_region==localisation.region)
    const villesList=regionChoisit[0]?.villes
    setVilles(villesList)
  },[localisation.region])
  useEffect(()=>{
    dispatch(getZonesParVilles(localisation.ville))
  },[localisation.ville])
  const handleChangeFile=(e)=>{
    setInputs((prev)=>{return {...prev,[e.target.name]:e.target.files[0]}})
  }
  const handleChangeLoclaistion=(e)=>{
    setLocalistion((prev)=>{return {...prev,[e.target.name]:e.target.value}})
  }
  const handleChange=(e)=>{
    setInputs((prev)=>{return {...prev,[e.target.name]:e.target.value}})
  }
  const addDemand=async()=>{
    const res=await dispatch(addDemandFiles(inputs.isMilitary,inputs))
    if(res.isAdded){
      const res2=await dispatch(addDemandApi(res.id_file,inputs))
      if(!res2.isAdded)
        setErr(res2.err)
      else{
        setCode(res2.code)
        setCurrentStep(3)
      }
    }
    else
      setErr(res.err)
  }
  const handleNextStep=()=>{
    setErr("")
    if(currentStep===1){
      if(
        inputs.id_zone===0 ||
        inputs.nom_emetteur==="" ||
        inputs.prenom_emetteur==="" ||
        inputs.address==="" ||
        inputs.cin==="" ||
        inputs.telephone==="" ||
        inputs.email===""){
          setErr("Remplis tous les champs")
          return
        }
        setCurrentStep(2)
    }else if(currentStep===2){
      if(
        inputs.facture_electricite===null ||
        inputs.document_emploie===null ||
        inputs.certif_priorite===null ||
        inputs.payment_reference==="" ||
        (inputs.certif_presence===null && inputs.isMilitary)){
          setErr("Remplis tous les champs")
          return
      }
      addDemand()
    }
  }
  return (
    <section className='demandForm'>
      <div className='container'>
        <ProgressionLine currentStep={currentStep} steps={steps}/>
        <p style={{width:"100%",height:"25px",textAlign:"center",color:"red"}}>{err}</p>
        { currentStep===1 &&
          <div className='Form1'>
            <div className='flexContainer'>
              <div className='perso'>
                <Input
                  label="Nom : "
                  type="text"
                  name="nom_emetteur"
                  fct={handleChange}
                  value={inputs.nom_emetteur}
                />
                <Input
                  label="Prenom : "
                  type="text"
                  name="prenom_emetteur"
                  fct={handleChange}
                  value={inputs.prenom_emetteur}
                />
                <Input
                  label="Email : "
                  type="email"
                  name="email"
                  fct={handleChange}
                  value={inputs.email}
                />
                <Input
                  label="CIN : "
                  type="text"
                  name="cin"
                  fct={handleChange}
                  value={inputs.cin}
                />
                <Input
                  label="Telephone : "
                  type="text"
                  name="telephone"
                  fct={handleChange}
                  value={inputs.telephone}
                />
              </div>
              <div className='geo'>
                <div className='selectContainer'>
                  <label>Region :</label>
                  <select value={localisation.region}  name='region' onChange={handleChangeLoclaistion}>
                    <option value={0}>Choisit une region</option>
                      {
                        regions?.map((r)=>{
                          return(
                            <option value={r.id_region}>{r.nom_region}</option>
                          )
                        })
                      }
                  </select>
                </div>
                <div className='selectContainer'>
                  <label>Ville :</label>
                  <select value={localisation.ville} name='ville' onChange={handleChangeLoclaistion}>
                  <option value={0}>Choisit une ville</option>
                      {
                        villes?.map((v)=>{
                          return(
                            <option value={v.id_ville}>{v.nom_ville}</option>
                          )
                        })
                      }
                  </select>
                </div>
                <div className='selectContainer'>
                  <label>Zone :</label>  
                  <select value={inputs.id_zone} name='id_zone' onChange={handleChange}>
                    <option value={0}>Choisit une zone</option>
                      {
                        zones?.map((z)=>{
                          return(
                            <option value={z.id_zone}>{z.nom_zone}</option>
                          )
                        })
                      }
                  </select>
                </div>
                <Input
                  label="Address : "
                  type="text"
                  name="address"
                  fct={handleChange}
                  value={inputs.address}
                />
                <div className='selectContainer'>
                  <label>Vous êtes en militaire ?</label>
                  <select onChange={handleChange} name='isMilitary'>
                    <option>--</option>
                    <option value={true}>Oui</option>
                    <option value={false}>Non</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{float:"right"}}>
              <ButtonSecondary
                className="buttonPrimary"
                fct={handleNextStep}
                text="Suivant"
              />
            </div>
          </div>
        }
        {
          currentStep===2 &&
          <div className='Form2'>
            <div className='flexContainer2'>
              <div className='imgContainer'>
                <img src="./Assets/legal.jpg"/>
              </div>
              <div>
                <div>
                  <p>Facture Electricité :</p>
                  <div className='fileContainer'>
                    <label><FaUpload size="28px" color="white"/></label>
                    <input
                      type='file'
                      name='facture_electricite'
                      onChange={handleChangeFile}
                    />
                  </div>
                </div>
                <div>
                  <p>Certificat de propriété :</p>
                  <div  className='fileContainer'>
                    <label><FaUpload size="28px" color="white"/></label>
                    <input
                      type='file'
                      name='certif_priorite'
                      onChange={handleChangeFile}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p>Document d'emploie :</p>
                  <div  className='fileContainer'>
                    <label><FaUpload size="28px" color="white"/></label>
                    <input
                      type='file'
                      name='document_emploie'
                      onChange={handleChangeFile}
                    />
                  </div>
                </div>
                {
                  inputs.isMilitary &&
                  <div>
                    <p>Certificat de présence :</p>
                    <div  className='fileContainer'>
                      <label><FaUpload size="28px" color="white"/></label>
                      <input
                        type='file'
                        name='certif_presence'
                        onChange={handleChangeFile}
                      />
                    </div>
                  </div>
                }
              </div>
              </div>
              <Input
                type="text"
                name="payment_reference"
                fct={handleChange}
                label="Code du payement :"
                value={inputs.payment_reference}
              />
              <div style={{float:"right"}}>
                <ButtonSecondary
                  className="buttonPrimary"
                  fct={handleNextStep}
                  text="Suivant"
                />
              </div>
          </div>
        }
        {
          currentStep===3 &&
          <div className='codeSuivie'>
            <div className='checkContainer'>
              <div>
                <FaCheck size="40px" color='white'/>
              </div>
            </div>
            <div className='desc'>
              <h1>Votre demande est bien envoyée :</h1>
              <p>{code}</p>
              <h2>Accéder au URL : <span style={{cursor:"pointer"}} onClick={()=>navigate(`/suivie/${code}`)}>http://localhost:3000/suivie/{code} </span><br/> chaque fois vous souhaité suivre votre demande</h2>
            </div>
            <div>
              <ButtonSecondary
                 className="buttonPrimary"
                 fct={()=>navigate("/")}
                 text="Vers l'acceuil"
              />
            </div>
          </div>
        }
      </div>
    </section>
  )
}

export default DemandForm