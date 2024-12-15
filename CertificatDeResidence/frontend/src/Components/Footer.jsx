import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <section className='footer'>
        <div className='logo_addresse'>
            <div className='logoContainer'>
                <img className="img" src="./Assets/fr_footer.svg"/>
            </div>
            <div>
                <p>B.P : 1076, Rue Ahmed Cherkaoui, quartier administratif,<br></br> Agdal, Rabat</p>
            </div>
        </div>
        <div className='routes'>
            <h1>"Vers un future plus digitale,<br/> plus proche."</h1>
            <div>
                <ul>
                    <li><Link className="link" to="Reclamer">Reclamer</Link></li>
                    <li><Link className="link" to="demand">Demander votre certificat de residence</Link></li>
                </ul>
            </div>
        </div>
    </section>
  )
}

export default Footer