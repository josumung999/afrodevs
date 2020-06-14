import React from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">African Developers</h1>
          <p className="lead">
            Le plus grand réseau de développeurs africains. 
            Créez un compte pour rejoindre la communauté
          </p>
          <div className="buttons">
            <Link to='/register' className="btn btn-primary">
              Inscription
            </Link>
            <Link to='/login' className="btn btn-light">
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </section>
	)
}

export default Landing