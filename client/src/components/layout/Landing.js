import React from 'react'

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
            <a href="register.html" className="btn btn-primary">Inscription</a>
            <a href="login.html" className="btn btn-light">Connexion</a>
          </div>
        </div>
      </div>
    </section>
	)
}

export default Landing