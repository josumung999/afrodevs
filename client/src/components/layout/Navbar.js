import React from 'react'

const Navbar = () => {
	return (
		<nav className="navbar bg-dark">
      <h1>
        <a href="index.html"><i className="fas fa-code"></i> AfroDevs</a>
      </h1>
      <ul>
        <li>
        	<a href="profiles.html">Les Développeurs</a>
        </li>
        <li>
        	<a href="register.html">Inscription</a>
        </li>
        <li>
        	<a href="login.html">Connexion</a>
        </li>
      </ul>
    </nav>
	)
}

export default Navbar