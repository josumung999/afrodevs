 import React, { Fragment, useState, useEffect } from 'react';
 import { Link, withRouter } from 'react-router-dom';
 import PropTypes from 'prop-types';
 import { connect } from 'react-redux';
 import { createProfile, getCurrentProfile } from '../../actions/profile';

 const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile ,history }) => {
 	const [formData, setFormData] = useState({
 		company: '',
		website: '',
		location: '',
		bio: '',
		status: '',
		githubusername: '',
		skills: '',
		youtube: '',
		facebook: '',
		twitter: '',
		instagram: '',
		linkedin: ''
 	});

	const [displaySocialInputs, toggleSocialInputs] = useState(false); 	

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
    });
  }, [loading]);

 	const {
 		company,
		website,
		location,
		bio,
		status,
		githubusername,
		skills,
		youtube,
		facebook,
		twitter,
		instagram,
		linkedin
 	} = formData;

 	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

 	const onSubmit = e => {
 		e.preventDefault();
 		createProfile(formData, history, true); 
 	}

 	return (
 		<Fragment>
 			<h1 className="large text-primary">
        Créer un Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Ajoute des informations pour avoir un profil solide
      </p>
      <small>* = champs obligatoires</small>
      <form className="form" onSubmit={ e => onSubmit(e) }>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option value="0">* Statut</option>
            <option value="Développeur">Développeur</option>
            <option value="Développeur Junior">Développeur Junior</option>
            <option value="Développeur Senior">Développeur Senior</option>
            <option value="Manager">Manager</option>
            <option value="Étudiant ou Apprenant">Étudiant ou Apprenant</option>
            <option value="Instructeur ou Enseignant">Instructeur ou Enseignant</option>
            <option value="Interne">Interne</option>
            <option value="Autre">Autre</option>
          </select>
          <small className="form-text"
            >Donnez nous une idée sur votre vie professionnelle</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Nom de l'Entreprise" name="company" value={company} onChange={e => onChange(e)} />
          <small className="form-text"
            >Il peut s'agir de votre propre entreprise ou de celle dans laquelle vous travaillez</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Site Web" name="website" value={website} onChange={e => onChange(e)} />
          <small className="form-text">
            Votre site web ou celui d'une entreprise
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Localisation" name="location" value={location} onChange={e => onChange(e)} />
          <small className="form-text"
            >Ville et Pays (ex: Bukavu, Congo-Kinshasa)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Compétences" name="skills" value={skills} onChange={e => onChange(e)} />
          <small className="form-text"
            >Veuillez séparer les différentes valeurs avec des virgule (ex.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nom d'utilisateur Github"
            name="githubusername"
            value={githubusername} 
            onChange={e => onChange(e)}
          />
          <small className="form-text"
            >Si vous voulez afficher vos repositories récents, saisissez votre nom d'utilisateur Github (ex. josumung999)</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="Une petite autobiographie" name="bio" value={bio} onChange={e => onChange(e)} ></textarea>
          <small className="form-text">Parlez nous un peu de vous</small>
        </div>

        <div className="my-2">
          <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Ajouter vos comptes sociaux
          </button>
          <span>Optionnel</span>
        </div>

        {displaySocialInputs && <Fragment>
        	<div className="form-group social-input">
	          <i className="fab fa-twitter fa-2x"></i>
	          <input type="text" placeholder="URL Twitter" name="twitter" value={twitter} onChange={e => onChange(e)} />
	        </div>

	        <div className="form-group social-input">
	          <i className="fab fa-facebook fa-2x"></i>
	          <input type="text" placeholder="URL Facebook" name="facebook" value={facebook} onChange={e => onChange(e)} />
	        </div>

	        <div className="form-group social-input">
	          <i className="fab fa-youtube fa-2x"></i>
	          <input type="text" placeholder="URL YouTube" name="youtube" value={youtube} onChange={e => onChange(e)} />
	        </div>

	        <div className="form-group social-input">
	          <i className="fab fa-linkedin fa-2x"></i>
	          <input type="text" placeholder="URL Linkedin" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
	        </div>

	        <div className="form-group social-input">
	          <i className="fab fa-instagram fa-2x"></i>
	          <input type="text" placeholder="URL Instagram" name="instagram" value={instagram} onChange={e => onChange(e)} />
	        </div>

        </Fragment>}

        
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Retour</Link>
      </form>
 		</Fragment>
 		)
 }

 EditProfile.propTypes = {
 	createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
 }

 const mapStateToProps = state => ({
   profile: state.profile
 });

 export default connect(
   mapStateToProps, 
   { createProfile, getCurrentProfile }
 )(withRouter(EditProfile));