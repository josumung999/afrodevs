import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';



const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
      <ul>
        <li>
          <Link to='/dashboard'>
            <i className="fas fa-user" />{' '}
            <span className="hide-sm">Tableau de Bord</span>
          </Link>
        </li>
        <li>
            <a onClick={logout} href='#!'>
                <i className="fas fa-sign-out-alt" />{' '}
                <span className="hide-sm">Se Déconnecter</span>
            </a>
        </li>
      </ul>
    );

    const guestLinks = (
        <ul>
        <li>
            <a href='#!'>
                Développeurs
            </a>
        </li>
        <li>
            <Link to='/register'>
                Inscription
            </Link>
        </li>
        <li>
            <Link to='/login'>
                Connexion
            </Link>
        </li>
      </ul>
    );

	return (
		<nav className="navbar bg-dark">
      <h1>
        <Link to='/'>
        	<i className="fas fa-code"></i> AfroDevs
        </Link>
      </h1>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
    </nav>
	)
};

Navbar.propTypes = {
   logout: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired 
};


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);