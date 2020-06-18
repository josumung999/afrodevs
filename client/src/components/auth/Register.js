import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';


const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;

	const onChange = e => setFormData({
		...formData,
		[e.target.name]: e.target.value
	});

	const onSubmit = async e => {
		e.preventDefault();
		if(password !== password2) {
			setAlert('Les mots de passe sont différents', 'danger');
		} else {
			register({ name, email, password });
		}
	};

  if(isAuthenticated) {
    return <Redirect to='dashboard' />
  }

	return (
    <Fragment>
    	<h1 className="large text-primary">Inscription</h1>
      <p className="lead"><i className="fas fa-user"></i> Créer un Compte</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input 
          	type="text" 
          	placeholder="Nom Complet" 
          	name="name" 
          	value={name}
          	onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input 
          	type="email" 
          	placeholder="Adresse Email" 
          	name="email"
          	value={email}
          	onChange={e => onChange(e)}
          />
          <small className="form-text"
            >Ce site utilise Gravatar.
            Veuillez utiliser une adresse email Gravatar pour obtenir une photo de profil.</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={password}
          	onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirmer Mot de passe"
            name="password2"
            value={password2}
          	onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Vous avez déjà un compte ? <Link to='/login'>Connectez-vous</Link>
      </p>    
    </Fragment>
	)
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
 isAuthenticated: state.auth.isAuthenticated
});


export default connect(
  mapStateToProps, 
  { setAlert, register }
)(Register);