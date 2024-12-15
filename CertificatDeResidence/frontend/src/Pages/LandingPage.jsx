import React from 'react'
import NavBar from '../Components/NavBar'
import ButtonSecondary from '../Components/ButtonSecondary'
import { useNavigate } from 'react-router-dom'
import { Partenaires } from '../Components/Partenaires'
import Footer from '../Components/Footer'

const LandingPage = () => {
  const navigate=useNavigate()
  return (
    <section className='landingPage'>
      <div className='banner1'>
        <div className='imgContainer'>
          <img src='./Assets/Morocco-Digital-2030-Strategy.webp'/>
        </div>
        <div className='descContainer'>
          <div>
            <h1>Votre certificat de résidence de chez vous</h1>
            <p>Obtenez votre certificat de résidence en quelques clics grâce à notre plateforme digitale, créée dans le cadre de l’initiative Digital Maroc 2030. Simplifiez vos démarches administratives en accédant à un service rapide, sécurisé et disponible 24h/24. Notre engagement : moderniser l’administration et faciliter la vie des citoyens à travers des solutions numériques innovantes. Faites le choix de la simplicité et rejoignez l’avenir digital du Maroc dès aujourd’hui !</p>
            <ButtonSecondary className="buttonPrimary" fct={()=>navigate("demand")} text="Démarrer"/>
          </div>
        </div>
      </div>
      <Partenaires/>
      <section className='banner2'>
        <div className='bn2Container'>
          <div className='stepsContainer'>
          <h1>4 étapes vous sépare de votre certificat de résidence : </h1>
            <div>
                <h2>Etape 1 :</h2>
                <p>Remplir le formulaire</p>
            </div>
            <div>
                <h2>Etape 2 :</h2>
                <p>Recevoir Votre Code De suivie : <span>Zx-Dx-xxx</span></p>
            </div>
            <div>
                <h2>Etape 3 :</h2>
                <p>Grader un oeuil sur votre demande</p>
            </div>
            <div>
              <h2>Etape 4 :</h2>
              <p>Télécharger votre document</p>
            </div>
          </div>
          <div className='imgContainer'>
            <img src='./Assets/banner2.jpg'/>
          </div>
        </div>
      </section>
      <section className='banner3'>
        <div className='descContainer'>
        <h1>Nous Sommes à l'écoute : </h1>
        <p> 
          La section de réclamation vous permet de signaler tout problème lié à nos services afin que nous puissions y remédier rapidement. Vous pouvez soumettre des réclamations concernant : 
        </p>
        <div className='listContainer'>
          <ul>
            <li>Des erreurs dans votre certificat de résidence</li>
            <li>Des retards dans le traitement de votre demande</li>
            <li>Des difficultés techniques sur la plateforme</li>
          </ul>
        </div>
        <p style={{color:"red", fontWeight:'bold'}}>Chaque réclamation est traitée avec sérieux et confidentialité pour vous offrir la meilleure expérience possible.</p>
        </div>
        <div className='buttonContainer'>
          <div className='ctn'>
            <h2>Remplir le formulaire : </h2>
            <ButtonSecondary text="Déposer une réclamation" fct={()=>navigate("Reclamation")}  className="buttonSecondary"/>
          </div>
        </div>
      </section>
      <Footer/>
    </section>
  )
}

export default LandingPage