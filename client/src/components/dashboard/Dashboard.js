import React,  { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';


const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
	useEffect(() => {
		getCurrentProfile();
	}, []); 

	return loading && profile === null ? <Spinner /> : <Fragment>
		<h1 className="large text-primary">Tableau de Bord</h1>
		<p className="lead">
			<i className="fas fa-user" /> 
			Bienvenue { user && user.name }
		</p>
		{profile !== null ? <Fragment>Has</Fragment> : 
			<Fragment>
				<p>Vous n'avez pas encore configuré votre profil, veuillez mettre à jour vos information</p>
				<Link	to='/create-profile' className="btn btn-primary my-1">
					Créer un Profile
				</Link>
			</Fragment>}
	</Fragment>
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);